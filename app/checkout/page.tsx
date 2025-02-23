import { Checkout } from "@/components/checkout"

export const metadata = {
  title: "Checkout | Ariens",
  description: "Complete your purchase of Ariens products",
}

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const productInfo = {
    id: searchParams.id as string,
    name: searchParams.name as string,
    price: Number.parseFloat(searchParams.price as string),
    originalPrice: Number.parseFloat(searchParams.originalPrice as string),
    discountPercentage: Number.parseFloat(searchParams.discountPercentage as string),
    image: searchParams.image as string,
  }

  return <Checkout productInfo={productInfo} />
}

