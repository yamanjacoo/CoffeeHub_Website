"use client";

import { motion } from "framer-motion";
import { Shield, Clock, PenToolIcon as Tool, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const warrantyFeatures = [
  {
    icon: Shield,
    title: "Comprehensive Coverage",
    description: "Our warranty protects against manufacturing defects in your coffee machines and parts.",
  },
  {
    icon: Clock,
    title: "Extended Protection",
    description: "Enjoy peace of mind with warranties up to 2 years on select coffee equipment.",
  },
  {
    icon: Tool,
    title: "Expert Repairs",
    description: "Repairs by certified technicians using genuine UKCoffeeHub-approved parts.",
  },
  {
    icon: CheckCircle,
    title: "Easy Claims Process",
    description: "A hassle-free warranty claim process designed with you in mind.",
  },
];

export function WarrantyContent() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-xl text-muted-foreground mb-6">
          At UKCoffeeHub, we’re committed to the quality of our coffee machines and equipment. Our warranties ensure you can brew with confidence.
        </p>
        <Button asChild size="lg">
          <Link href="/product-registration">Register Your Product</Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {warrantyFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <feature.icon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-primary/10 rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-4">Warranty Terms</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>2-year warranty on home coffee machines (e.g., Jura E8, Semi-Pro models)</li>
          <li>1-year warranty on commercial equipment (e.g., 80mm Burr Grinder)</li>
          <li>6-month warranty on accessories (e.g., tampers, V60 drippers)</li>
          <li>Covers defects in materials and workmanship under normal use</li>
          <li>Excludes misuse, improper maintenance (e.g., not descaling), or normal wear</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        id="register"
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Register Your Product</h2>
        <p className="text-muted-foreground mb-6">
          Register your UKCoffeeHub product to activate your warranty and stay updated on your coffee gear.
        </p>
        <Button asChild size="lg">
          <Link href="/product-registration">Register Now</Link>
        </Button>
      </motion.div>
    </div>
  );
}