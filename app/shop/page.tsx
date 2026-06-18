"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import Toast from "@/components/Toast/Toast";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import { useTheme } from "@/context/ThemeContext";
import { useProducts } from "@/lib/data";
import { springs } from "@/lib/springs";

const CATEGORIES = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "sets", ar: "أطقم", en: "Sets" },
  { id: "outerwear", ar: "جاكيتات وبليزر", en: "Outerwear" },
  { id: "blouses", ar: "بلوزات وقمصان", en: "Blouses" },
];

export default function ShopPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { products, loading } = useProducts();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
      <Toast />
      <BackToTop />

      <main>
        <section className="pt-28 pb-16">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative text-center space-y-4 section-padding max-w-7xl mx-auto"
          >
            <Breadcrumbs
              items={[
                { label: isEnglish ? "Home" : "الرئيسية", href: "/" },
                { label: isEnglish ? "Shop" : "المتجر" },
              ]}
              isEnglish={isEnglish}
            />
            <span className="inline-block bg-accent-gold-muted text-accent-gold px-4 py-1.5 rounded-full text-xs font-bold border border-accent-gold-muted backdrop-blur-sm">
              {isEnglish ? "Our Collection" : "تشكيلتنا"}
            </span>
            <h1 className={`text-4xl md:text-5xl font-bold gold-gradient bg-clip-text text-transparent ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish ? "Women's Fashion" : "أزياء نسائية عصرية"}
            </h1>
            <p className="text-accent-gold/60 text-sm max-w-xl mx-auto">
              {isEnglish ? "Modern European designs, locally crafted with premium materials" : "تصاميم أوروبية عصرية، تُصنع محلياً بأفضل الخامات"}
            </p>
          </motion.div>
        </section>

        <section className="pb-20 section-padding max-w-7xl mx-auto -mt-6">
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap min-touch-target ${
                  activeCategory === cat.id
                    ? "bg-accent-gold text-surface-primary shadow-lg shadow-accent-gold/25"
                    : "glass-card text-accent-gold hover:bg-accent-gold-muted hover:border-accent-gold/30"
                }`}
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} isEnglish={isEnglish} />
              ))}
            </motion.div>
          ) : (
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 glass-card"
              >
                <i className="fas fa-search-minus text-3xl text-accent-gold/40 mb-4 block" />
                <p className="text-accent-gold/60 text-sm">{isEnglish ? "No products found" : "لا توجد منتجات"}</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} isEnglish={isEnglish} index={i} />
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
