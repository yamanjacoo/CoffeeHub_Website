import type { Metadata } from "next";
import { TermsAndConditionsContent } from "@/components/terms-and-conditions-content";

export const metadata: Metadata = {
  title: "Terms & Conditions | UKCoffeeHub",
  description: "Review the Website Terms & Conditions of Use for UKCoffeeHub.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        UKCoffeeHub Website Terms & Conditions of Use
      </h1>
      <TermsAndConditionsContent />
    </div>
  );
}