"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    title: "Acceptance of the Terms of Use",
    content: `Last updated: February 22, 2025

    UKCoffeeHub ("we," "us," or "our") owns and operates the website ukcoffeehub.co.uk (the "Site") and any related services (collectively, the "Services") on which these Terms and Conditions of Use (these "Terms of Use") are posted.

    By accessing, browsing, purchasing from, or submitting information to the Services, you agree to be bound by these Terms of Use and our Privacy Policy, available [here](#) (the "Privacy Policy"), which is incorporated herein. If you do not agree with these Terms of Use or the Privacy Policy, please do not use the Services.`,
  },
  {
    title: "Changes to the Terms of Use",
    content: `We may update these Terms of Use at our discretion from time to time. Changes take effect immediately upon posting and apply to all subsequent use of the Services. However, any changes to the dispute resolution provisions in the Governing Law section will not apply to disputes for which we have received notice prior to the posting date.

    Your continued use of the Services after updated Terms of Use are posted indicates your acceptance of the changes. We encourage you to review this page periodically to stay informed, as these terms are legally binding on you.`,
  },
  {
    title: "Your Access and Use of the Site",
    content: `By accessing the Services, UKCoffeeHub grants you a limited, revocable, non-exclusive, non-transferable, non-sublicensable right to use the Services for personal or lawful business purposes (e.g., purchasing coffee machines or accessories). This right is personal to you and cannot be transferred to another person or entity, except if you are authorized to act on behalf of a business.

    You must use the Services lawfully and in accordance with these Terms of Use and the Privacy Policy. Prohibited actions include, but are not limited to, attempting to disrupt the Site’s functionality, using it for illegal purposes, or reproducing content without permission.`,
  },
  {
    title: "Purchases and Payments",
    content: `All purchases through the Site are subject to product availability and our acceptance of your order. Prices are in British Pounds (£) and include VAT where applicable. We reserve the right to correct pricing errors or cancel orders if items are out of stock.

    Payment must be made at the time of purchase via the methods provided on the Site. You agree to provide accurate billing and payment information.`,
  },
  {
    title: "Shipping and Delivery",
    content: `We offer free shipping across the UK with delivery typically within 1-2 business days. Full details are available on our [Shipping Information](/shipping) page. Delivery dates are estimates and may vary due to factors beyond our control, such as courier delays. You are responsible for providing a correct delivery address.`,
  },
  {
    title: "Returns and Refunds",
    content: `Under the UK Consumer Rights Act 2015, you may return products within 30 days of receipt for a refund or exchange if they are unused and in original condition. Please see our [Returns Policy](/returns) for instructions. This does not affect your statutory rights.`,
  },
  {
    title: "Governing Law",
    content: `These Terms of Use are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from your use of the Services will be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
];

export function TermsAndConditionsContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground mb-8">
        Please read these Terms of Use carefully before using ukcoffeehub.co.uk. By accessing or using this site, you agree to be bound by these terms.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AccordionItem value={section.title}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm max-w-none mt-2">
                  {section.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
}