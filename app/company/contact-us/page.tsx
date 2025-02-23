import type { Metadata } from "next"
import { ContactUsContent } from "@/components/contact-us-content"

export const metadata: Metadata = {
  title: "Contact Us | Ariens",
  description: "Get in touch with Ariens for support, sales inquiries, or general questions.",
}

export default function ContactUsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <ContactUsContent />
    </div>
  )
}

