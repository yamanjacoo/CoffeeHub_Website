"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Menu, X, Phone, Facebook, Instagram } from "lucide-react"

const categories = [
  { name: "All Products", href: "/products" },
  { name: "Contact us", href: "/company/contact-us" },
  { name: "About", href: "/company/about-us" },
]

const announcements = [
  "🌎 Free Worldwide Shipping on All Orders!",
  "🚚 Fast & Free International Delivery",
  "✨ Free Shipping to Your Doorstep, Anywhere in the World",
  "🌍 Global Free Shipping, Local Support",
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsOverlayVisible(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div className="w-full bg-white text-sm py-2 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Social media icons - hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          {/* Announcement text - shown on all screen sizes */}
          <p className="font-medium text-primary text-center flex-1 sm:flex-none">
            <motion.span
              key={currentAnnouncement}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="block"
            >
              {announcements[currentAnnouncement]}
            </motion.span>
          </p>
          {/* Phone number - hidden on mobile */}
          <Link
            href="tel:1-877-520-8665"
            className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+447508219590</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-40 h-12 md:w-48 md:h-14"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="https://coffeehub.dk/wp-content/uploads/2017/04/horizontal-lock-up_colored-2.png"
                    alt="UkCoffeeHub Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-primary-foreground hover:text-white transition-colors duration-200 ease-in-out relative group"
                >
                  {category.name}
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out" />
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <button
                aria-label="Search"
                className="text-primary-foreground hover:text-white transition-colors duration-200"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                aria-label="User account"
                className="text-primary-foreground hover:text-white transition-colors duration-200"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-primary-foreground hover:text-white transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleMenu}
              />
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-4/5 bg-primary z-50 overflow-y-auto"
              >
                <div className="flex justify-end p-4">
                  <button
                    onClick={toggleMenu}
                    className="text-primary-foreground hover:text-white transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="px-4 py-2 space-y-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block py-2 text-lg font-medium text-primary-foreground hover:text-white hover:bg-primary-foreground/10 transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="px-4 py-4 border-t border-primary-foreground/10">
                  <div className="flex items-center space-x-4">
                    <button
                      aria-label="Search"
                      className="text-primary-foreground hover:text-white transition-colors duration-200"
                    >
                      <Search className="w-6 h-6" />
                    </button>
                    <button
                      aria-label="User account"
                      className="text-primary-foreground hover:text-white transition-colors duration-200"
                    >
                      <User className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

