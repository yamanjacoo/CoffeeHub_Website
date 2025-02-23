"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";

const shippingInfo = [
  {
    title: "Free 1-2 Day Shipping",
    description:
      "Enjoy complimentary standard shipping on all orders within the contiguous United States. Your order will arrive within 1-2 business days from the date of purchase.",
    icon: Truck,
  },
  {
    title: "Shipping Timeframes",
    description:
      "Orders are typically processed within 1 business day. Shipping time is 1-2 business days, depending on your location. Please note that delivery times may be longer for Alaska, Hawaii, and international orders.",
    icon: Clock,
  },
  {
    title: "International Shipping",
    description:
      "We offer international shipping to select countries. International orders may incur additional customs fees and taxes, which are the responsibility of the recipient.",
    icon: Globe,
  },
  {
    title: "Tracking Your Order",
    description:
      "Once your order ships, you'll receive a confirmation email with tracking information. You can track your package's progress at any time through our website or the carrier's site.",
    icon: ShieldCheck,
  },
];

export function ShippingContent() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-xl text-muted-foreground mb-6">
          At Ariens, we're committed to getting your products to you quickly and
          efficiently. That's why we offer free 1-2 day shipping on all orders
          within the contiguous United States.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {shippingInfo.map((info, index) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <info.icon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{info.title}</h2>
            <p className="text-muted-foreground">{info.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-primary/10 rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-4">Returns Policy</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We stand behind the quality of our products. If you're not
            completely satisfied with your purchase, you can return it within 30
            days of receipt for a full refund or exchange, subject to the
            following conditions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              The item must be in its original, unused condition with all
              original packaging and accessories.
            </li>
            <li>
              Shipping costs for returns are the responsibility of the customer,
              unless the return is due to our error.
            </li>
            <li>
              Refunds will be processed to the original payment method within
              5-10 business days of receiving the returned item.
            </li>
            <li>
              For warranty-related issues, please refer to our{" "}
              <Link
                href="/support/warranty"
                className="text-primary hover:underline"
              >
                Warranty page
              </Link>
              .
            </li>
          </ul>
          <p className="text-muted-foreground">
            To initiate a return, please contact our customer service team for a
            Return Merchandise Authorization (RMA) number and further
            instructions.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card rounded-lg p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Shipping FAQs</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            Do you ship to PO boxes? Yes, we can ship to PO boxes for most
            items.
          </li>
          <li>
            Can I change my shipping address after placing an order? Please
            contact our customer service as soon as possible if you need to
            change your shipping address.
          </li>
          <li>
            What if my package is lost or damaged? Contact our customer service
            immediately, and we'll work to resolve the issue promptly.
          </li>
          <li>
            Do you offer expedited shipping? For urgent orders, please contact
            our customer service for expedited shipping options.
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about our shipping policies or need
          assistance with a return, our customer service team is here to help.
        </p>
        <Link
          href="/company/contact-us"
          className="text-primary hover:underline"
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
}
