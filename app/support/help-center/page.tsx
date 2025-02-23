import type { Metadata } from "next"
import { HelpCenterContent } from "@/components/help-center-content"

export const metadata: Metadata = {
  title: "Help Center | Ariens",
  description: "Get answers to your questions and find the support you need for your Ariens products.",
}

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Help Center</h1>
      <HelpCenterContent />
    </div>
  )
}

