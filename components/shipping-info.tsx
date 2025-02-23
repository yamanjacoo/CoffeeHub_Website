"use client";

import { useState, useEffect } from "react";
import { Truck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ShippingInfo() {
  const [postcode, setPostcode] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [country, setCountry] = useState("UK");

  useEffect(() => {
    // Basic UK postcode validation (e.g., SW1A 1AA or simple 5-7 char check)
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (postcode.length >= 5 && postcode.length <= 7 && postcodeRegex.test(postcode) && country) {
      const shippingInfo = getShippingInfo(country, postcode);
      setShippingDate(shippingInfo.shippingDate);
      setDeliveryDate(shippingInfo.deliveryDate);
    } else {
      setShippingDate("");
      setDeliveryDate("");
    }
  }, [postcode, country]);

  // Simulated function to get shipping info
  const getShippingInfo = (country: string, postcode: string) => {
    const today = new Date();
    let shippingDays = 0; // Same-day shipping if before cutoff
    let deliveryDays = 2; // UK standard 1-2 days

    if (country !== "UK") {
      shippingDays = 2; // International shipping delay
      deliveryDays = 7; // Longer for international
    }

    const shippingDate = new Date(today.setDate(today.getDate() + shippingDays));
    const deliveryDate = new Date(today.setDate(today.getDate() + deliveryDays));

    return {
      shippingDate: shippingDate.toLocaleDateString("en-GB"), // UK date format (DD/MM/YYYY)
      deliveryDate: deliveryDate.toLocaleDateString("en-GB"),
    };
  };

  return (
    <div className="border rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Truck className="mr-2 h-5 w-5" />
        Shipping Information
      </h2>
      <div className="flex items-center mb-4">
        <Select onValueChange={setCountry} defaultValue="UK">
          <SelectTrigger className="w-[180px] mr-2">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UK">United Kingdom</SelectItem>
            <SelectItem value="IE">Ireland</SelectItem>
            <SelectItem value="FR">France</SelectItem>
            <SelectItem value="DE">Germany</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Enter Postcode (e.g., SW1A 1AA)"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())} // UK postcodes are uppercase
          className="mr-2"
          maxLength={8} // UK postcodes max length with space
        />
        <Button onClick={() => setPostcode(postcode)}>Check</Button>
      </div>
      {shippingDate && deliveryDate && (
        <div className="text-sm">
          <p className="mb-2">
            <strong>Estimated Shipping Date:</strong> {shippingDate}
          </p>
          <p className="mb-2">
            <strong>Estimated Delivery Date:</strong> {deliveryDate}
          </p>
          <p className="flex items-center">
            <span className="text-green-600 font-semibold mr-2">Free Shipping</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Free shipping on all UK orders, delivered in 1-2 business days. International shipping rates and times may vary.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>
      )}
    </div>
  );
}