"use client"

import { useState } from "react"
import Image from "next/image"
import type { ProductImage } from "@/types/product"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: ProductImage[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative aspect-square w-full max-w-md mx-auto mb-2 sm:mb-4">
        <Image
          src={selectedImage.src || "/placeholder.svg"}
          alt={selectedImage.alt || "Product image"}
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden",
              selectedImage.src === image.src && "ring-2 ring-primary",
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt || `Product image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

