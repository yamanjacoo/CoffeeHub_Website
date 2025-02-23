"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// Updated to match the new productDescriptions keys
const productTypes = ["Espresso Machines", "Coffee Grinders", "Coffee Accessories", "Replacement Parts"]

// Updated features to suit coffee products
const productFeatures = {
  "Espresso Machines": ["Precise Extraction", "PID Control"],
  "Coffee Grinders": ["Consistent Grind", "Adjustable Burrs"],
  "Coffee Accessories": ["Ergonomic Design", "Durable Materials"],
  "Replacement Parts": ["Easy Install", "Long-Lasting"],
}

const productDescriptions = {
  "Espresso Machines": {
    title: "Ariens Espresso Artisans",
    description:
      "Brew perfection with our masterfully crafted espresso machines. From velvety lattes to bold shots, elevate your coffee game with every pour.",
    image: "https://www.minipcaffe.com/cdn/shop/files/RancilioSilviaProXEspressoCoffeeMachine_2.jpg?v=1698309510",
  },
  "Coffee Grinders": {
    title: "Ariens Grind Masters",
    description:
      "Unlock the full flavor of your beans with our precision coffee grinders. From 54mm flat burrs to 80mm commercial-grade power, every grind is a masterpiece.",
    image: "https://www.nichecoffee.co.uk/cdn/shop/files/White-63C-dark-grey-bkg-1000px.jpg?v=1727943139&width=1000",
  },
  "Coffee Accessories": {
    title: "Ariens Brew Enhancers",
    description:
      "Perfect your ritual with our premium accessories—tamper, knockbox, and V60 drippers. Every detail matters when crafting your ultimate cup.",
    image: "https://coffeebros.com/cdn/shop/articles/best-espresso-machine-accessories-and-tools_fe4bda4a-c374-4de4-9915-a2c22891f509.jpg?v=1699188901",
  },
  "Replacement Parts": {
    title: "Ariens Coffee Lifeline",
    description:
      "Keep your machine humming with our Jura filters, portafilters, and PID thermoblocks. Extend the life of your brew with parts built to perform.",
    image: "https://i5.walmartimages.com/asr/450275e4-5186-43f3-9522-65bd92c6e412_1.5a56704e277d7d57ab26428e7639193f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  },
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = productTypes.map((type) => {
    const { title, description, image } = productDescriptions[type as keyof typeof productDescriptions]
    const features = productFeatures[type as keyof typeof productFeatures]
    return {
      title: title,
      highlight: type,
      description: description,
      image: image,
      link: `/products/${type.toLowerCase().replace(" ", "-")}`,
      features,
    }
  })

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  if (slides.length === 0) {
    return null
  }

  return (
    <section className="relative bg-background py-8 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          {/* Image Column */}
          <div className="relative w-full lg:w-1/2 mb-8 lg:mb-0 order-1 lg:order-2">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Elements */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-4 top-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold"
                >
                  50% OFF
                </motion.div>

                {slides[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={`${currentSlide}-${feature}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`absolute ${
                      index === 0
                        ? "right-4 top-1/4 bg-secondary text-secondary-foreground"
                        : "left-4 bottom-1/4 bg-yellow-500 text-white"
                    } px-3 py-1 rounded-xl shadow-lg text-sm`}
                  >
                    <span className="font-semibold">{feature}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="pointer-events-auto transform -translate-x-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="pointer-events-auto transform translate-x-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Dots Navigation */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-primary w-4" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Text Content Column */}
          <div className="w-full lg:w-1/2 space-y-6 z-10 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <p className="text-sm tracking-wider font-semibold text-primary">ELEVATE YOUR COFFEE EXPERIENCE</p>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    {slides[currentSlide].title}: <span className="text-primary">{slides[currentSlide].highlight}</span>
                  </div>
                </div>
                <div className="text-muted-foreground text-base sm:text-lg mt-4">
                  {slides[currentSlide].description}
                </div>
                <div className="mt-6">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 group w-full sm:w-auto" asChild>
                    <Link href="/products">
                      Shop now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}