"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const helpTopics = [
  {
    title: "Getting Started",
    icon: "☕",
    items: [
      {
        title: "How to set up your coffee machine",
        content: `
          <h3>Step-by-Step Setup Guide</h3>
          <ol>
            <li>Unbox your coffee machine and check all parts against the included list</li>
            <li>Install the water tank:
              <ul>
                <li>Fill with fresh water</li>
                <li>Attach a Jura water filter (if included)</li>
                <li>Securely connect to the machine</li>
              </ul>
            </li>
            <li>Connect to power and switch on</li>
            <li>Prime the system (run water through) as per the manual</li>
            <li>Add coffee beans to the hopper (if applicable)</li>
          </ol>
          <p>Watch our setup video for more details: <a href="#" class="text-primary hover:underline">Setup Guide Video</a></p>
        `,
      },
      {
        title: "First-time use instructions",
        content: `
          <h3>Before First Use</h3>
          <ul>
            <li>Run a cleaning cycle with water only</li>
            <li>Fill the grinder hopper with your preferred beans</li>
            <li>Check water hardness and set the filter accordingly</li>
            <li>Test the steam wand (if included)</li>
          </ul>
          <h3>First Brew Tips</h3>
          <ul>
            <li>Start with a medium roast for balanced flavour</li>
            <li>Adjust grind size—finer for espresso, coarser for filter</li>
            <li>Run a test shot to calibrate pressure</li>
            <li>Get familiar with the controls</li>
          </ul>
        `,
      },
      {
        title: "Safety guidelines",
        content: `
          <h3>Essential Safety Guidelines</h3>
          <ul>
            <li>Wear appropriate gear:
              <ul>
                <li>Heat-resistant gloves for steam wands</li>
                <li>Non-slip shoes in commercial settings</li>
              </ul>
            </li>
            <li>Keep the area clear of water spills</li>
            <li>Never touch hot surfaces like the group head</li>
            <li>Unplug before cleaning or maintenance</li>
            <li>Keep out of reach of children</li>
          </ul>
          <p class="mt-4 text-red-500">Important: Read the full safety manual before use</p>
        `,
      },
    ],
  },
  {
    title: "Troubleshooting",
    icon: "🔧",
    items: [
      {
        title: "Common issues and solutions",
        content: `
          <h3>Frequent Issues</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Machine Won’t Start</h4>
              <ul>
                <li>Check power connection</li>
                <li>Ensure water tank is full</li>
                <li>Verify the on/off switch is engaged</li>
                <li>Look for error lights</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Weak Espresso Flow</h4>
              <ul>
                <li>Adjust grind to coarser setting</li>
                <li>Clean portafilter and group head</li>
                <li>Descale the machine</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Grinder Not Working</h4>
              <ul>
                <li>Check for bean blockages</li>
                <li>Clean burrs with a brush</li>
                <li>Ensure hopper is properly seated</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        title: "Error codes explained",
        content: `
          <h3>Common Error Codes</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">E1: Water Tank Empty</h4>
              <p>Water level too low</p>
              <ul>
                <li>Refill the tank</li>
                <li>Check filter placement</li>
                <li>Restart the machine</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">E2: Overheating</h4>
              <p>Thermoblock or boiler too hot</p>
              <ul>
                <li>Let it cool for 15 minutes</li>
                <li>Check ventilation</li>
                <li>Run a water cycle</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">E3: Grinder Jam</h4>
              <p>Obstruction in burrs</p>
              <ul>
                <li>Turn off and unplug</li>
                <li>Clear beans with a brush</li>
                <li>Test with a small batch</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        title: "When to contact support",
        content: `
          <h3>Contact Support When:</h3>
          <ul>
            <li>Persistent error codes after troubleshooting</li>
            <li>Steam wand leaks or fails</li>
            <li>Unusual noises from grinder or pump</li>
            <li>Visible damage to parts</li>
          </ul>
          <h3>Support Contact Methods</h3>
          <ul>
            <li>Phone: 0800-123-4567 (Mon-Fri, 9AM-5PM GMT)</li>
            <li>Email: support@ukcoffeehub.co.uk</li>
            <li>Live Chat: Available on our website 24/7</li>
          </ul>
          <p class="mt-4">For urgent issues, reach out immediately</p>
        `,
      },
    ],
  },
  {
    title: "Maintenance",
    icon: "🧹",
    items: [
      {
        title: "Routine maintenance tips",
        content: `
          <h3>Regular Maintenance Schedule</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Daily</h4>
              <ul>
                <li>Wipe down exterior</li>
                <li>Empty drip tray</li>
                <li>Flush group head</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Weekly</h4>
              <ul>
                <li>Clean portafilter and baskets</li>
                <li>Run a cleaning cycle</li>
                <li>Brush grinder burrs</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Monthly</h4>
              <ul>
                <li>Descale with solution</li>
                <li>Check water filter</li>
                <li>Inspect seals and gaskets</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        title: "Cleaning your equipment",
        content: `
          <h3>Cleaning Guidelines</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">After Each Use</h4>
              <ul>
                <li>Purge steam wand</li>
                <li>Rinse portafilter</li>
                <li>Empty coffee grounds</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Deep Cleaning Steps</h4>
              <ul>
                <li>Unplug and cool down</li>
                <li>Backflush with cleaner</li>
                <li>Soak parts in warm water</li>
                <li>Clean grinder with a brush</li>
              </ul>
            </div>
            <p class="text-red-500">Warning: Avoid harsh chemicals on internal parts</p>
          </div>
        `,
      },
      {
        title: "Storing your tools",
        content: `
          <h3>Storage Preparation</h3>
          <ul>
            <li>Clean and dry all parts</li>
            <li>Remove water from tank</li>
            <li>Store in a dry, cool place</li>
            <li>Cover grinder hopper</li>
          </ul>
          <h3>Restart Checklist</h3>
          <ul>
            <li>Refill water tank</li>
            <li>Run a test cycle</li>
            <li>Check tamper and accessories</li>
            <li>Test grinder settings</li>
          </ul>
        `,
      },
    ],
  },
  {
    title: "Product Information",
    icon: "📘",
    items: [
      {
        title: "Product manuals",
        content: `
          <h3>Available Manuals</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Quick Start Guides</h4>
              <ul>
                <li><a href="#" class="text-primary hover:underline">Espresso Machine Basics (PDF)</a></li>
                <li><a href="#" class="text-primary hover:underline">Grinder Setup (PDF)</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Full Manuals</h4>
              <ul>
                <li><a href="#" class="text-primary hover:underline">Jura Machine Manual (PDF)</a></li>
                <li><a href="#" class="text-primary hover:underline">Parts List (PDF)</a></li>
                <li><a href="#" class="text-primary hover:underline">Maintenance Guide (PDF)</a></li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        title: "Specifications",
        content: `
          <h3>Technical Specifications</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Espresso Machines</h4>
              <ul>
                <li>Power: 1450W (Thermoblock/PID)</li>
                <li>Pressure: 15 bar</li>
                <li>Water Tank: 1.8L</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Grinders</h4>
              <ul>
                <li>Burr Sizes: 50mm-80mm</li>
                <li>Settings: Stepless adjustment</li>
                <li>Hopper Capacity: 300g</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Dimensions</h4>
              <ul>
                <li>Weight: 8-12kg (model dependent)</li>
                <li>Size: 30cm x 40cm x 35cm (avg)</li>
                <li>Portafilter: 58mm standard</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        title: "Accessories and parts",
        content: `
          <h3>Available Accessories</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold">Brewing Tools</h4>
              <ul>
                <li>Tampers (58mm, Precision)</li>
                <li>Knockbox</li>
                <li>V60 Dripper</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Cleaning</h4>
              <ul>
                <li>Jura Water Filters</li>
                <li>Descaling Tablets</li>
                <li>Cleaning Brushes</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold">Replacements</h4>
              <ul>
                <li>Portafilters</li>
                <li>Grinder Burrs</li>
                <li>Steam Wand Tips</li>
              </ul>
            </div>
          </div>
        `,
      },
    ],
  },
];

export function HelpCenterContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for coffee help..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpTopics.map((topic, index) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-3xl">{topic.icon}</span>
                {topic.title}
              </h2>
              <Accordion type="single" collapsible>
                {topic.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`${topic.title}-${itemIndex}`}>
                    <AccordionTrigger className="text-primary hover:text-primary/80">
                      <div className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        {item.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="prose prose-sm max-w-none mt-2"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
        <Button asChild>
          <Link href="/contact-us">Contact UKCoffeeHub Support</Link>
        </Button>
      </motion.div>
    </div>
  );
}