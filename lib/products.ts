import { parse } from "csv-parse/sync";
import type { Product } from "@/types/product";
import { Images } from "lucide-react";
import { format } from "date-fns";
import { Condition, FeedBuilder } from '@xcommerceweb/google-merchant-feed';

function generateConsistentRating(handle: string): number {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    const char = handle.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return 4 + (Math.abs(hash) % 11) / 10;
}

export async function DownloadGmcProductsPage() {
  try {
    const siteUrl = window.location.origin; // e.g., "https://client2.example.com"

    console.log(`Using domain: ${siteUrl}`);

    console.log("[1/6] Starting GMC products feed generation...");
    
    console.log("[2/6] Fetching products from source...");
    const products = await getProducts();
    console.log(`✅ Successfully retrieved ${products.length} products`);
    
    console.log("[3/6] Converting products to GMC format...");
    const gmcProducts = products.map((product) => convertToGmcProduct(product));
    console.log(`✅ Converted ${gmcProducts.length} products to GMC format`);

    console.log("[4/6] Building XML feed...");
    const feedBuilder = new FeedBuilder()
      .withTitle("Your Store Name")
      .withLink(siteUrl) // Must match product links
      .withDescription("Google Merchant Center Product Feed");

    console.log("[5/6] Adding products to feed...", gmcProducts.length);
    gmcProducts.forEach(product => {
      // if (!product.gtin && !product.mpn) {
      //   console.warn(`Product ${product.id} missing both GTIN and MPN`);
      // }

      feedBuilder.withProduct({
        id: product.id,
        title: product.title,
        description: product.description,
        link: product.link,
        imageLink: product.image_link,
        price: {
          currency: "USD",
          value: parseFloat(product.price.replace(" USD", ""))
        },
        availability: product.availability as "in_stock" | "out_of_stock" | "preorder" | "backorder",
        condition: product.condition as Condition,
        brand: product.brand,
        gtin: product.gtin,
        mpn: product.mpn,
        googleProductCategory: `Home & Garden`,
        color: product.color,
        size: product.size,
        tax: product.tax,
        shipping: product.shipping,
        identifierExists: product.identifierExists as "yes" | "no",
        customLabels: [product.color, product.size]
      });
    });

    console.log("[6/6] Generating XML...", feedBuilder.getFeed());
    const xml = feedBuilder.buildXml();
    const filename = `gmc-products-${format(new Date(), "yyyy-MM-dd")}.xml`;
    
    // Trigger download
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`🎉 XML feed generated! Filename: ${filename}`);
  } catch (error) {
    console.error("⚠️ Error during GMC feed generation process:", error);
    throw error;
  }
}

function convertToGmcProduct(product: Product): GmcProduct {
  const siteUrl = window.location.origin; // e.g., "https://client2.example.com"

  console.log(`Using domain: ${siteUrl}`);
  
  const priceValue = product.DiscountedPrice;
  
  return {
    id: product.Handle.substring(0, 50),
    title: product.Title.substring(0, 150),
    type: product.Type,
    description: product["Body (HTML)"]
      .substring(0, 5000)
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
    link: `${siteUrl}/products/${product.Handle}`, // Must match feed domain
    image_link: product.Images?.[0]?.src || "",
    price: `${priceValue.toFixed(2)} USD`,
    availability: product.Status === "active" ? 'in_stock' : 'out_of_stock',
    condition: "new",
    gtin: product.GTIN || '',
    mpn: product.MPN || '',
    brand: product.Vendor.substring(0, 70),
    google_product_category: product.GoogleCategory || "Apparel & Accessories > Clothing",
    age_group: product.AgeGroup || 'adult',
    gender: product.Gender || 'unisex',
    color: product.Color || 'Multicolor',
    size: product.Size || 'One Size',
    tax: {
      country: "US",
      rate: product.TaxRate || 7.0, // Set your actual tax rate
      tax_ship: true
    },
    shipping: {
      country: "US",
      service: "Standard",
      price: {
        currency: "USD",
        value: product.ShippingCost || 0.00
      }
    },
    identifierExists: product.GTIN ? 'yes' : 'no'
  };
}

function generateConsistentRandomNumber(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Use a linear congruential generator for better distribution
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);
  return ((a * hash + c) % m) / m;
}

function generateConsistentDiscount(handle: string): number {
  const randomValue = generateConsistentRandomNumber(handle);
  // Generate a discount between 10% and 25%
  return Math.floor(10 + randomValue * 16);
}

export async function getProducts(): Promise<Product[]> {
  try {
    const csvUrls = [
      "https://drive.google.com/uc?export=download&id=1JV4JAp0KVvnpj1rZOGRImnLRiI6O4n5J"
    ];
    
    const products: Product[] = [];

    for (let url of csvUrls) {
      console.log(`Fetching products from: ${url}`);
      const response = await fetch(url, { cache: 'no-store' }); // Disable caching for large files
      const csvData = await response.text();

      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
      });

      let currentProduct: Partial<Product> | null = null;

      records.forEach((record: any) => {
        if (record.Handle) {
          if (currentProduct) {
            products.push(currentProduct as Product);
          }
          const originalPrice = Number.parseFloat(record["Variant Price"]);
          let discountPercentage = generateConsistentDiscount(record.Handle);

          // Ensure the discount is at least 10%
          discountPercentage = Math.max(10, discountPercentage);

          const discountedPrice = originalPrice * (1 - discountPercentage / 100);
          currentProduct = {
            ...record,
            Images: [],
            Rating: generateConsistentRating(record.Handle),
            "Body (HTML)": organizeDescription(record["Body (HTML)"]),
            OriginalPrice: originalPrice,
            DiscountPercentage: discountPercentage,
            DiscountedPrice: discountedPrice,
          };
        }

        if (currentProduct && record["Image Src"]) {
          currentProduct.Images!.push({
            src: record["Image Src"],
            position: Number.parseInt(record["Image Position"]) || 1,
            alt: record["Image Alt Text"] || "",
          });
        }
      });

      if (currentProduct) {
        products.push(currentProduct as Product);
      }
    }

    // Filter out products that are not "active"
    return products.filter((product: Product) => product.Status === "active");
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

function organizeDescription(description: string): string {
  if (!description) return ""; // Handle empty descriptions

  const sections = [
    { title: "Features", content: "" },
    { title: "Specifications", content: "" },
    { title: "Benefits", content: "" },
  ];

  const paragraphs = description.split("</p>");

  paragraphs.forEach((p, index) => {
    const cleanP = p.replace(/<\/?[^>]+(>|$)/g, "").trim(); // Remove HTML tags
    if (cleanP) {
      if (index < 3) {
        sections[index].content += `<p>${cleanP}</p>`;
      } else {
        sections[2].content += `<p>${cleanP}</p>`;
      }
    }
  });

  return sections
    .filter((section) => section.content)
    .map((section) => `<h3 class="text-xl font-semibold mt-4 mb-2">${section.title}</h3>${section.content}`)
    .join("");
}