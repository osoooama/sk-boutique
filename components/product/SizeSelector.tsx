"use client";

import { motion } from "framer-motion";

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
                ? "bg-accent-gold text-surface-primary border-accent-gold"
                : "border-border text-accent-gold bg-white/5 hover:bg-accent-gold-muted hover:border-accent-gold/30"
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
