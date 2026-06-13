"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeLeftVariant, staggerContainer, fadeUpVariant } from "@/lib/animations";
import TiltCard from "@/components/product/TiltCard";
import Navbar from "@/components/ui/Navbar";
import { useTheme } from "@/hooks/useTheme";
import HeroSlider from "@/components/ui/HeroSlider";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import Toast from "@/components/Toast/Toast";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import { products } from "@/lib/products";
import { perfumes } from "@/lib/perfumes";
import FeedbackGallery from "@/components/FeedbackGallery";

const FEATURES = [
  { icon: "fa-truck-fast", ar: "شحن سريع لكل الأردن", en: "Fast Shipping Across Jordan" },
  { icon: "fa-rotate-left", ar: "إرجاع مجاني خلال 7 أيام", en: "7-Day Free Returns" },
  { icon: "fa-certificate", ar: "خامات إيطالية وفرنسية", en: "Italian & French Materials" },
  { icon: "fa-hand-holding-dollar", ar: "الدفع عند الاستلام", en: "Cash on Delivery" },
];

const FEATURED_PERFUMES = perfumes.slice(0, 3);

export default function HomePage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]">
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
        <HeroSlider isEnglish={isEnglish} />

        <section className="py-20 section-padding max-w-7xl mx-auto">
          <motion.div
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <span className="inline-block bg-accent-gold-muted text-accent-gold px-4 py-1.5 rounded-full text-xs font-bold border border-accent-gold-muted">
              {isEnglish ? "Featured Collection" : "مختارات الملابس"}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish ? "Latest Trends" : "أحدث الصيحات"}
            </h2>
            <motion.div
              className="h-[3px] w-16 mx-auto rounded-full gold-gradient"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ transformOrigin: isEnglish ? "left" : "right" }}
            />
            <p className="text-accent-gold/60 text-sm max-w-xl mx-auto">
              {isEnglish ? "Handpicked pieces from our latest collection" : "قطعة مختارة بعناية من أحدث تشكيلاتنا"}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} isEnglish={isEnglish} index={i} />
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/shop" className="btn-secondary inline-flex items-center gap-2">
              {isEnglish ? "View All Collection" : "عرض التشكيلة كاملة"}
              <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs`} />
            </Link>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-gold/[0.02] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-gold-muted rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              variants={fadeLeftVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <span className="inline-block bg-accent-gold-muted text-accent-gold px-4 py-1.5 rounded-full text-xs font-bold border border-accent-gold-muted">
                {isEnglish ? "Premium Fragrances" : "عالم العطور"}
              </span>
              <h2 className={`text-3xl md:text-4xl font-bold gold-gradient bg-clip-text text-transparent ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Discover Our Perfumes" : "اكتشف عطورنا الفاخرة"}
              </h2>
              <motion.div
                className="h-[3px] w-16 mx-auto rounded-full gold-gradient"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ transformOrigin: isEnglish ? "left" : "right" }}
              />
              <p className="text-accent-gold/60 text-sm max-w-xl mx-auto">
                {isEnglish ? "Exclusive musk oils and fine fragrances from around the world" : "مسك وعطور فاخرة من أجود الخامات العالمية"}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            >
              {FEATURED_PERFUMES.map((perfume, i) => (
                <motion.div
                  key={perfume.id}
                  variants={fadeUpVariant}
                  custom={i}
                >
                  <TiltCard className="group glass-card overflow-hidden hover:border-accent-gold-muted transition-all duration-500">
                    <div className="relative aspect-square overflow-hidden bg-surface-primary">
                      <img src={perfume.image} alt={perfume.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-accent-gold-muted text-accent-gold border border-accent-gold-muted backdrop-blur-sm">
                          {perfume.volume}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="relative">
                        <h3 className={`font-bold text-sm line-clamp-1 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                          {isEnglish ? perfume.englishTitle : perfume.title}
                        </h3>
                        <div className="title-tooltip">
                          <p className={`text-xs font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                            {isEnglish ? perfume.englishTitle : perfume.title}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-accent-gold/40 line-clamp-2">
                        {isEnglish ? perfume.englishDescription : perfume.description}
                      </p>
                      {perfume.notes?.top && (
                        <div className="flex items-center gap-1 flex-wrap pt-1">
                          {perfume.notes.top.slice(0, 3).map((note) => (
                            <span key={note} className="text-[9px] px-2 py-0.5 rounded-full bg-accent-gold-muted text-accent-gold/60 border border-accent-gold-muted">
                              {note}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-10">
              <Link href="/perfumes" className="btn-primary inline-flex items-center gap-2">
                {isEnglish ? "Discover More" : "اكتشف المزيد"}
                <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs`} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.icon}
                  variants={fadeUpVariant}
                  custom={i}
                  className="text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent-gold-muted border border-accent-gold-muted flex items-center justify-center mx-auto">
                    <i className={`fas ${feature.icon} text-accent-gold text-xl`} />
                  </div>
                  <p className={`text-xs md:text-sm font-bold text-accent-gold/80 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                    {isEnglish ? feature.en : feature.ar}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 border-t border-border overflow-hidden">
          <div className="absolute left-1/4 w-96 h-96 bg-accent-gold-muted rounded-full blur-[120px] pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              variants={fadeLeftVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center space-y-4 mb-14"
            >
              <span className="inline-flex items-center gap-2 bg-accent-gold-muted text-accent-gold px-4 py-1.5 rounded-full text-xs font-bold border border-accent-gold-muted">
                <i className="fas fa-camera text-[10px]" />
                {isEnglish ? "Client Feedback" : "آراء العملاء"}
              </span>
              <h2 className={`text-3xl md:text-4xl font-bold gold-gradient bg-clip-text text-transparent ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                <i className="fas fa-camera mr-2 text-accent-gold/40" />
                {isEnglish ? "What Our Clients Say" : "ماذا قالوا عنا؟"}
              </h2>
              <motion.div
                className="h-[3px] w-16 mx-auto rounded-full gold-gradient"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ transformOrigin: isEnglish ? "left" : "right" }}
              />
              <p className="text-accent-gold/60 text-sm max-w-xl mx-auto">
                {isEnglish ? "Real moments from our valued customers" : "لحظات حقيقية من عملائنا الكرام"}
              </p>
            </motion.div>

            <FeedbackGallery isEnglish={isEnglish} />
          </div>
        </section>
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
