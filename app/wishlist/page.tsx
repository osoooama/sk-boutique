"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import ToastContainer from "@/components/ui/ToastContainer";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useTheme } from "@/hooks/useTheme";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { products } from "@/lib/products";
import { perfumes, getPerfumePrice } from "@/lib/perfumes";

export default function WishlistPage() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { items: wishlist, toggleItem } = useWishlist();
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const wishlistedPerfumes = perfumes.filter((p) => wishlist.includes(p.id));

  return (
    <div className={`min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] ${isEnglish ? "font-inter" : "font-alexandria"}`} dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((p) => !p)}
        onToggleTheme={toggleTheme}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <CartDrawer isEnglish={isEnglish} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} isEnglish={isEnglish} />
      <ToastContainer />
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
          {wishlist.length > 0 && <span className="text-luxury-gold/40 text-sm mr-2">({wishlist.length})</span>}
        </h1>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 space-y-6"
          >
            <i className="fas fa-heart text-5xl text-luxury-gold/20 block" />
            <p className="text-sm text-luxury-gold/40">
              {isEnglish ? "Your wishlist is empty" : "قائمة المفضلة فارغة"}
            </p>
            <Link href="/shop" className="btn-primary text-xs px-8 py-3.5 inline-block">
              {isEnglish ? "Browse Collection" : "تصفح المجموعة"}
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
                      <div className="aspect-[3/4] bg-luxury-black overflow-hidden">
                        {imgSrc ? (
                          <img src={imgSrc} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><i className="fas fa-tshirt text-2xl text-luxury-gold/20" /></div>
                        )}
                      </div>
                      <div className="p-3 space-y-1">
                        <p className={`text-xs font-bold truncate ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                          {isEnglish ? product.englishTitle : product.title}
                        </p>
                        <p className="text-[10px] text-luxury-gold/40">{product.basePrice} {isEnglish ? "JD" : "د.أ"}</p>
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
                            openCart();
                          }
                        }}
                        className="w-full py-2.5 rounded-xl border border-luxury-gold/20 text-luxury-gold text-[10px] font-medium hover:bg-luxury-gold/10 transition-all"
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
                  <div className="aspect-[3/4] bg-luxury-black overflow-hidden">
                    <img src={perfume.image} alt={perfume.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <Link href="/perfumes" className="block p-3" style={{ textDecoration: "none" }}>
                    <p className={`text-xs font-bold truncate ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                      {isEnglish ? perfume.englishTitle : perfume.title}
                    </p>
                    <p className="text-[10px] text-luxury-gold/40">{getPerfumePrice(perfume)} {isEnglish ? "JD" : "د.أ"} · {perfume.volume}</p>
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
