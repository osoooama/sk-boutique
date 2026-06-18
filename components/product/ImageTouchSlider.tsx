"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import { springs } from "@/lib/springs";

interface ImageTouchSliderProps {
  images: string[];
  alt: string;
  productId?: string;
}

export default function ImageTouchSlider({ images, alt, productId }: ImageTouchSliderProps) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - startX.current;
      const el = e.currentTarget as HTMLElement;
      const width = el.offsetWidth;
      const ratio = dx / width;
      setDragX(ratio);
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = false;
      const el = e.currentTarget as HTMLElement;
      const width = el.offsetWidth;
      const start = startX.current;
      const end = e.changedTouches[0].clientX;
      const dist = end - start;
      if (Math.abs(dist) > width * 0.2 || Math.abs(dist) > 40) {
        if (dist < 0 && current < images.length - 1) {
          setCurrent((p) => Math.min(p + 1, images.length - 1));
        } else if (dist > 0 && current > 0) {
          setCurrent((p) => Math.max(p - 1, 0));
        }
      }
      setDragX(0);
    },
    [current, images.length]
  );

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-card bg-surface-primary product-transition-image"
        style={{ "--vt-name": `vt-product-image-${productId}` } as React.CSSProperties}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ x: dragX ? `calc(${-current * 100}% + ${dragX * 100}%)` : `${-current * 100}%` }}
          transition={dragX ? { duration: 0 } : springs.gentle}
          style={{ display: "flex", width: `${images.length * 100}%` }}
        >
          {images.map((src, i) => (
            <div key={i} className="relative" style={{ width: `${100 / images.length}%` }}>
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5" dir="ltr">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 6 : 4,
                height: i === current ? 6 : 4,
                background: i === current ? "var(--accent-gold)" : "var(--border-color-strong)",
              }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
