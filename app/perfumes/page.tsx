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
import { useTheme } from "@/hooks/useTheme";
import { perfumes } from "@/lib/perfumes";
import type { Perfume } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const getPrice = (p: Perfume) => {
  switch (p.category) {
    case "musk": return 5;
    case "perfume": return p.volume === "50ml" ? 8 : 6;
    case "sample": return 3;
    default: return 0;
  }
};

const CATEGORIES = [
  { id: "all", ar: "\u0627\u0644\u0643\u0644", en: "All" },
  { id: "musk", ar: "\u0645\u0633\u0643", en: "Musk" },
  { id: "perfume", ar: "\u0639\u0637\u0648\u0631", en: "Perfumes" },
  { id: "sample", ar: "\u0639\u064a\u0646\u0627\u062a", en: "Samples" },
];

export default function PerfumesPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { addItem } = useCart();
  const { addToast } = useToast();

  const filtered =
    activeCategory === "all"
      ? perfumes
      : perfumes.filter((p) => p.category === activeCategory);

  const handleAddPerfume = (perfume: Perfume) => {
    addItem({
      productId: perfume.id,
      title: perfume.title,
      englishTitle: perfume.englishTitle,
      price: getPrice(perfume),
      size: perfume.volume,
      color: "Original",
      colorHex: "#C9A84C",
      image: perfume.image,
    });
    addToast("success", isEnglish ? "Added to cart!" : "أضيف للسلة!", "fa-check");
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]" dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((prev) => !prev)}
        onToggleTheme={toggleTheme}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <CartDrawer isEnglish={isEnglish} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} isEnglish={isEnglish} />
      <ToastContainer />
      <BackToTop />

      <main>
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-gold/[0.08] via-transparent to-surface-primary pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent-gold/[0.05] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative text-center space-y-4 section-padding max-w-7xl mx-auto">
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
            <h1 className={`text-4xl md:text-5xl font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              <span className="gold-gradient bg-clip-text text-transparent">
                {isEnglish ? "SK Exclusive Perfumes" : "\u0639\u0637\u0648\u0631 SK \u0627\u0644\u062d\u0635\u0631\u064a\u0629"}
              </span>
            </h1>
            <p className="text-accent-gold/60 text-sm max-w-xl mx-auto">
              {isEnglish ? "Exclusive musk oils and fine fragrances \u2014 scents that last" : "\u0639\u0637\u0648\u0631 \u0648\u0645\u0633\u0643 \u0641\u0627\u062e\u0631 \u2014 \u0631\u0648\u0627\u0626\u062d \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629 \u062a\u062f\u0648\u0645 \u0637\u0648\u064a\u0644\u0627\u064b"}
            </p>
          </div>
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
              <p className={`font-bold text-sm md:text-base text-accent-gold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
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
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap min-touch-target ${activeCategory === cat.id ? "bg-accent-gold text-surface-primary shadow-lg shadow-accent-gold/25" : "glass-card text-accent-gold hover:bg-accent-gold-muted hover:border-accent-gold/30"}`}
                style={{ border: activeCategory !== cat.id ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent" }}
              >
                {isEnglish ? cat.en : cat.ar}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24 glass-card">
                <i className="fas fa-spray-can-sparkles text-3xl text-accent-gold/40 mb-4 block" />
                <p className="text-accent-gold/60 text-sm">{isEnglish ? "No perfumes found" : "\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0637\u0648\u0631"}</p>
              </motion.div>
            ) : (
              <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((perfume, i) => (
                  <motion.div key={perfume.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group glass-card overflow-hidden hover:border-accent-gold-muted transition-all duration-500 hover:-translate-y-1">
                    <div className="relative aspect-square overflow-hidden bg-surface-primary">
                      <img src={perfume.image} alt={perfume.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-accent-gold-muted text-accent-gold border border-accent-gold-muted backdrop-blur-sm">{perfume.volume}</span>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-black/40 text-accent-gold border border-border backdrop-blur-sm">{isEnglish ? perfume.englishTitle : perfume.title}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className={`font-bold text-sm truncate ${isEnglish ? "font-inter" : "font-alexandria"}`}>{isEnglish ? perfume.englishTitle : perfume.title}</h3>
                      <p className="text-xs text-accent-gold/40 line-clamp-2 leading-relaxed">{isEnglish ? perfume.englishDescription : perfume.description}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-accent-gold">{getPrice(perfume)} {isEnglish ? "JD" : "\u062f.\u0623"}</span>
                        <button onClick={() => handleAddPerfume(perfume)} className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-accent-gold-muted text-accent-gold border border-accent-gold-muted hover:bg-accent-gold/25 transition-all">
                          <i className="fas fa-shopping-bag mr-1" />{isEnglish ? "Add" : "\u0623\u0636\u0641"}
                        </button>
                      </div>
                      {perfume.notes && (
                        <div className="pt-2 border-t border-border space-y-1">
                          {perfume.notes.top && <p className="text-[10px] text-accent-gold/40">{isEnglish ? "Top:" : "\u0627\u0644\u0628\u062f\u0627\u064a\u0629:"} <span className="text-accent-gold/60">{perfume.notes.top.join("\u060c ")}</span></p>}
                          {perfume.notes.middle && <p className="text-[10px] text-accent-gold/40">{isEnglish ? "Heart:" : "\u0627\u0644\u0642\u0644\u0628:"} <span className="text-accent-gold/60">{perfume.notes.middle.join("\u060c ")}</span></p>}
                          {perfume.notes.base && <p className="text-[10px] text-accent-gold/40">{isEnglish ? "Base:" : "\u0627\u0644\u0642\u0627\u0639\u062f\u0629:"} <span className="text-accent-gold/60">{perfume.notes.base.join("\u060c ")}</span></p>}
                        </div>
                      )}
                    </div>
                  </motion.div>
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
