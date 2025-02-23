import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";

export const metadata = {
  title: "Luxury Outdoor Equipment | Ariens",
  description:
    "Discover our exquisite collection of high-performance outdoor equipment. Experience power, precision, and luxury in every product.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await getProducts();
  const typeFilter = searchParams.type as string | undefined;

  const pageTitle = typeFilter || "All Products";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            {pageTitle}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            Elevate your outdoor experience with our premium selection of power
            equipment.
          </p>
        </div>

        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid products={products} initialFilter={typeFilter} />
        </Suspense>
      </div>
    </div>
  );
}
