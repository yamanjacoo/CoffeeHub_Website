"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { Filters } from "@/components/filters";
import { GridLayoutControl } from "@/components/grid-layout-control";

interface ProductGridProps {
  products: Product[];
  initialFilter?: string;
}

type GridLayout = 1 | 2 | 3 | 4;

export function ProductGrid({ products, initialFilter }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [gridLayout, setGridLayout] = useState<GridLayout>(4);
  const [animationKey, setAnimationKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 640;
      setIsMobile(isMobileView);
      setGridLayout((prevLayout) => {
        if (isMobileView && prevLayout > 2) {
          return 1;
        }
        return prevLayout;
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (initialFilter) {
      handleFilterChange({
        types: [initialFilter],
        priceRange: [0, Math.max(...products.map((p) => p.OriginalPrice))],
      });
    } else {
      setFilteredProducts(products);
    }
  }, [initialFilter, products]);

  const handleFilterChange = (filters: {
    types: string[];
    priceRange: [number, number];
  }) => {
    const newFilteredProducts = products.filter((product) => {
      const typeMatch =
        filters.types.length === 0 || filters.types.includes(product.Type);
      const priceMatch =
        product.DiscountedPrice >= filters.priceRange[0] &&
        product.DiscountedPrice <= filters.priceRange[1];
      return typeMatch && priceMatch;
    });
    setFilteredProducts(newFilteredProducts);
  };

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <Filters
          products={products}
          onFilterChange={handleFilterChange}
          initialFilter={initialFilter}
        />
        <GridLayoutControl
          currentLayout={gridLayout}
          onLayoutChange={setGridLayout}
          isMobile={isMobile}
        />
      </div>
      <motion.div
        key={animationKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`grid ${gridClasses[gridLayout]} gap-6`}
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.Handle}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredProducts.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mt-8"
        >
          No products match the selected filters.
        </motion.p>
      )}
    </div>
  );
}
