import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy | UKCoffeeHub",
  description: "Understand UKCoffeeHub’s privacy practices and how we safeguard your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">UKCoffeeHub Privacy Policy</h1>
      <PrivacyPolicyContent />
    </div>
  );
}