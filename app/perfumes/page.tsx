"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeLeftVariant, staggerContainer, perfumeCardVariant } from "@/lib/animations";
import TiltCard from "@/components/product/TiltCard";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import CartDrawer from "@/components/ui/CartDrawer";

import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useTheme } from "@/context/ThemeContext";
import { usePerfumes } from "@/lib/data";
import { getPerfumePrice } from "@/lib/perfumes";
import { springs } from "@/lib/springs";
import type { Perfume } from "@/lib/types";
import { useDeviceParallax } from "@/hooks/useDeviceParallax";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/GlassToast/ToastProvider";
import CurrencyPopup from "@/components/CurrencyPopup";
import PerfumeCardSkeleton from "@/components/Skeleton/PerfumeCardSkeleton";

const CATEGORIES = [
  { id: "all", ar: "\u0627\u0644\u0643\u0644", en: "All" },
  { id: "musk", ar: "\u0645\u0633\u0643", en: "Musk" },
  { id: "perfume", ar: "\u0639\u0637\u0648\u0631", en: "Perfumes" },
  { id: "sample", ar: "\u0639\u064a\u0646\u0627\u062a", en: "Samples" },
];

function PerfumeCardWithParallax({ perfume, isEnglish, index = 0 }: { perfume: Perfume; isEnglish: boolean; index?: number }) {
  const { ref, offset } = useDeviceParallax();
  const { addItem } = useCart();
  const { show } = useToast();

  const handleAdd = () => {
    if (!perfume.inStock) {
      show("error", isEnglish ? "Product unavailable" : "هذا المنتج غير متوفر", "fa-times");
      return;
    }
    addItem({
      productId: perfume.id,
      title: perfume.title,
      englishTitle: perfume.englishTitle,
      price: getPerfumePrice(perfume),
      size: perfume.volume,
      color: "Original",
      colorHex: "#C9A84C",
      image: perfume.image,
      inStock: perfume.inStock,
    });
    show("success", isEnglish ? "Added to cart!" : "أضيف للسلة!", "fa-check");
  };

  return (
    <motion.div
      ref={ref}
      variants={perfumeCardVariant}
      custom={index}
      style={{ willChange: "transform" }}
    >
      <TiltCard className={`group glass-card overflow-hidden transition-all duration-500 ${!perfume.inStock ? "opacity-60" : "hover:border-accent-gold-muted"}`}>
        <div className="relative aspect-square overflow-hidden bg-surface-primary">
          {!perfume.inStock && (
            <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-500/80 text-white border border-red-400/50 backdrop-blur-sm">
                {isEnglish ? "Unavailable" : "غير متوفر"}
              </span>
            </div>
          )}
          {perfume.featured && perfume.inStock && (
            <span className="absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-1 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/30 backdrop-blur-sm flex items-center gap-1">
              <i className="fas fa-star text-[8px]" />
              {isEnglish ? "Featured" : "مميز"}
            </span>
          )}
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate3d(${(offset.x * 12).toFixed(1)}px, ${(offset.y * 12).toFixed(1)}px, 0)`,
            }}
          >
            <Image src={perfume.image} alt={isEnglish ? perfume.englishTitle : perfume.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-accent-gold-muted text-accent-gold border border-accent-gold-muted backdrop-blur-sm">{perfume.volume}</span>
          </div>
        </div>
        <div className="p-4 space-y-2" style={{ transform: `translate3d(${(offset.x * -5).toFixed(1)}px, ${(offset.y * -5).toFixed(1)}px, 0)`, willChange: "transform" }}>
          <div className="relative">
            <h3 className={`font-bold text-sm line-clamp-1 ${isEnglish ? "font-bodoni" : "font-alexandria"}`}>{isEnglish ? perfume.englishTitle : perfume.title}</h3>
            <div className="title-tooltip">
              <p className={`text-xs font-bold ${isEnglish ? "font-bodoni" : "font-alexandria"}`}>{isEnglish ? perfume.englishTitle : perfume.title}</p>
            </div>
          </div>
          <p className="text-xs text-accent-gold/40 line-clamp-2 leading-relaxed">{isEnglish ? perfume.englishDescription : perfume.description}</p>
          <div className="flex items-center justify-between pt-1">
            <CurrencyPopup price={getPerfumePrice(perfume)}>
              <span className="text-xs font-bold text-accent-gold">{getPerfumePrice(perfume)} {isEnglish ? "JD" : "د.أ"}</span>
            </CurrencyPopup>
            <motion.button onClick={handleAdd} disabled={!perfume.inStock} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${perfume.inStock ? "bg-accent-gold-muted text-accent-gold border border-accent-gold-muted hover:bg-accent-gold/25" : "bg-red-500/10 text-red-400 border border-red-500/30 cursor-not-allowed"}`} whileHover={perfume.inStock ? { scale: 1.06, transition: springs.gentle } : {}} whileTap={perfume.inStock ? { scale: 0.93, transition: springs.snappy } : {}}>
              <i className={`fas ${perfume.inStock ? "fa-shopping-bag" : "fa-times-circle"} mr-1`} />{perfume.inStock ? (isEnglish ? "Add" : "أضف") : (isEnglish ? "Unavailable" : "غير متوفر")}
            </motion.button>
          </div>
          {perfume.notes && (
            <div className="pt-2 border-t border-border space-y-1">
              {perfume.notes.top && <p className="text-[10px] text-accent-gold/40">{isEnglish ? "Top:" : "???????:"} <span className="text-accent-gold/60">{perfume.notes.top.join("? ")}</span></p>}
              {perfume.notes.middle && <p className="text-[10px] text-accent-gold/40">{isEnglish ? "Heart:" : "?????:"} <span className="text-accent-gold/60">{perfume.notes.middle.join("? ")}</span></p>}
              {perfume.notes.base && <p className="text-[10px] text-accent-gold/40">{isEnglish ? "Base:" : "???????:"} <span className="text-accent-gold/60">{perfume.notes.base.join("? ")}</span></p>}
            </div>
          )}
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function PerfumesPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { perfumes, loading } = usePerfumes();

  const filtered =
    activeCategory === "all"
      ? perfumes
      : perfumes.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen" dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((prev) => !prev)}
        onToggleTheme={toggleTheme}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <CartDrawer isEnglish={isEnglish} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} isEnglish={isEnglish} />
      
      <BackToTop />

      <main>
        <section className="pt-28 pb-16">

          <motion.div
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative text-center space-y-4 section-padding max-w-7xl mx-auto"
          >
            <Breadcrumbs
              items={[
                { label: isEnglish ? "Home" : "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", href: "/" },
                { label: isEnglish ? "Perfumes" : "\u0627\u0644\u0639\u0637\u0648\u0631" },
              ]}
              isEnglish={isEnglish}
            />
            <span className="inline-flex items-center gap-2 bg-accent-gold-muted text-accent-gold px-4 py-1.5 rounded-full text-xs font-bold border border-accent-gold-muted backdrop-blur-sm">
              <i className="fas fa-spray-can-sparkles text-[10px]" />
              {isEnglish ? "Premium Fragrances" : "\u0639\u0637\u0648\u0631 \u0641\u0627\u062e\u0631\u0629"}
            </span>
            <h1 className={`text-4xl md:text-5xl font-bold ${isEnglish ? "font-bodoni" : "font-alexandria"}`}>
              <span className="gold-gradient bg-clip-text text-transparent">
                {isEnglish ? "SK Exclusive Perfumes" : "\u0639\u0637\u0648\u0631 SK \u0627\u0644\u062d\u0635\u0631\u064a\u0629"}
              </span>
            </h1>
            <p className="text-accent-gold/60 text-sm max-w-xl mx-auto">
              {isEnglish ? "Exclusive musk oils and fine fragrances \u2014 scents that last" : "\u0639\u0637\u0648\u0631 \u0648\u0645\u0633\u0643 \u0641\u0627\u062e\u0631 \u2014 \u0631\u0648\u0627\u0626\u062d \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629 \u062a\u062f\u0648\u0645 \u0637\u0648\u064a\u0644\u0627\u064b"}
            </p>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-7xl px-4 md:px-8 mb-10"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-gold/20 via-accent-gold/10 to-accent-gold/20 border border-accent-gold/30 p-5 md:p-6 text-center animate-pulse-glow">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative flex items-center justify-center gap-3 flex-wrap">
              <i className="fas fa-tag text-accent-gold text-lg" />
              <p className={`font-bold text-sm md:text-base text-accent-gold ${isEnglish ? "font-hanken" : "font-alexandria"}`}>
                {isEnglish ? "Use code SKP30 for 30% off your first perfume order!" : "\u0627\u0633\u062a\u062e\u062f\u0645 \u0643\u0648\u062f SKP30 \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062e\u0635\u0645 30% \u0639\u0644\u0649 \u0623\u0648\u0644 \u0637\u0644\u0628 \u0639\u0637\u0648\u0631!"}
              </p>
              <span className="text-xs font-mono font-bold bg-accent-gold text-surface-primary px-3 py-1 rounded-lg tracking-widest">
                SKP30
              </span>
            </div>
          </div>
        </motion.div>

        <section className="pb-20 section-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap min-touch-target ${activeCategory === cat.id ? "bg-accent-gold text-surface-primary shadow-lg shadow-accent-gold/25" : "glass-card text-accent-gold hover:bg-accent-gold-muted hover:border-accent-gold/30"}`}
                style={{ border: activeCategory !== cat.id ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent" }}
                whileHover={{ scale: 1.04, transition: springs.gentle }}
                whileTap={{ scale: 0.95, transition: springs.snappy }}
              >
                {isEnglish ? cat.en : cat.ar}
              </motion.button>
            ))}
          </div>

          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <PerfumeCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24 glass-card">
                <i className="fas fa-spray-can-sparkles text-3xl text-accent-gold/40 mb-4 block" />
                <p className="text-accent-gold/60 text-sm">{isEnglish ? "No perfumes found" : "\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0637\u0648\u0631"}</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              >
                {filtered.map((perfume, i) => (
                  <PerfumeCardWithParallax key={perfume.id} perfume={perfume} isEnglish={isEnglish} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          )}
        </section>
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
