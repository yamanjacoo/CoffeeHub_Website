"use client";

import { motion } from "framer-motion";
import { RefreshCcw, AlertTriangle, RotateCcw, CreditCard } from "lucide-react";

const policyItems = [
  {
    title: "30-Day Return Policy",
    icon: RefreshCcw,
    content: `We offer a 30-day return policy, meaning you have 30 days from the delivery date to request a return. To qualify, your item must be unused, in its original condition, with all packaging and accessories intact, and accompanied by proof of purchase (e.g., order confirmation).

    To initiate a return, email us at support@ukcoffeehub.co.uk or call 0800-123-4567. If approved, we’ll provide a prepaid return label for UK shipments and instructions on returning your item to our UK warehouse. Items sent back without prior authorization will not be accepted.`,
  },
  {
    title: "Damages and Issues",
    icon: AlertTriangle,
    content: `Please check your order upon receipt and contact us immediately at support@ukcoffeehub.co.uk if your coffee machine, grinder, or accessory is defective, damaged, or incorrect. We’ll assess the issue and arrange a replacement or refund, including return shipping costs, to resolve it quickly.`,
  },
  {
    title: "Exceptions / Non-Returnable Items",
    icon: RotateCcw,
    content: `Some items cannot be returned, including:
    - Used or opened consumables (e.g., coffee beans).
    - Custom-made products (e.g., personalized tampers).
    - Items damaged due to misuse or lack of maintenance (e.g., coffee machines not descaled).
    We do not accept returns for clearance items or gift cards. Contact us with any questions about specific products.`,
  },
  {
    title: "Refunds",
    icon: CreditCard,
    content: `Once we receive and inspect your return (typically within 5 business days), we’ll notify you of approval or rejection. If approved, your refund will be processed to your original payment method within 10 business days. Note that it may take additional time for your bank or card issuer to reflect the refund.

    If more than 15 business days have passed since approval without a refund, please email us at support@ukcoffeehub.co.uk.`,
  },
];

export function ReturnsPolicyContent() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-xl text-muted-foreground mb-6">
          At UKCoffeeHub, your satisfaction is our priority. Our 30-day returns policy ensures you can shop for coffee machines and equipment with confidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {policyItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <item.icon className="w-8 h-8 text-primary mr-4" />
              <h2 className="text-2xl font-semibold">{item.title}</h2>
            </div>
            <div className="prose prose-sm max-w-none">
              {item.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
        <p className="text-muted-foreground mb-4">
          Got questions about returns or need help? Our UK-based support team is ready to assist you.
        </p>
        <a href="mailto:support@ukcoffeehub.co.uk" className="text-primary hover:underline">
          Contact Us
        </a>
      </motion.div>
    </div>
  );
}