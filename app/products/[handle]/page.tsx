import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { ImageGallery } from "@/components/image-gallery";
import { RelatedProducts } from "@/components/related-products";
import { ShippingInfo } from "@/components/shipping-info";
import { ProductDownloadButton } from "@/components/donwloadButton";
import SimplePayPalButton from "@/components/paypalSimpleButton";

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      )}
      <span className="ml-2 text-lg">{rating.toFixed(1)}</span>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}) {
  const products = await getProducts();
  const product = products.find((p) => p.Handle === params.handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.Title} | PowerMowers`,
    description: product["Body (HTML)"]?.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const products = await getProducts();
  const product = products.find((p) => p.Handle === params.handle);

  if (!product) {
    notFound();
  }

  const checkoutParams = new URLSearchParams({
    id: product.Handle,
    name: product.Title,
    price: product.DiscountedPrice.toString(),
    originalPrice: product.OriginalPrice.toString(),
    discountPercentage: product.DiscountPercentage.toString(),
    image: product.Images[0]?.src || "/placeholder.svg",
  }).toString();

  return (
    <div className="container py-6 sm:py-12">
      <Link
        href="/products"
        className="inline-flex items-center mb-8 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-12">
        <div className="w-full max-w-md mx-auto">
          <ImageGallery images={product.Images} />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            {product.Title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2 sm:mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              ${product.DiscountedPrice.toFixed(2)}
            </span>
            <span className="text-lg sm:text-xl text-muted-foreground line-through">
              ${product.OriginalPrice.toFixed(2)}
            </span>
            <span className="text-lg font-semibold text-green-600">
              {product.DiscountPercentage.toFixed(0)}% OFF
            </span>
          </div>
          <RatingStars rating={product.Rating} />
          <div
            className="prose prose-sm sm:prose-base max-w-none my-4 sm:my-8"
            dangerouslySetInnerHTML={{
              __html: product["Body (HTML)"] || "No description available.",
            }}
          />
          <Button size="lg" className="w-full  h-[51px]" asChild>
            <Link href={`/checkout?${checkoutParams}`}>Buy Now</Link>
          </Button>
          <SimplePayPalButton
            amount={product.DiscountedPrice.toFixed(2).toString()}
          ></SimplePayPalButton>

          {/* <ShippingInfo /> */}
        </div>
      </div>
      <div className="mt-8 sm:mt-12">
        <RelatedProducts currentProduct={product} allProducts={products} />
      </div>
    </div>
  );
}
