"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import ToastContainer from "@/components/ui/ToastContainer";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

const CATEGORIES = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "sets", ar: "أطقم", en: "Sets" },
  { id: "outerwear", ar: "جاكيتات وبليزر", en: "Outerwear" },
  { id: "blouses", ar: "بلوزات وقمصان", en: "Blouses" },
];

export default function ShopPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white" dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((prev) => !prev)}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <CartDrawer isEnglish={isEnglish} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} isEnglish={isEnglish} />
      <ToastContainer />
      <BackToTop />

      <main>
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/10 via-transparent to-luxury-black pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-luxury-gold/[0.06] to-transparent rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-purple-500/[0.04] to-transparent rounded-full blur-[80px] pointer-events-none" />

          <div className="relative text-center space-y-4 section-padding max-w-7xl mx-auto">
            <Breadcrumbs
              items={[
                { label: isEnglish ? "Home" : "الرئيسية", href: "/" },
                { label: isEnglish ? "Shop" : "المتجر" },
              ]}
              isEnglish={isEnglish}
            />
            <span className="inline-block bg-luxury-gold/10 text-luxury-gold px-4 py-1.5 rounded-full text-xs font-bold border border-luxury-gold/15 backdrop-blur-sm">
              {isEnglish ? "Our Collection" : "تشكيلتنا"}
            </span>
            <h1 className={`text-4xl md:text-5xl font-bold gold-gradient bg-clip-text text-transparent ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish ? "Women's Fashion" : "أزياء نسائية عصرية"}
            </h1>
            <p className="text-luxury-gold/60 text-sm max-w-xl mx-auto">
              {isEnglish ? "Modern European designs, locally crafted with premium materials" : "تصاميم أوروبية عصرية، تُصنع محلياً بأفضل الخامات"}
            </p>
          </div>
        </section>

        <section className="pb-20 section-padding max-w-7xl mx-auto -mt-6">
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap min-touch-target ${
                  activeCategory === cat.id
                    ? "bg-luxury-gold text-luxury-black shadow-lg shadow-luxury-gold/25"
                    : "glass-card text-luxury-gold hover:bg-white/10 hover:border-luxury-gold/30"
                }`}
                style={{ border: activeCategory !== cat.id ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent" }}
              >
                {isEnglish ? cat.en : cat.ar}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 glass-card"
              >
                <i className="fas fa-search-minus text-3xl text-luxury-gold/40 mb-4 block" />
                <p className="text-luxury-gold/60 text-sm">{isEnglish ? "No products found" : "لا توجد منتجات"}</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
        </section>
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
