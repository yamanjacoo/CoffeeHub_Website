"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const products = [
  {
    name: "Power+ Snow Blower",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-egopowerplus-2025--AjKUWIHRuGwrfCuwE9JWtxY9bQwrzg.png",
    rating: 5,
    description: "Featuring Peak Power™ technology for incredible snow-throwing capability.",
  },
  {
    name: "Power+ Leaf Blower",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-egopowerplus-2025--AjKUWIHRuGwrfCuwE9JWtxY9bQwrzg.png",
    rating: 5,
    description: "Variable-speed control delivers up to 650 CFM of clearing power.",
  },
  {
    name: "Power+ Electric Bike",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-egopowerplus-2025--AjKUWIHRuGwrfCuwE9JWtxY9bQwrzg.png",
    rating: 5,
    description: "Experience the power of electric with our innovative e-bike technology.",
  },
]

export function Products() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Every Tool Delivers Power Beyond Belief™</h2>
          <p className="text-muted-foreground">Browse our selection of professional-grade battery powered equipment</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="aspect-square relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {Array(product.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Shop Now</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

