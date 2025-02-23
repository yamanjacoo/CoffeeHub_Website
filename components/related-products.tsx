"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  currentProduct: Product
  allProducts: Product[]
}

export function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const relatedProducts = allProducts.filter(
    (product) => product.Type === currentProduct.Type && product.Handle !== currentProduct.Handle,
  )

  const checkScroll = () => {
    const container = containerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [containerRef]) // Added containerRef to dependencies

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="relative">
        <motion.div
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-x-auto scrollbar-hide"
          onScroll={checkScroll}
        >
          {relatedProducts.map((product) => (
            <motion.div
              key={product.Handle}
              className="w-full sm:w-64"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hidden sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

