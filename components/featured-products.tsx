"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { useRouter } from "next/navigation";

interface FeaturedProductsProps {
  products: Product[];
}

const getTopProducts = (products: Product[], count: number): Product[] => {
  // First sort by rating and discount percentage
  const sortedProducts = [...products].sort((a, b) => {
    const scoreA = a.Rating * a.DiscountPercentage;
    const scoreB = b.Rating * b.DiscountPercentage;
    return scoreB - scoreA;
  });

  // Get the top count products
  return sortedProducts.slice(0, count);
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const router = useRouter();
  const bestSellers = getTopProducts(products, 6); // Get exactly 6 products

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            Best Selling Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[900px] text-muted-foreground"
          >
            Our top-rated and most popular power equipment, trusted by thousands
            of satisfied customers.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bestSellers.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-1 md:col-span-1 lg:col-span-1"
            >
              <Link href={`/products/${product.Handle}`}>
                <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={product.Images[0]?.src || "/placeholder.svg"}
                        alt={product.Title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out"
                        sizes="(max-width: 1400px) 16.67vw, 200px"
                      />
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                        -{product.DiscountPercentage.toFixed(0)}%
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2">
                        {product.Title}
                      </h3>
                      <div className="flex items-center mb-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                        <span className="text-xs sm:text-sm font-medium ml-1">
                          {product.Rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 flex-wrap">
                        <span className="text-xs sm:text-sm font-semibold text-primary">
                          ${product.DiscountedPrice.toFixed(2)}
                        </span>
                        <span className="text-xs line-through text-muted-foreground">
                          ${product.OriginalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
          >
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
