"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of coffee machines do you sell?",
    answer:
      "We offer a wide variety of coffee machines to suit every need, from home espresso machines and semi-automatic models to commercial-grade equipment. Our range includes top brands like Jura, alongside manual lever machines, double boiler systems with PID, and thermoblock models. Whether you're a home barista or running a café, we've got you covered.",
  },
  {
    question: "How do I choose the right coffee grinder for my setup?",
    answer:
      "Choosing a grinder depends on your brewing style and volume. We stock grinders with flat burrs ranging from 50 mm to 80 mm, perfect for espresso, filter coffee, or commercial use. For precision, consider features like adjustable settings and durable materials. Our team can help you find the ideal match—get in touch!",
  },
  {
    question: "Do you sell accessories and parts for coffee machines?",
    answer:
      "Yes, we provide a full range of accessories and replacement parts, including portafilters, tampers, knockboxes, milk frothing pitchers, and Jura water filters. We also offer cleaning essentials like descaling agents, cleaning tablets, and brushes to keep your equipment in top shape.",
  },
  {
    question: "What coffee beans do you recommend?",
    answer:
      "We stock premium coffee beans in light, medium, medium-dark, and dark roasts to suit all tastes. Whether you’re brewing espresso, filter coffee, or using a V60 dripper, our beans pair perfectly with our machines. Try our curated selection for a rich, consistent flavour every time.",
  },
  {
    question: "Are your machines suitable for commercial use?",
    answer:
      "Absolutely! Our commercial range includes high-performance espresso machines, grinders with 80 mm burrs, and durable parts designed for heavy use. They’re built to handle busy coffee shops while delivering exceptional quality, shot after shot.",
  },
  {
    question: "How should I maintain my coffee machine?",
    answer:
      "Regular maintenance keeps your machine brewing perfectly. Use our water filters, descaling solutions, and cleaning tablets as recommended. Clean the grinder burrs with our specialised products and check parts like the heat exchanger or thermoblock periodically. Follow the manual for best results!",
  },
  {
    question: "What’s your warranty policy?",
    answer:
      "We stand by the quality of our products with warranties on all coffee machines and equipment. Coverage varies by item, so check the product page for details. If anything goes wrong, our UK-based support team is here to assist you.",
  },
  {
    question: "When’s the best time to buy a coffee machine?",
    answer:
      "Spring and autumn are great times to snag deals, but we offer competitive prices year-round. Whether you’re upgrading your home setup or kitting out a workplace, there’s never a bad time to invest in better coffee with us!",
  },
  {
    question: "What’s your return policy?",
    answer:
      "We offer a 30-day return window. If your machine or accessory isn’t quite right, return it in its original condition for a full refund or exchange. Contact our friendly team to start the process—we’ll sort it out quickly.",
  },
  {
    question: "Any safety tips for using coffee equipment?",
    answer:
      "Always read the manual before use, keep hands clear of moving parts like grinder burrs, and unplug the machine during cleaning. For espresso machines, let them cool down before handling parts like the portafilter. Safety first, coffee second!",
  },
  {
    question: "How can I order from your store?",
    answer:
      "Ordering is easy—browse our website, pick your coffee machine, grinder, or accessories, and head to checkout. From Jura filters to V60 drippers, we’ve got everything you need to brew like a pro. Shop now and elevate your coffee game! ☕",
  },
  {
    question: "What are your shipping options in the UK?",
    answer:
      "We offer free shipping across the UK on all orders, with delivery in 1-2 business days. Whether it’s a tamper or a commercial espresso machine, your gear arrives fast and hassle-free, ready to brew.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="w-12 h-1 bg-primary mb-6 mx-auto" />
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Got questions about our coffee machines and gear? We’ve got answers.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <div key={index}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b border-muted last:border-b-0"
                >
                  <AccordionTrigger className="py-6 text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}