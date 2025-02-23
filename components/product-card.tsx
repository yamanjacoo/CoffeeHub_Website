"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
      {hasHalfStar && <Star className="w-4 h-4 fill-primary text-primary" />}
      <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
    </div>
  )
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.Images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.Images.length - 1 : prevIndex - 1))
  }

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="overflow-hidden group h-full flex flex-col">
        <CardContent className="p-0">
          <motion.div className="relative aspect-square" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Image
              src={product.Images[currentImageIndex]?.src || "/placeholder.svg"}
              alt={product.Images[currentImageIndex]?.alt || product.Title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out"
            />
            {product.Images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault()
                    prevImage()
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault()
                    nextImage()
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <motion.div
              className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              -{product.DiscountPercentage.toFixed(0)}%
            </motion.div>
          </motion.div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2">{product.Title}</h3>
            <RatingStars rating={product.Rating} />
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">${product.DiscountedPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${product.OriginalPrice.toFixed(2)}</span>
            </div>
            <Link href={`/products/${product.Handle}`}>
              <Button className="w-full text-xs sm:text-sm" variant="default">
                Buy Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

