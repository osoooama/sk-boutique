"use client";

import { motion } from "framer-motion";

interface SizeOption {
  size: string;
  available: boolean;
}

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <motion.button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`w-11 h-11 rounded-xl text-xs font-bold border transition-all duration-200 ${
              isSelected
                ? "bg-luxury-gold text-luxury-black border-luxury-gold"
                : "border-white/10 text-luxury-gold bg-white/5 hover:bg-luxury-gold/10 hover:border-luxury-gold/30"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {size}
          </motion.button>
        );
      })}
    </div>
  );
}
