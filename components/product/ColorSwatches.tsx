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
    <div className="flex items-center gap-2 flex-wrap" dir={isEnglish ? "ltr" : "rtl"}>
      {colors.map((color) => (
        <motion.button
          key={color.name}
          onClick={() => onColorChange(color.name)}
          className="relative group"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title={isEnglish ? color.englishName : color.name}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              selectedColor === color.name
                ? "ring-2 ring-luxury-gold scale-110 border-luxury-gold"
                : "border-white/20 hover:border-white/40"
            }`}
            style={{ backgroundColor: color.hex }}
          />
          <span
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-luxury-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            {isEnglish ? color.englishName : color.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
