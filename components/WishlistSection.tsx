"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import PRODUCTS from "@/data/products";
import { getCategoryLabel } from "@/lib/utils";

interface WishlistSectionProps {
  isEnglish: boolean;
  onOpenDetails: (prod: any) => void;
  onAddToCart: (id: string, size: string, color: string, image: string, qty: number) => void;
}

const DICT: Record<string, Record<string, string>> = {
  ar: {
    title: "المفضلة لديكِ",
    empty: "قائمة المفضلة فارغة",
    emptyDesc: "أضيفي بعض القطع الراقية التي نالت إعجابكِ لمشاهدتها لاحقاً.",
    startShopping: "استعراض التشكيلة",
    remove: "إزالة",
    addToCart: "أضف للسلة",
    addAll: "إضافة الكل إلى السلة",
    currency: "د.أ",
  },
  en: {
    title: "Your Favorites",
    empty: "Your wishlist is empty",
    emptyDesc: "Add some premium luxury items you loved to view them later.",
    startShopping: "Explore Collection",
    remove: "Remove",
    addToCart: "Add to Bag",
    addAll: "Add All to Cart",
    currency: "JD",
  },
};

const PHONE = "962798921123";

export default function WishlistSection({ isEnglish, onOpenDetails, onAddToCart }: WishlistSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ids: favorites, toggle } = useWishlist();

  const t = (key: string) => DICT[isEnglish ? "en" : "ar"][key] || key;

  const items = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <section id="wishlist" className="py-16 md:py-20 border-b border-[var(--border-subtle)]" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <h2 className={`text-2xl md:text-3xl font-bold ${isEnglish ? "font-playfair" : "font-noto"}`} style={{ color: "var(--text-primary)" }}>
            {t("title")}
            {items.length > 0 && (
              <span className="text-gold font-mono text-lg ms-2">({items.length})</span>
            )}
          </h2>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center py-20 space-y-4"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl border"
              style={{ background: "var(--bg-subtle)", borderColor: "var(--border-light)", color: "var(--text-dim)" }}
            >
              <i className="far fa-heart" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{t("empty")}</h4>
              <p className="text-xs max-w-xs" style={{ color: "var(--text-dim)" }}>{t("emptyDesc")}</p>
            </div>
            <a
              href="#catalog"
              className="px-8 py-3.5 bg-gold text-black rounded-xl text-xs font-semibold hover:bg-gold/90 transition active:scale-95 min-touch-target"
            >
              {t("startShopping")}
            </a>
          </motion.div>
        ) : (
          <>
            {/* Add All Button */}
            <div className="flex justify-center">
              <motion.button
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => {
                  items.forEach((item) => {
                    onAddToCart(item.id, item.sizes[0], item.colors[0].name, item.colors[0].image, 1);
                  });
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-gold to-gold/90 text-black font-bold rounded-xl text-xs transition-all duration-300 active:scale-95 shadow-lg min-touch-target"
                style={{ boxShadow: "0 4px 20px rgba(201, 168, 76, 0.25)" }}
              >
                <i className="fas fa-cart-plus text-xs me-2" />
                {t("addAll")} ({items.length})
              </motion.button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((prod, i) => (
                <motion.div
                  key={prod.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden border transition-all duration-300"
                  style={{
                    background: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" style={{ background: "var(--bg-tertiary)" }}
                    onClick={() => onOpenDetails(prod)}
                  >
                    <Image
                      src={prod.colors[0].image}
                      alt={isEnglish ? prod.englishTitle : prod.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Remove */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggle(prod.id); }}
                      className="absolute top-2 end-2 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition active:scale-90"
                      style={{
                        background: "rgba(201, 168, 76, 0.2)",
                        borderColor: "rgba(201, 168, 76, 0.3)",
                        color: "var(--gold)",
                      }}
                      aria-label={t("remove")}
                    >
                      <i className="fas fa-heart text-xs" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-2">
                    <h3 className={`text-xs md:text-sm font-bold truncate ${isEnglish ? "font-playfair" : "font-noto"}`}
                      style={{ color: "var(--text-primary)" }}
                    >
                      {isEnglish ? prod.englishTitle : prod.title}
                    </h3>
                    <p className="text-[10px]" style={{ color: "var(--text-dim)" }}>
                      {getCategoryLabel(prod.category, isEnglish)}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-gold text-xs md:text-sm font-inter">
                        {prod.price} {t("currency")}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod.id, prod.sizes[0], prod.colors[0].name, prod.colors[0].image, 1);
                        }}
                        className="px-3 py-1.5 bg-gold text-black rounded-lg text-[10px] font-bold hover:bg-gold/90 transition active:scale-90 min-touch-target"
                      >
                        {t("addToCart")}
                      </button>
                    </div>

                    {/* WhatsApp Quick */}
                    <a
                      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(
                        isEnglish
                          ? `Hi! I'm interested in "${prod.englishTitle}"`
                          : `مرحباً! أود الاستفسار عن "${prod.title}"`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg border text-[10px] font-semibold transition active:scale-90"
                      style={{
                        borderColor: "rgba(201, 168, 76, 0.2)",
                        color: "var(--gold)",
                      }}
                    >
                      <i className="fab fa-whatsapp text-xs" />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
