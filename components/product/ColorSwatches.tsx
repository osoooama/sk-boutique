"use client";

import { motion } from "framer-motion";
import type { ProductColor } from "@/lib/types";

interface ColorSwatchesProps {
  colors: ProductColor[];
  selectedColor: string;
  onColorChange: (colorName: string) => void;
  isEnglish?: boolean;
}

export default function ColorSwatches({
  colors,
  selectedColor,
  onColorChange,
  isEnglish = false,
}: ColorSwatchesProps) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap" dir={isEnglish ? "ltr" : "rtl"}>
      {colors.map((color) => (
        <motion.button
          key={color.name}
          onClick={() => onColorChange(color.name)}
          className="relative group"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
              selectedColor === color.name
                ? "border-accent-gold ring-2 ring-accent-gold/40"
                : "border-transparent hover:border-border-strong"
            }`}
            style={{ backgroundColor: color.hex }}
          />
          <span
            className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-accent-gold bg-surface-primary/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            {isEnglish ? color.englishName : color.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
