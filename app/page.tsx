"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import HeroSlider from "@/components/ui/HeroSlider";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import ToastContainer from "@/components/ui/ToastContainer";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import { products } from "@/lib/products";
import { perfumes } from "@/lib/perfumes";

const FEATURES = [
  { icon: "fa-truck-fast", ar: "شحن سريع لكل الأردن", en: "Fast Shipping Across Jordan" },
  { icon: "fa-rotate-left", ar: "إرجاع مجاني خلال 7 أيام", en: "7-Day Free Returns" },
  { icon: "fa-certificate", ar: "خامات إيطالية وفرنسية", en: "Italian & French Materials" },
  { icon: "fa-hand-holding-dollar", ar: "الدفع عند الاستلام", en: "Cash on Delivery" },
];

const FEATURED_PERFUMES = perfumes.slice(0, 3);

export default function HomePage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white">
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
        <HeroSlider isEnglish={isEnglish} />

        <section className="py-20 section-padding max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <span className="inline-block bg-luxury-gold/10 text-luxury-gold px-4 py-1.5 rounded-full text-xs font-bold border border-luxury-gold/15">
              {isEnglish ? "Featured Collection" : "مختارات الملابس"}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish ? "Latest Trends" : "أحدث الصيحات"}
            </h2>
            <p className="text-luxury-gold/60 text-sm max-w-xl mx-auto">
              {isEnglish ? "Handpicked pieces from our latest collection" : "قطعة مختارة بعناية من أحدث تشكيلاتنا"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} isEnglish={isEnglish} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop" className="btn-secondary inline-flex items-center gap-2">
              {isEnglish ? "View All Collection" : "عرض التشكيلة كاملة"}
              <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs`} />
            </Link>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-gold/[0.02] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center space-y-4 mb-12">
              <span className="inline-block bg-luxury-gold/10 text-luxury-gold px-4 py-1.5 rounded-full text-xs font-bold border border-luxury-gold/15">
                {isEnglish ? "Premium Fragrances" : "عالم العطور"}
              </span>
              <h2 className={`text-3xl md:text-4xl font-bold gold-gradient bg-clip-text text-transparent ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Discover Our Perfumes" : "اكتشف عطورنا الفاخرة"}
              </h2>
              <p className="text-luxury-gold/60 text-sm max-w-xl mx-auto">
                {isEnglish ? "Exclusive musk oils and fine fragrances from around the world" : "مسك وعطور فاخرة من أجود الخامات العالمية"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {FEATURED_PERFUMES.map((perfume, i) => (
                <motion.div
                  key={perfume.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group glass-card overflow-hidden hover:border-luxury-gold/20 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden bg-luxury-black">
                    <img src={perfume.image} alt={perfume.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/20 backdrop-blur-sm">
                        {perfume.volume}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                      {isEnglish ? perfume.englishTitle : perfume.title}
                    </h3>
                    <p className="text-xs text-luxury-gold/40 line-clamp-2">
                      {isEnglish ? perfume.englishDescription : perfume.description}
                    </p>
                    {perfume.notes?.top && (
                      <div className="flex items-center gap-1 flex-wrap pt-1">
                        {perfume.notes.top.slice(0, 3).map((note) => (
                          <span key={note} className="text-[9px] px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold/60 border border-luxury-gold/10">
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/perfumes" className="btn-primary inline-flex items-center gap-2">
                {isEnglish ? "Discover More" : "اكتشف المزيد"}
                <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs`} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.icon}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center mx-auto">
                    <i className={`fas ${feature.icon} text-luxury-gold text-xl`} />
                  </div>
                  <p className={`text-xs md:text-sm font-bold text-luxury-gold/80 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                    {isEnglish ? feature.en : feature.ar}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
