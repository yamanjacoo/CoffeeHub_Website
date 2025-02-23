"use client";

import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "UKCoffeeHub has elevated my morning routine to a whole new level. Their espresso machines are sleek, powerful, and so easy to use—I’m pulling barista-quality shots at home every day!",
    author: "Sophie Taylor",
    position: "Coffee Enthusiast",
    rating: 5,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "As a café owner, I rely on equipment that’s both reliable and efficient. UKCoffeeHub’s grinders and machines have streamlined our workflow—consistent grinds and perfect espresso every time.",
    author: "James Carter",
    position: "Café Owner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1622766815178-641bef2b4630?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "Switching to UKCoffeeHub’s gear was a game-changer for my small business. The precision of their espresso machines and the quality of their accessories have impressed all my clients.",
    author: "Elena Rossi",
    position: "Mobile Barista",
    rating: 5,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "I love how UKCoffeeHub’s products make coffee-making feel effortless. The tamper and knockbox are so well-designed, and my espresso machine delivers café-quality drinks every time.",
    author: "Liam Hughes",
    position: "Home Barista",
    rating: 5,
    image: "https://images.unsplash.com/photo-1594751543129-6701ad444259?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "The durability of UKCoffeeHub’s equipment is unmatched. My grinder’s 64mm burrs still perform like new after months of daily use, and their customer support is top-notch!",
    author: "Olivia Bennett",
    position: "Coffee Lover",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "UKCoffeeHub’s replacement parts saved my espresso machine! The Jura filter and portafilter were easy to install, and now my brews are back to perfection.",
    author: "Henry Clarke",
    position: "DIY Coffee Fixer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "I was hesitant about investing in a semi-pro espresso machine, but UKCoffeeHub proved me wrong. It’s quiet, powerful, and the PID control makes every shot flawless.",
    author: "Amara Patel",
    position: "Homeowner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1596510914965-9ae08acae566?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "Running a busy coffee shop means I need equipment I can trust. UKCoffeeHub’s commercial grinders and machines handle our volume with ease—pure quality in every cup.",
    author: "David Kim",
    position: "Coffee Shop Manager",
    rating: 5,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "UKCoffeeHub’s accessories are a dream for any coffee nerd. The V60 dripper and precision tamper have taken my pour-overs to the next level—highly recommend!",
    author: "Freya Jensen",
    position: "Pour-Over Fanatic",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "I run a catering service, and UKCoffeeHub’s equipment has been a lifesaver. Compact, powerful, and easy to maintain—my clients rave about the coffee every time!",
    author: "Noah Evans",
    position: "Caterer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "The espresso machine from UKCoffeeHub is a masterpiece. It’s so intuitive to use, and the double boiler keeps my lattes piping hot—best purchase I’ve made!",
    author: "Isla Murray",
    position: "Homeowner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "UKCoffeeHub’s grinder transformed my coffee game. The 54mm burrs give me the perfect grind every time, and it’s so quiet my family doesn’t even notice!",
    author: "Mateo Lopez",
    position: "Early Riser",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "The accessories from UKCoffeeHub are a barista’s dream. The tamper fits perfectly in my hand, and the knockbox keeps my setup clean—small details that make a big difference.",
    author: "Zara Khan",
    position: "Aspiring Barista",
    rating: 5,
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "We upgraded our office coffee station with UKCoffeeHub’s gear. The espresso machine and grinder combo is a staff favorite—productivity’s never been higher!",
    author: "Ethan Brooks",
    position: "Office Manager",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    text: "UKCoffeeHub’s equipment is a must for any serious coffee lover. The sleek design and flawless performance make every brew a joy—I’m obsessed!",
    author: "Mila Svensson",
    position: "Coffee Aficionado",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function TrustRating() {
  return (
    <div className="flex flex-col items-center justify-center mt-6 pt-6 border-t text-center px-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="flex">
          {[1, 2, 3, 4].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#00b67a] text-[#00b67a]" />
          ))}
          <Star className="w-5 h-5 fill-[#00b67a]/30 text-[#00b67a]" />
        </div>
        <span className="font-semibold text-foreground">4.8 / 5</span>
      </div>
      <p className="text-sm text-muted-foreground mb-1 max-w-[300px] mx-auto">
        Based on 1,245 reviews. Showing our 4 & 5 star reviews.
      </p>
      <div className="flex items-center justify-center gap-2">
        <span className="text-[#00b67a] font-bold">Trustpilot</span>
        <Star className="w-5 h-5 fill-[#00b67a] text-[#00b67a]" />
      </div>
    </div>
  );
}

export function Features() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    let scrollPosition = 0;
    let lastTimestamp = 0;
    const speed = 100; // pixels per second

    const scroll = (timestamp: number) => {
      if (isPaused) {
        lastTimestamp = timestamp;
        requestAnimationFrame(scroll);
        return;
      }

      const deltaTime = timestamp - lastTimestamp;
      scrollPosition += (speed * deltaTime) / 1000;

      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      lastTimestamp = timestamp;
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);

    return () => {
      // Cleanup if needed
    };
  }, [isPaused]);

  return (
    <section className="py-24 bg-secondary overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Thousands of Happy Baristas
            <br />
            Across the UK
          </h2>
          <p className="text-muted-foreground">Discover why UKCoffeeHub is the choice of coffee lovers everywhere</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={scrollRef} className="flex overflow-x-hidden gap-6 pb-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-[300px] md:w-[350px]">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        <TrustRating />
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="h-full">
      <Card className="h-full p-6 transition-shadow hover:shadow-lg">
        <div className="space-y-4">
          <p className="text-foreground line-clamp-4">{testimonial.text}</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={`Portrait of ${testimonial.author}`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">{testimonial.author}</p>
              <p className="text-sm text-foreground">{testimonial.position}</p>
            </div>
          </div>
          <StarRating rating={testimonial.rating} />
        </div>
      </Card>
    </div>
  );
}