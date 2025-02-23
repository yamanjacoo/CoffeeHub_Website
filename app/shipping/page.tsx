import type { Metadata } from "next";
import { ShippingContent } from "@/components/shipping-content";

export const metadata: Metadata = {
  title: "Shipping Information | Ariens",
  description:
    "Learn about our free 1-2 day shipping and other delivery options for Ariens products.",
};

export default function ShippingPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Shipping Information
      </h1>

      <ShippingContent />
    </div>
  );
}
