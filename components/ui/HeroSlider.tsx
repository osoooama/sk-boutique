"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSliderProps {
  isEnglish?: boolean;
}

const SLIDES = [
  "/clothing/sk_boutique977-photo-DHgKbsmNsb7-20250322_160119_485626926.webp",
  "/clothing/sk_boutique977-photo-DHgrFOOs96l-20250322_204636_485743576.webp",
  "/clothing/sk_boutique977-photo-DMdcVqDs9oL-20250723_211701_523124697.webp",
  "/clothing/sk_boutique977-photo-DNOLea3MMcE-20250811_193226_530569642.webp",
  "/clothing/sk_boutique977-photo-DPmVJN7jICH-20251009_214130_561922161.webp",
  "/clothing/sk_boutique977-photo-DYsrFPZsvLJ-20260524_013125_706198458.webp",
];

export default function HeroSlider({ isEnglish = false }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={SLIDES[current]}
            alt={`SK BOUTIQUE collection ${current + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={current === 0}
            loading={current === 0 ? undefined : "lazy"}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-6 px-4" dir="rtl">
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-luxury-gold/10 text-luxury-gold px-4 py-1.5 rounded-full text-xs font-semibold border border-luxury-gold/15 backdrop-blur-sm"
          >
            <i className="fas fa-sparkles text-[10px]" />
            {isEnglish ? "European Design · Locally Crafted" : "تصميم أوروبي · صناعة محلية"}
          </motion.div>

          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-alexandria leading-tight"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
              }}
            >
              {isEnglish ? "SK Exclusive Collection" : "مجموعة SK الحصرية"}
            </span>
          </motion.h1>

          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-luxury-gold/60 text-sm md:text-base max-w-xl mx-auto font-light"
          >
            {isEnglish
              ? "Modern European designs, locally handcrafted with premium Italian and French materials."
              : "تصاميم أوروبية عصرية، تُصنع محلياً بأفضل الخامات الإيطالية والفرنسية."}
          </motion.p>
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-0 flex items-center justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-luxury-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
