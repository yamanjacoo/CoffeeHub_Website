"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

type Product = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export function CheckoutSummary() {
  const [products, setProducts] = useState<Product[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // In a real application, you would fetch this data from your cart state or API
    const cartProducts: Product[] = [
      {
        id: "1",
        name: "Ariens IKON XD 52",
        price: 3999,
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        id: "2",
        name: "Ariens Path-Pro SS21E",
        price: 699,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ]
    setProducts(cartProducts)

    const newSubtotal = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
    setSubtotal(newSubtotal)

    const newTax = newSubtotal * 0.08 // Assuming 8% tax rate
    setTax(newTax)

    setTotal(newSubtotal + newTax)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Place Order</Button>
      </CardFooter>
    </Card>
  )
}

