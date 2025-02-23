"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/types/product"
import Link from "next/link"

interface ProductPreviewProps {
  products: Product[]
  category: string
}

export function ProductPreview({ products, category }: ProductPreviewProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const filteredProducts = products.filter((p) => p.Type === category)
    if (filteredProducts.length > 0) {
      const shuffled = filteredProducts.sort(() => 0.5 - Math.random())
      setSelectedProducts(shuffled.slice(0, 3))

      // Add a slight delay before showing the preview
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [products, category])

  if (selectedProducts.length === 0) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 mt-2 bg-background border shadow-lg rounded-lg overflow-hidden z-50 w-[300px]"
        >
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-lg mb-2 text-foreground">{category}</h3>
            {selectedProducts.map((product, index) => (
              <motion.div
                key={product.Handle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 group"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={product.Images[0]?.src || "/placeholder.svg"}
                    alt={product.Title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <Link
                    href={`/products/${product.Handle}`}
                    className="font-medium text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {product.Title}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">${product.DiscountedPrice.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
            <Link
              href={`/products?type=${encodeURIComponent(category)}`}
              className="block text-center text-sm text-primary hover:text-primary/80 transition-colors mt-4"
            >
              View all {category}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

