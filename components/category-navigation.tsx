"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "All Products", href: "/products" },
  { name: "Lawn Mowers", href: "/products/lawn-mowers" },
  { name: "Snow Blowers", href: "/products/snow-blowers" },
  { name: "Pressure Washers", href: "/products/pressure-washers" },
  { name: "Leaf Blowers", href: "/products/leaf-blowers" },
]

export function CategoryNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const currentCategory = categories.find((category) => category.href === pathname) || categories[0]

  return (
    <div className="w-full mb-8">
      <div className="relative">
        <Button
          variant="outline"
          className="w-full justify-between text-lg font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentCategory.name}
          <ChevronDown
            className={cn("ml-2 h-4 w-4 transition-transform duration-200", {
              "transform rotate-180": isOpen,
            })}
          />
        </Button>
        <motion.div
          initial={false}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn("absolute z-10 w-full mt-2 bg-background border rounded-md shadow-lg overflow-hidden", {
            hidden: !isOpen,
          })}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link
                href={category.href}
                className={cn(
                  "block px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200",
                  pathname === category.href ? "bg-primary text-primary-foreground" : "text-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

