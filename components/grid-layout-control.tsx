"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Grid2X2, Grid, Smartphone, Grid3X3 } from "lucide-react"

type GridLayout = 1 | 2 | 3 | 4

interface GridLayoutControlProps {
  currentLayout: GridLayout
  onLayoutChange: (layout: GridLayout) => void
  isMobile: boolean
}

export function GridLayoutControl({ currentLayout, onLayoutChange, isMobile }: GridLayoutControlProps) {
  const layouts = isMobile ? [1, 2] : [2, 3, 4]

  return (
    <motion.div
      className="flex space-x-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {layouts.map((layout) => (
        <motion.div key={layout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={currentLayout === layout ? "default" : "outline"}
            size="icon"
            onClick={() => onLayoutChange(layout as GridLayout)}
            aria-label={`${layout}x${layout} grid`}
          >
            {layout === 1 && <Smartphone className="h-4 w-4" />}
            {layout === 2 && <Grid2X2 className="h-4 w-4" />}
            {layout === 3 && <Grid3X3 className="h-4 w-4" />}
            {layout === 4 && <Grid className="h-4 w-4" />}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}

