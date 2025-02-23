import { NextApiRequest, NextApiResponse } from 'next';
import { FeedBuilder } from '@xcommerceweb/google-merchant-feed';
import { format } from 'date-fns';

import { getProducts } from '@/lib/products'; // Your product-fetching logic
import { Product } from '@/types/product';
import { sendEmail } from '@/lib/sendmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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
      .withLink(process.env.NEXT_PUBLIC_SITE_URL || 'https://default-domain.com')
      .withDescription("Google Merchant Center Product Feed");

    console.log("[5/6] Adding products to feed...", gmcProducts.length);
    gmcProducts.forEach(product => {
      feedBuilder.withProduct({
        id: product.id,
        title: product.title,
        productType: product.type,
        description: product.description,
        link: product.link,
        imageLink: product.image_link,
        price: {
          currency: "USD",
          value: parseFloat(product.price.replace(" USD", ""))
        },
        availability: "in_stock",
        condition: "new",
        brand: product.brand,
        gtin: product.gtin,
        mpn: product.mpn,
        googleProductCategory: product.google_product_category,
        ageGroup: "newborn",
        gender: "unisex",
        color: product.color,
        size: product.size,
        tax: product.tax,
        shipping: product.shipping,
        identifierExists: "no",
        customLabels: [product.color, product.size]
      });
    });

    console.log("[6/6] Generating XML...");
    const xml = feedBuilder.buildXml();
    const filename = `gmc-products-${format(new Date(), "yyyy-MM-dd")}.xml`;

    // Send the XML via email
    console.log(`📨 Sending XML feed to adnanefouham98@gmail.com...`);
    await sendEmail(
      'adnanefouham98@gmail.com', // Recipient email
      'GMC Products Feed', // Email subject
      'Please find the attached GMC products feed.', // Email body
      {
        filename, // Attachment filename
        content: xml, // Attachment content
      }
    );

    console.log(`🎉 XML feed sent via email!`);
    res.status(200).json({ message: 'XML feed sent via email!' });
  } catch (error) {
    console.error("⚠️ Error during GMC feed generation process:", error);
    res.status(500).json({ error: 'Failed to generate and send XML feed.' });
  }
}

function convertToGmcProduct(product: Product): GmcProduct {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://default-domain.com';
  const priceValue = product.DiscountedPrice;

  return {
    id: product.Handle,
    title: product.Title.substring(0, 150),
    type: product.Type,
    description: product["Body (HTML)"]
      .substring(0, 5000)
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
    link: `${siteUrl}/products/${product.Handle}`,
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
      rate: product.TaxRate || 7.0,
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