"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Eye, Lock, AlertTriangle, Globe, RefreshCw, Phone } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    content: `Last updated: February 22, 2025

    At UKCoffeeHub ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website, ukcoffeehub.co.uk (the "Site"), purchase coffee machines or equipment, or interact with our services. We adhere to the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018 to ensure your data is handled responsibly.`,
    icon: Shield,
  },
  {
    title: "Information We Collect",
    content: `We collect personal information you provide voluntarily, such as:
    - Name, email address, phone number, and delivery/billing address when you order or register a product.
    - Payment details (processed securely via third-party providers, not stored by us).

    We also automatically collect:
    - IP address, browser type, device information, and Site usage data (e.g., pages visited) via cookies and analytics tools.`,
    icon: Eye,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to:
    - Process and deliver your orders (e.g., shipping your coffee grinder).
    - Manage product registrations and warranties.
    - Respond to inquiries and provide customer support.
    - Improve our Site and services through analytics.
    - Send promotional emails or updates (with your consent, opt-out available).`,
    icon: Clock,
  },
  {
    title: "Information Sharing",
    content: `We may share your information with:
    - Service providers (e.g., couriers like Royal Mail or DPD, payment processors like Stripe).
    - Legal authorities if required by UK law.
    - Business partners only with your consent or as part of a corporate transaction (e.g., a merger).
    We do not sell your personal information.`,
    icon: Lock,
  },
  {
    title: "Children’s Privacy",
    content: `Our Site and services are not intended for anyone under 16. We do not knowingly collect personal information from children under 16. If we discover such data has been collected without parental consent, we will delete it promptly. Contact us at support@ukcoffeehub.co.uk if you believe we have information from a child under 16.`,
    icon: AlertTriangle,
  },
  {
    title: "Security",
    content: `We use reasonable measures, such as SSL encryption, to protect your personal information. However, no online transmission is completely secure, and we cannot guarantee absolute security. Your use of the Site and provision of data is at your own risk, though we strive to minimize threats.`,
    icon: Lock,
  },
  {
    title: "International Transfers",
    content: `Your data is primarily processed in the UK. If transferred outside the UK (e.g., to EU or US service providers), we ensure appropriate safeguards are in place, such as Standard Contractual Clauses, to comply with UK GDPR. By using our Site, you consent to such transfers where necessary for order fulfillment or support.`,
    icon: Globe,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy as needed, with changes effective upon posting on ukcoffeehub.co.uk. The "Last updated" date at the top reflects the latest version. We encourage you to review this page periodically. Your continued use of the Site after updates signifies your acceptance of the revised policy.`,
    icon: RefreshCw,
  },
  {
    title: "Contact Us",
    content: `For questions, to exercise your data rights, or to update your preferences, contact us at:

    Email: support@ukcoffeehub.co.uk
    Phone: 0800-123-4567
    Mail: UKCoffeeHub, [Your Address], United Kingdom

    You may also lodge a complaint with the UK Information Commissioner’s Office (ICO) if unsatisfied with our response.`,
    icon: Phone,
  },
];

export function PrivacyPolicyContent() {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-card rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <section.icon className="w-8 h-8 text-primary mr-4" />
            <h2 className="text-2xl font-bold">{section.title}</h2>
          </div>
          <div className="prose prose-sm max-w-none">
            {section.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-2">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-muted-foreground">
          This Privacy Policy outlines our commitment to your data protection. For further details or to exercise your rights, please reach out to us.
        </p>
      </motion.div>
    </div>
  );
}