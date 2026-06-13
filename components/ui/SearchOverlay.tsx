"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isEnglish: boolean;
}

export default function SearchOverlay({ isOpen, onClose, isEnglish }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.title.includes(query) ||
          p.englishTitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 inset-x-0 z-50 bg-surface-primary backdrop-blur-xl border-b border-border"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            dir={isEnglish ? "ltr" : "rtl"}
          >
            <div className="max-w-2xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3 bg-accent-gold-muted border border-border rounded-2xl px-4 h-12 focus-within:border-accent-gold/30 transition-all">
                <i className="fas fa-search text-accent-gold/40 text-xs" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isEnglish ? "Search products..." : "ابحث عن منتج..."}
                  className="bg-transparent border-none outline-none text-sm text-content-primary flex-1 placeholder:text-accent-gold/30"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-accent-gold/40 hover:text-accent-gold">
                    <i className="fas fa-times text-xs" />
                  </button>
                )}
                <button onClick={onClose} className="text-accent-gold/40 hover:text-accent-gold text-xs">
                  {isEnglish ? "ESC" : "إلغاء"}
                </button>
              </div>

              {query.trim() && (
                <div className="mt-4 max-h-80 overflow-y-auto scrollbar-none space-y-1">
                  {results.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-xs text-accent-gold/40">
                        {isEnglish ? "No products found" : "لا توجد نتائج"}
                      </p>
                    </div>
                  ) : (
                    results.map((product) => (
                      <SearchResultItem
                        key={product.id}
                        product={product}
                        isEnglish={isEnglish}
                        onClose={onClose}
                      />
                    ))
                  )}
                </div>
              )}

              {!query.trim() && (
                <div className="mt-4 text-center py-8">
                  <p className="text-xs text-accent-gold/40">
                    {isEnglish ? "Type to search products..." : "اكتب للبحث عن منتجات..."}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchResultItem({ product, isEnglish, onClose }: { product: Product; isEnglish: boolean; onClose: () => void }) {
  const imgSrc = product.colors[0]?.images[0];
  return (
    <Link
      href={`/product/${product.id}`}
      onClick={onClose}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent-gold-muted transition-all group"
      style={{ textDecoration: "none" }}
    >
      <div className="w-10 h-12 rounded-lg overflow-hidden bg-surface-primary flex-shrink-0 relative">
        {imgSrc ? (
          <Image src={imgSrc} alt={isEnglish ? product.englishTitle : product.title} fill sizes="48px" className="object-cover" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><i className="fas fa-tshirt text-accent-gold/20 text-xs" /></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="relative">
          <p className={`text-xs font-medium line-clamp-2 group-hover:text-accent-gold transition-colors ${isEnglish ? "font-inter" : "font-alexandria"}`}>
            {isEnglish ? product.englishTitle : product.title}
          </p>
          <div className="title-tooltip">
            <p className={`text-xs font-medium ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish ? product.englishTitle : product.title}
            </p>
          </div>
        </div>
        <p className="text-[10px] text-accent-gold/40">{product.basePrice} {isEnglish ? "JD" : "د.أ"}</p>
      </div>
    </Link>
  );
}
