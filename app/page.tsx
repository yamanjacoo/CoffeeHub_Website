import { HeroCarousel } from "@/components/hero-carousel"
import { Features } from "@/components/features"
import { getProducts } from "@/lib/products"
import { FeaturedProducts } from "@/components/featured-products"
import { Partners } from "@/components/partners"
import { FAQ } from "@/components/faq"

export default async function Home() {
  const products = await getProducts()
  const featuredProducts = products.slice(0, 6) // Display first 6 products

  return (
    <div>
      <HeroCarousel />
      <Features />
      <FeaturedProducts products={featuredProducts} />
      <Partners />
      <FAQ />
    </div>
  )
}

