import type { Metadata } from "next"
import { ProductRegistrationForm } from "@/components/product-registration-form"

export const metadata: Metadata = {
  title: "Product Registration | PowerMowers",
  description: "Register your PowerMowers product to activate your warranty and receive important updates.",
}

export default function ProductRegistrationPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Product Registration</h1>
      <ProductRegistrationForm />
    </div>
  )
}

