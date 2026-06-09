"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import PRODUCTS from "@/data/products";
import { getProductPrice } from "@/lib/utils";

interface CatalogSectionProps {
  isEnglish: boolean;
  searchQuery: string;
  activeCategory: string;
  sortBy: string;
  onSetActiveCategory: (c: string) => void;
  onSetSortBy: (s: string) => void;
  onAddToCart: (id: string, size: string, color: string, image: string, qty: number) => void;
  onOpenDetails: (prod: any) => void;
}

const TABS = ["all", "sets", "outerwear", "blouses"] as const;

const dict: Record<string, Record<string, string>> = {
  ar: {
    badge: "مجموعتنا الحصرية 🇪🇺",
    title: "تصاميمنا الراقية",
    desc: "تصاميم أوروبية عصرية تُصنع محلياً بأفضل الخامات المستوردة — ارتدِ الأناقة بفخر وثقة.",
    catAll: "الكل", catSets: "أطقم فاخرة", catOuterwear: "جاكيتات وبليزر", catBlouses: "بلوزات وقمصان",
    sortLabel: "ترتيب حسب:", sortFeatured: "الأبرز", sortLow: "السعر: من الأقل", sortHigh: "السعر: من الأعلى",
    noProducts: "لم نعثر على أي قطع تطابق تصفيتك.",
    noProductsDesc: "جرب إدخال كلمات بحث أخرى أو تغيير تصفية الأقسام.",
    currency: "د.أ", viewDetails: "عرض التفاصيل", whatsapp: "اطلب عبر واتساب", quickAdd: "إضافة سريعة",
  },
  en: {
    badge: "Our Exclusive Collection 🇪🇺",
    title: "Our Exquisite Designs",
    desc: "Modern European designs, locally crafted with premium imported materials — wear elegance with pride.",
    catAll: "All", catSets: "Luxury Sets", catOuterwear: "Jackets & Blazers", catBlouses: "Blouses & Shirts",
    sortLabel: "Sort by:", sortFeatured: "Featured", sortLow: "Price: Low", sortHigh: "Price: High",
    noProducts: "No items found matching your filters.",
    noProductsDesc: "Try different keywords or change category filters.",
    currency: "JD", viewDetails: "View Details", whatsapp: "Order via WhatsApp", quickAdd: "Quick Add",
  },
};

const t = (key: string, en: boolean) => dict[en ? "en" : "ar"][key] || key;

const CATEGORIES = [
  { id: "all" as const, key: "catAll" },
  { id: "sets" as const, key: "catSets" },
  { id: "outerwear" as const, key: "catOuterwear" },
  { id: "blouses" as const, key: "catBlouses" },
];

const PHONE = "962798921123";

export default function CatalogSection({
  isEnglish,
  searchQuery,
  activeCategory,
  sortBy,
  onSetActiveCategory,
  onSetSortBy,
  onAddToCart,
  onOpenDetails,
}: CatalogSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const { favorites, toggleFavorite, isFavorite } = useWishlist();

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((prod) => {
      if (activeCategory !== "all" && prod.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          prod.title.toLowerCase().includes(q) ||
          prod.englishTitle.toLowerCase().includes(q) ||
          prod.description.toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="space-y-12">
        {/* ─── Header ─── */}
        <div className="text-center space-y-4">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-gold/15 backdrop-blur-sm"
          >
            {t("badge", isEnglish)}
          </motion.span>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`text-3xl md:text-5xl leading-tight font-bold ${isEnglish ? "font-playfair" : "font-noto"}`}
            style={{ color: "var(--text-primary)" }}
          >
            {t("title", isEnglish)}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="h-0.5 w-16 mx-auto bg-gold rounded-full origin-center"
          />

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-[var(--text-muted)] text-sm max-w-xl mx-auto font-light leading-relaxed"
          >
            {t("desc", isEnglish)}
          </motion.p>
        </div>

        {/* ─── Filters ─── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-4"
        >
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSetActiveCategory(cat.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-medium transition-all duration-300 whitespace-nowrap min-touch-target active:scale-90 backdrop-blur-sm ${
                  activeCategory === cat.id
                    ? "bg-gold text-black shadow-lg shadow-gold/15 font-semibold"
                    : "bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)] hover:border-gold/15"
                }`}
                style={activeCategory === cat.id ? undefined : { backdropFilter: "blur(8px)" }}
              >
                {t(cat.key, isEnglish)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <label className="text-xs text-[var(--text-muted)] font-medium whitespace-nowrap">
              {t("sortLabel", isEnglish)}
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSetSortBy(e.target.value)}
              className="bg-[var(--bg-subtle)] backdrop-blur-sm border border-[var(--border-light)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] outline-none focus:border-gold/30 transition-all duration-300"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <option value="featured">{t("sortFeatured", isEnglish)}</option>
              <option value="price-low">{t("sortLow", isEnglish)}</option>
              <option value="price-high">{t("sortHigh", isEnglish)}</option>
            </select>
          </div>
        </motion.div>

        {/* ─── Grid ─── */}
        {filtered.length === 0 ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-24 bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-3xl backdrop-blur-sm"
          >
            <i className="fas fa-search-minus text-4xl text-[var(--text-dim)] mb-4" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t("noProducts", isEnglish)}</h3>
            <p className="text-xs text-[var(--text-dim)] mt-2">{t("noProductsDesc", isEnglish)}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filtered.map((prod, index) => {
              const liked = isFavorite(prod.id);
              const defaultColor = prod.colors[0];
              const waMsg = encodeURIComponent(
                isEnglish
                  ? `Hi! I'm interested in "${prod.englishTitle}" — ${getProductPrice(prod, "M", defaultColor?.name)} JD`
                  : `مرحباً! أود الاستفسار عن "${prod.title}" — ${getProductPrice(prod, "M", defaultColor?.name)} د.أ`
              );

              return (
                <motion.div
                  key={prod.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
                  className="group relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:border-gold/20 hover:-translate-y-1"
                >
                  {/* ─── Image Container ─── */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-tertiary)]">
                    <button
                      onClick={() => onOpenDetails(prod)}
                      className="absolute inset-0 z-10"
                      aria-label={t("viewDetails", isEnglish)}
                    />

                    <Image
                      src={defaultColor?.image || prod.colors[0].image}
                      alt={isEnglish ? prod.englishTitle : prod.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Hover Glass Overlay */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex hidden flex-col justify-end p-3 md:p-4">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                        <h4 className="text-white text-sm font-bold truncate">
                          {isEnglish ? prod.englishTitle : prod.title}
                        </h4>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          {prod.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(prod.id, s, defaultColor?.name, defaultColor?.image, 1);
                              }}
                              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-gold hover:text-black text-white/80 text-[10px] font-bold border border-white/15 hover:border-gold transition-all duration-200 active:scale-90"
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        <a
                          href={`https://wa.me/${PHONE}?text=${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/20 hover:bg-gold/40 border border-gold/20 text-gold text-[10px] font-semibold transition-all duration-200 active:scale-90 w-fit"
                        >
                          <i className="fab fa-whatsapp text-xs" />
                          {t("whatsapp", isEnglish)}
                        </a>
                      </div>
                    </div>

                    {/* ─── Wishlist Heart ─── */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(prod.id);
                      }}
                      className={`absolute top-2.5 end-2.5 z-30 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 active:scale-90 ${
                        liked
                          ? "bg-gold/20 border border-gold/30"
                          : "bg-black/20 border border-white/10"
                      }`}
                      aria-label={isEnglish ? "Toggle wishlist" : "المفضلة"}
                    >
                      <i
                        className={`${liked ? "fas" : "far"} fa-heart text-xs md:text-sm transition-all duration-300 ${
                          liked ? "text-gold" : "text-white/70 hover:text-white"
                        }`}
                      />
                    </button>

                    {/* Mobile info bar (always visible) */}
                    <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/60 to-transparent md:hidden">
                      <span className="text-white text-xs font-bold leading-tight block truncate">
                        {isEnglish ? prod.englishTitle : prod.title}
                      </span>
                    </div>
                  </div>

                  {/* ─── Product Info ─── */}
                  <div className="p-3 md:p-4 space-y-2">
                    <h3
                      onClick={() => onOpenDetails(prod)}
                      className={`font-bold text-sm md:text-base cursor-pointer transition-colors duration-200 truncate ${
                        isEnglish ? "font-playfair" : "font-noto"
                      }`}
                      style={{ color: "var(--text-primary)" }}
                    >
                      {isEnglish ? prod.englishTitle : prod.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gold text-xs md:text-sm font-inter">
                        {getProductPrice(prod, "M", defaultColor?.name)} {t("currency", isEnglish)}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod.id, prod.sizes[0], defaultColor?.name, defaultColor?.image, 1);
                        }}
                        className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] hover:bg-gold hover:text-black text-[var(--text-muted)] transition-all duration-300 flex items-center justify-center active:scale-90 min-touch-target border border-[var(--border-subtle)] hover:border-gold"
                        title={t("quickAdd", isEnglish)}
                      >
                        <i className="fas fa-plus text-[10px]" />
                      </button>
                    </div>

                    {/* Sizes for mobile */}
                    <div className="flex items-center gap-1.5 md:hidden pt-1">
                      {prod.sizes.map((s) => (
                        <span
                          key={s}
                          className="w-7 h-6 rounded-md bg-[var(--bg-subtle)] text-[var(--text-muted)] text-[9px] font-bold flex items-center justify-center border border-[var(--border-subtle)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
