import { ReturnsPolicyContent } from "@/components/returns-policy-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns Policy | UKCoffeeHub",
  description: "Discover our 30-day return policy for UKCoffeeHub coffee machines and equipment.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">UKCoffeeHub Returns Policy</h1>
      <ReturnsPolicyContent />
    </div>
  );
}