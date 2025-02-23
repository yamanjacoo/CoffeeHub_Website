import type { Metadata } from "next";
import { WarrantyContent } from "@/components/warranty-content";

export const metadata: Metadata = {
  title: "Warranty Information | UKCoffeeHub",
  description: "Discover the warranty coverage for your UKCoffeeHub coffee machines and equipment.",
};

export default function WarrantyPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">UKCoffeeHub Warranty Information</h1>
      <WarrantyContent />
    </div>
  );
}