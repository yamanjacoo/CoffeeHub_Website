import type { Metadata } from "next";
import { AboutUsContent } from "@/components/about-us-content";

export const metadata: Metadata = {
  title: "About Us | UKCoffeeHub",
  description: "Discover UKCoffeeHub, our passion for coffee, and our dedication to premium coffee equipment.",
};

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About UKCoffeeHub</h1>
      <AboutUsContent />
    </div>
  );
}