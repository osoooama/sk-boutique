"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "/feedback/sk_boutique977-highlights-3881002745452919211-20260422_182639_671154159.jpg",
  "/feedback/sk_boutique977-highlights-3881015597580644909-20260422_185211_671253711.jpg",
  "/feedback/sk_boutique977-highlights-3882328644228159711-20260424_142059_672382780.jpg",
  "/feedback/sk_boutique977-highlights-3883084120309947040-20260425_152157_674433341.jpg",
  "/feedback/sk_boutique977-highlights-3883128596659248679-20260425_165020_673169164.jpg",
  "/feedback/sk_boutique977-highlights-3884678328217180618-20260427_200923_684102285.jpg",
  "/feedback/sk_boutique977-highlights-3884684367427706634-20260427_202122_681936164.jpg",
  "/feedback/sk_boutique977-highlights-3889129909717224163-20260503_233352_684901235.jpg",
  "/feedback/sk_boutique977-highlights-3889149386630540197-20260504_001235_683474609.jpg",
  "/feedback/sk_boutique977-highlights-3889149761299306500-20260504_001319_683901927.jpg",
  "/feedback/sk_boutique977-highlights-3889149819616910087-20260504_001326_682724087.jpg",
  "/feedback/sk_boutique977-highlights-3889149860779716103-20260504_001331_685648146.jpg",
  "/feedback/sk_boutique977-highlights-3892665550233014738-20260508_203832_689870940.jpg",
  "/feedback/sk_boutique977-highlights-3892679404455337107-20260508_210605_687017423.jpg",
  "/feedback/sk_boutique977-highlights-3908652243967045901-20260530_220117_710264612.jpg",
  "/feedback/sk_boutique977-highlights-3908652605038028666-20260530_220200_711802552.jpg",
  "/feedback/sk_boutique977-highlights-3913634552822701357-20260606_190015_717076566.jpg",
  "/feedback/sk_boutique977-highlights-3913634633546253590-20260606_190025_718068683.jpg",
  "/feedback/sk_boutique977-highlights-3913634720108437672-20260606_190035_718264726.jpg",
  "/feedback/sk_boutique977-highlights-3913634831500749993-20260606_190048_718076194.jpg",
];

interface FeedbackGalleryProps {
  isEnglish: boolean;
}

export default function FeedbackGallery({ isEnglish }: FeedbackGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightboxIndex((prev) => prev !== null ? Math.min(prev + 1, IMAGES.length - 1) : null);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => prev !== null ? Math.max(prev - 1, 0) : null);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox]);

  return (
    <>
      <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {IMAGES.map((src, i) => (
          <motion.button
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-luxury-black border border-white/5 focus:outline-none"
          >
            <img
              src={src}
              alt={isEnglish ? "SK BOUTIQUE customer experience" : "تجربة عميل SK BOUTIQUE"}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-104 group-hover:border-2 group-hover:border-[#C9A84C] group-hover:shadow-[0_8px_25px_rgba(201,168,76,0.3)]"
            />
          </motion.button>
        ))}
      </div>

      <div ref={scrollRef} className="md:hidden overflow-x-auto scrollbar-none -mx-4 px-4">
        <div className="flex gap-3 w-max pb-2">
          {IMAGES.map((src, i) => (
            <button
              key={src}
              onClick={() => setLightboxIndex(i)}
              className="flex-shrink-0 w-64 aspect-square rounded-2xl overflow-hidden bg-luxury-black border border-white/5 focus:outline-none group"
            >
              <img
                src={src}
                alt={isEnglish ? "SK BOUTIQUE customer experience" : "تجربة عميل SK BOUTIQUE"}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-104"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-luxury-white hover:text-luxury-gold transition-colors"
              aria-label="Close"
            >
              <i className="fas fa-times text-sm" />
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-luxury-white hover:text-luxury-gold transition-colors z-10"
                aria-label="Previous"
              >
                <i className="fas fa-chevron-left text-sm" />
              </button>
            )}

            {lightboxIndex < IMAGES.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-luxury-white hover:text-luxury-gold transition-colors z-10"
                aria-label="Next"
              >
                <i className="fas fa-chevron-right text-sm" />
              </button>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-2xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={IMAGES[lightboxIndex]}
                alt={isEnglish ? "SK BOUTIQUE customer experience" : "تجربة عميل SK BOUTIQUE"}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-luxury-white/40">
              {lightboxIndex + 1} / {IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
