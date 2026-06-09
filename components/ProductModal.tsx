"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { getProductPrice, getSizeSurchargeText, getColorSurchargeText, getCategoryLabel } from "@/lib/utils";

interface ProductModalProps {
  product: any;
  isEnglish: boolean;
  onClose: () => void;
  onAddToCart: (id: string, size: string, color: string, image: string, qty: number) => void;
}

export default function ProductModal({ product, isEnglish, onClose, onAddToCart }: ProductModalProps) {
  const { toggleFavorite, isFavorite } = useWishlist();
  const [size, setSize] = useState("");
  const [activeColor, setActiveColor] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"details" | "shipping">("details");

  useEffect(() => {
    if (product) {
      setSize(product.sizes[0] || "");
      setActiveColor(product.colors[0] || null);
      setQty(1);
      setTab("details");
    }
  }, [product]);

  if (!product) return null;

  const shouldReduceMotion = useReducedMotion();
  const liked = isFavorite(product.id);
  const currentPrice = getProductPrice(product, size, activeColor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose} />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.97 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="fixed top-4 end-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 active:scale-90 border"
          style={{
            background: "var(--bg-glass)",
            borderColor: "var(--border-light)",
            color: "var(--text-primary)",
          }}
          aria-label={isEnglish ? "Close" : "إغلاق"}
        >
          <i className="fas fa-times text-sm" />
        </button>

        {/* ─── Image Side ─── */}
        <div className="md:w-[55%] relative bg-[var(--bg-tertiary)] flex flex-col">
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full">
            <Image
              src={activeColor?.image || product.colors[0].image}
              alt={isEnglish ? product.englishTitle : product.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Thumbnails */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-none border-t" style={{ borderColor: "var(--border-subtle)" }}>
              {product.colors.map((c: any) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(c)}
                  className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                    activeColor?.name === c.name ? "border-gold shadow-md shadow-gold/10" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={c.image} alt={isEnglish ? c.englishName : c.name} fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── Details Side ─── */}
        <div className="md:w-[45%] p-6 md:p-8 flex flex-col gap-5 overflow-y-auto">
          {/* Category + Wishlist */}
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-semibold px-3 py-1 rounded-full border"
              style={{
                background: "rgba(201, 168, 76, 0.1)",
                color: "var(--gold)",
                borderColor: "rgba(201, 168, 76, 0.2)",
              }}
            >
              {getCategoryLabel(product.category, isEnglish)}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
              className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 active:scale-90 border"
              style={{
                background: liked ? "rgba(201, 168, 76, 0.15)" : "var(--bg-subtle)",
                borderColor: liked ? "rgba(201, 168, 76, 0.3)" : "var(--border-subtle)",
              }}
              aria-label={isEnglish ? "Toggle wishlist" : "المفضلة"}
            >
              <i className={`${liked ? "fas" : "far"} fa-heart text-sm ${liked ? "text-gold" : "text-[var(--text-muted)]"}`} />
            </button>
          </div>

          {/* Title */}
          <h2
            className={`text-xl md:text-2xl font-bold leading-tight ${isEnglish ? "font-playfair" : "font-noto"}`}
            style={{ color: "var(--text-primary)" }}
          >
            {isEnglish ? product.englishTitle : product.title}
          </h2>

          {/* Price */}
          <div className="text-2xl md:text-3xl font-extrabold text-gold font-inter">
            {currentPrice} {isEnglish ? "JD" : "د.أ"}
            {(activeColor?.surcharge > 0 || size !== product.sizes[0]) && (
              <span className="text-sm font-medium text-[var(--text-muted)] me-2">
                {getSizeSurchargeText(size, isEnglish)}
                {activeColor?.surcharge > 0 && ` ${getColorSurchargeText(activeColor, isEnglish)}`}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {isEnglish ? product.englishDescription : product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                {isEnglish ? "Size" : "المقاس"}
              </span>
              <button
                className="text-[10px] text-gold hover:underline flex items-center gap-1"
                aria-label={isEnglish ? "Size guide" : "دليل المقاسات"}
              >
                <i className="fas fa-ruler text-[9px]" />
                {isEnglish ? "Size Guide" : "دليل المقاسات"}
              </button>
            </div>
            <div className="flex gap-2.5">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-11 h-11 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center border min-touch-target active:scale-90 ${
                    size === s
                      ? "bg-gold border-gold text-black shadow-md shadow-gold/10"
                      : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-gold/30"
                  }`}
                  style={size !== s ? { background: "var(--bg-subtle)" } : undefined}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {isEnglish ? "Color" : "اللون"}
            </span>
            <div className="flex gap-3 items-center">
              {product.colors.map((c: any) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(c)}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-200 active:scale-90 ${
                    activeColor?.name === c.name
                      ? "border-gold scale-110 shadow-md shadow-gold/10"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={isEnglish ? c.englishName : c.name}
                />
              ))}
            </div>
            <span className="text-[10px] font-medium block" style={{ color: "var(--text-dim)" }}>
              {isEnglish ? "Selected:" : "المحدد:"}{" "}
              {activeColor ? (isEnglish ? activeColor.englishName : activeColor.name) : ""}
            </span>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 pt-1">
            <div
              className="flex items-center gap-2 rounded-xl px-2 py-1 border"
              style={{ background: "var(--bg-subtle)", borderColor: "var(--border-subtle)" }}
            >
              <button
                onClick={() => setQty((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs transition active:scale-90 min-touch-target"
                style={{ color: "var(--text-muted)" }}
              >
                <i className="fas fa-minus" />
              </button>
              <span className="text-sm font-bold w-6 text-center font-mono" style={{ color: "var(--text-primary)" }}>
                {qty}
              </span>
              <button
                onClick={() => setQty((p) => p + 1)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs transition active:scale-90 min-touch-target"
                style={{ color: "var(--text-muted)" }}
              >
                <i className="fas fa-plus" />
              </button>
            </div>

            <button
              onClick={() => {
                onAddToCart(product.id, size, activeColor?.name || product.colors[0].name, activeColor?.image || product.colors[0].image, qty);
                onClose();
              }}
              className="flex-1 py-3.5 bg-gradient-to-r from-gold to-gold/90 text-black font-bold rounded-xl text-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 min-touch-target shadow-lg"
              style={{ boxShadow: "0 4px 20px rgba(201, 168, 76, 0.25)" }}
            >
              {isEnglish ? "Add to Cart" : "أضف إلى السلة"}
              <i className="fas fa-shopping-bag text-[10px]" />
            </button>
          </div>

          {/* Details / Shipping Tabs */}
          <div className="space-y-3 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="flex gap-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
              {(["details", "shipping"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors duration-200 ${
                    tab === t
                      ? "border-gold text-gold"
                      : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-muted)]"
                  }`}
                >
                  {t === "details"
                    ? isEnglish ? "Features & Materials" : "الميزات والخامات"
                    : isEnglish ? "Shipping & Returns" : "التوصيل والاستبدال"}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "var(--text-muted)" }}>
              {tab === "details"
                ? isEnglish ? product.englishDetails : product.details
                : isEnglish ? product.englishShipping : product.shipping}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
