// import { notFound } from "next/navigation";
// import { getProducts } from "@/lib/products";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Star, StarHalf } from "lucide-react";
// import Link from "next/link";
// import { ImageGallery } from "@/components/image-gallery";
// import { RelatedProducts } from "@/components/related-products";
// import { ShippingInfo } from "@/components/shipping-info";
// import { ProductDownloadButton } from "@/components/donwloadButton";

// function RatingStars({ rating }: { rating: number }) {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;

//   return (
//     <div className="flex items-center">
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//       ))}
//       {hasHalfStar && (
//         <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//       )}
//       <span className="ml-2 text-lg">{rating.toFixed(1)}</span>
//     </div>
//   );
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { handle: string };
// }) {
//   const products = await getProducts();
//   const product = products.find((p) => p.Handle === params.handle);

//   if (!product) {
//     return {
//       title: "Product Not Found",
//     };
//   }

//   return {
//     title: `${product.Title} | PowerMowers`,
//     description: product["Body (HTML)"]?.replace(/<[^>]*>/g, "").slice(0, 160),
//   };
// }

// export default async function hiddenPage({
//   params,
// }: {
//   params: { handle: string };
// }) {
//   const products = await getProducts();
//   const product = products.find((p) => p.Handle === params.handle);

//   if (!product) {
//     notFound();
//   }

//   const checkoutParams = new URLSearchParams({
//     id: product.Handle,
//     name: product.Title,
//     price: product.DiscountedPrice.toString(),
//     originalPrice: product.OriginalPrice.toString(),
//     discountPercentage: product.DiscountPercentage.toString(),
//     image: product.Images[0]?.src || "/placeholder.svg",
//   }).toString();

//   return (
//     <div className="container py-6 sm:py-12">

//     </div>
//   );
// }

import type { Metadata } from "next";
import { AboutUsContent } from "@/components/about-us-content";
import { ProductDownloadButton } from "@/components/donwloadButton";

export const metadata: Metadata = {
  title: "About Us | Ariens",
  description:
    "Learn about Ariens, our mission, and our commitment to quality outdoor power equipment.",
};

export default function HiddenPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Ariens</h1>
      <ProductDownloadButton></ProductDownloadButton>
      {/* <AboutUsContent /> */}
    </div>
  );
}
