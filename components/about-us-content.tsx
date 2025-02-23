"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Coffee, Users, Truck, Award } from "lucide-react";

export function AboutUsContent() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative py-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Brewing Excellence Since Day One</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From a small coffee passion project to a trusted UK retailer, UKCoffeeHub is dedicated to bringing premium coffee machines and equipment to homes and businesses across the nation.
        </p>
      </motion.section>

      {/* Heritage Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
            Our Heritage
          </div>
          <h2 className="text-3xl font-bold">A Passion for Coffee</h2>
          <p className="text-lg text-muted-foreground">
            Born in Stourbridge, UKCoffeeHub started with a simple mission: to make exceptional coffee accessible. From our roots in the West Midlands, we’ve grown by partnering with top brands like Jura, delivering quality and innovation to every cup.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">UK-Based</h3>
              <p className="text-muted-foreground">Proudly serving from Stourbridge</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Top Brands</h3>
              <p className="text-muted-foreground">Curated coffee equipment</p>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yaros_04-Etsr8YJjHS5iyb2w82OV5Mq3oXNz4r.png"
            alt="UKCoffeeHub coffee equipment showcase"
            fill
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-b from-primary/5 to-transparent rounded-2xl p-12"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: Coffee,
              title: "Quality",
              description: "Premium coffee machines and gear for every brew",
            },
            {
              icon: Users,
              title: "Community",
              description: "Supporting coffee lovers across the UK",
            },
            {
              icon: Truck,
              title: "Service",
              description: "Fast, free delivery in 1-2 days nationwide",
            },
            {
              icon: Award,
              title: "Expertise",
              description: "Trusted advice and top-tier support",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center bg-secondary/50 rounded-2xl p-12"
      >
        <h2 className="text-3xl font-bold mb-4">Join the Coffee Revolution</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Whether you’re perfecting your espresso at home or outfitting a café, UKCoffeeHub is your partner in crafting the perfect brew. Explore our range and see why we’re passionate about coffee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact-us">Get in Touch</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}