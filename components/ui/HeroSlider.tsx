"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import { useDeviceParallax } from "@/hooks/useDeviceParallax";
import MagneticWrapper from "./MagneticWrapper";

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
  const { ref: parallaxRef, offset: parallax } = useDeviceParallax();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section ref={parallaxRef} className="relative h-[100dvh] w-full overflow-hidden bg-surface-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${(parallax.x * 20).toFixed(1)}px, ${(parallax.y * 20).toFixed(1)}px, 0)`,
          }}
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
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: `translate3d(${(parallax.x * -8).toFixed(1)}px, ${(parallax.y * -8).toFixed(1)}px, 0)`, willChange: "transform" }}>
        <div className="text-center space-y-6 px-4" dir="rtl">
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-accent-gold-muted text-accent-gold px-4 py-1.5 rounded-full text-xs font-semibold border border-accent-gold-muted backdrop-blur-sm"
          >
            <i className="fas fa-sparkles text-[10px]" />
            {isEnglish ? "European Design · Locally Crafted" : "تصميم أوروبي · صناعة محلية"}
          </motion.div>

          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${isEnglish ? "font-bodoni" : "font-alexandria"}`}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-hover) 50%, var(--accent-gold) 100%)",
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
            className="text-accent-gold/60 text-sm md:text-base max-w-xl mx-auto font-light"
          >
              {isEnglish
                ? "Modern European designs, locally handcrafted with premium Italian and French materials."
                : "تصاميم أوروبية عصرية، تُصنع محلياً بأفضل الخامات الإيطالية والفرنسية."}
            </motion.p>

            <MagneticWrapper>
              <motion.a
                href="/shop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="pointer-events-auto inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-accent-gold text-surface-primary font-bold text-sm shadow-lg shadow-accent-gold/30 hover:shadow-xl hover:shadow-accent-gold/40 transition-shadow cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                {isEnglish ? "Shop Now" : "تسوق الآن"}
                <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs`} />
              </motion.a>
            </MagneticWrapper>
          </div>
        </div>

      <div className="absolute bottom-8 inset-x-0 flex items-center justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-accent-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
