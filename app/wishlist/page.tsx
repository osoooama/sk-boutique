"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import Toast from "@/components/Toast/Toast";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useTheme } from "@/context/ThemeContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast/ToastContext";
import CurrencyPopup from "@/components/CurrencyPopup";
import { useProducts, usePerfumes } from "@/lib/data";
import { getPerfumePrice } from "@/lib/perfumes";
import { springs } from "@/lib/springs";

export default function WishlistPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { products } = useProducts();
  const { perfumes } = usePerfumes();
  const { items: wishlist, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const { addToast } = useToast();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const wishlistedPerfumes = perfumes.filter((p) => wishlist.includes(p.id));

  return (
    <div className={`min-h-screen ${isEnglish ? "font-inter" : "font-alexandria"}`} dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((p) => !p)}
        onToggleTheme={toggleTheme}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <CartDrawer isEnglish={isEnglish} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} isEnglish={isEnglish} />
      <Toast />
      <BackToTop />

      <main className="pt-28 pb-20 section-padding max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { label: isEnglish ? "Home" : "الرئيسية", href: "/" },
            { label: isEnglish ? "Wishlist" : "المفضلة" },
          ]}
          isEnglish={isEnglish}
        />

        <h1 className={`text-2xl font-bold mb-8 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
          {isEnglish ? "My Wishlist" : "المفضلة"}
          {wishlist.length > 0 && <span className="text-accent-gold/40 text-sm mr-2">({wishlist.length})</span>}
        </h1>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={springs.bouncy}
            className="text-center py-20 space-y-6"
          >
            <motion.i
              className="far fa-heart text-5xl block"
              style={{ color: "var(--accent-gold)", textShadow: "0 0 40px rgba(201,169,110,0.4)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "ease-in-out" }}
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {isEnglish ? "Your wishlist is empty" : "قائمة المفضلة فارغة"}
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {isEnglish ? "Save your favorites and come back anytime" : "احفظي ما يعجبك للعودة إليه"}
              </p>
            </div>
            <Link href="/shop" className="btn-primary text-xs px-8 py-3.5 inline-block gold-gradient" style={{ color: "var(--text-on-accent)" }}>
              {isEnglish ? "Browse Products" : "تصفح المنتجات"}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {wishlistedProducts.map((product) => {
                const color = product.colors[0];
                const imgSrc = color?.images[0];
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-card group relative overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        toggleItem(product.id);
                        addToast("info", isEnglish ? "Removed from wishlist" : "تمت الإزالة من المفضلة", "fa-heart");
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <i className="fas fa-heart text-xs" />
                    </button>
                    <Link href={`/product/${product.id}`} className="block" style={{ textDecoration: "none" }}>
                      <div className="relative aspect-[3/4] bg-surface-primary overflow-hidden">
                        {imgSrc ? (
                          <Image src={imgSrc} alt={isEnglish ? product.englishTitle : product.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><i className="fas fa-tshirt text-2xl text-accent-gold/20" /></div>
                        )}
                      </div>
                      <div className="p-3 space-y-1">
                        <div className="relative">
                          <p className={`text-xs font-bold line-clamp-2 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                            {isEnglish ? product.englishTitle : product.title}
                          </p>
                          <div className="title-tooltip">
                            <p className={`text-xs font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                              {isEnglish ? product.englishTitle : product.title}
                            </p>
                          </div>
                        </div>
                        <CurrencyPopup price={product.basePrice}>
                          <p className="text-[10px] text-accent-gold/40">{product.basePrice} {isEnglish ? "JD" : "د.أ"}</p>
                        </CurrencyPopup>
                      </div>
                    </Link>
                    <div className="px-3 pb-3">
                      <button
                        onClick={() => {
                          if (product.colors[0] && product.sizes[0]) {
                            addItem({
                              productId: product.id,
                              title: product.title,
                              englishTitle: product.englishTitle,
                              price: product.basePrice,
                              size: product.sizes[0],
                              color: product.colors[0].name,
                              colorHex: product.colors[0].hex,
                              image: product.colors[0].images[0] || "",
                            });
                            addToast("success", isEnglish ? "Added to cart!" : "أضيف للسلة!", "fa-check");
                          }
                        }}
                        className="w-full py-2.5 rounded-xl border border-accent-gold-muted text-accent-gold text-[10px] font-medium hover:bg-accent-gold-muted transition-all"
                      >
                        <i className="fas fa-shopping-bag mr-1" />
                        {isEnglish ? "Add to Cart" : "أضف للسلة"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
              {wishlistedPerfumes.map((perfume) => (
                <motion.div
                  key={perfume.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card group relative overflow-hidden"
                >
                  <button
                    onClick={() => {
                      toggleItem(perfume.id);
                      addToast("info", isEnglish ? "Removed from wishlist" : "تمت الإزالة من المفضلة", "fa-heart");
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <i className="fas fa-heart text-xs" />
                  </button>
                  <div className="relative aspect-[3/4] bg-surface-primary overflow-hidden">
                    <Image src={perfume.image} alt={isEnglish ? perfume.englishTitle : perfume.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                  </div>
                  <Link href="/perfumes" className="block p-3" style={{ textDecoration: "none" }}>
                    <div className="relative">
                      <p className={`text-xs font-bold line-clamp-1 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                        {isEnglish ? perfume.englishTitle : perfume.title}
                      </p>
                      <div className="title-tooltip">
                        <p className={`text-xs font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                          {isEnglish ? perfume.englishTitle : perfume.title}
                        </p>
                      </div>
                    </div>
                    <CurrencyPopup price={getPerfumePrice(perfume)}>
                      <p className="text-[10px] text-accent-gold/40">{getPerfumePrice(perfume)} {isEnglish ? "JD" : "د.أ"} · {perfume.volume}</p>
                    </CurrencyPopup>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
