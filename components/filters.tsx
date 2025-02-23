"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { Product } from "@/types/product";

interface FiltersProps {
  products: Product[];
  onFilterChange: (filters: FilterState) => void;
  initialFilter?: string;
}

interface FilterState {
  types: string[];
  priceRange: [number, number];
}

export function Filters({
  products,
  onFilterChange,
  initialFilter,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    types: initialFilter ? [initialFilter] : [],
    priceRange: [0, Math.max(...products.map((p) => p.OriginalPrice))],
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      types: initialFilter ? [initialFilter] : [],
    }));
  }, [initialFilter]);

  // Filter out empty types and get unique valid types
  const types = Array.from(
    new Set(products.map((p) => p.Type).filter(Boolean))
  );

  const handleTypeChange = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    const newFilters = { ...filters, types: newTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: value as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      types: [],
      priceRange: [0, Math.max(...products.map((p) => p.OriginalPrice))],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="relative z-10 w-full sm:w-auto">
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:w-auto mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 w-full sm:w-64 p-4 bg-background border rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Product Type</h4>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.types.includes(type)}
                        onCheckedChange={() => handleTypeChange(type)}
                      />
                      <Label htmlFor={type} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <Slider
                  min={0}
                  max={Math.max(...products.map((p) => p.OriginalPrice))}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
