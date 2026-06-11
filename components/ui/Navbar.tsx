"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface NavbarProps {
  isEnglish: boolean;
  isDark: boolean;
  onToggleLang?: () => void;
  onToggleTheme?: () => void;
  onSearchOpen?: () => void;
}

const NAV_LINKS = [
  { href: "/", ar: "الرئيسية", en: "Home" },
  { href: "/shop", ar: "الملابس", en: "Clothing" },
  { href: "/perfumes", ar: "العطور", en: "Perfumes" },
  { href: "/#contact", ar: "تواصل معنا", en: "Contact Us" },
];

export default function Navbar({
  isEnglish,
  isDark,
  onToggleLang,
  onToggleTheme,
  onSearchOpen,
}: NavbarProps) {
  const { totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScroll = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScroll.current;
    if (diff > 10) setHidden(true);
    else if (diff < -5) setHidden(false);
    lastScroll.current = latest;
  });

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        dir="ltr"
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-white/5 transition-all"
                aria-label={isEnglish ? "Menu" : "القائمة"}
              >
                <i className="fas fa-bars text-sm" />
              </button>

              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="hidden md:flex w-10 h-10 rounded-xl items-center justify-center border border-white/10 text-luxury-gold hover:bg-white/5 transition-all"
                  aria-label={isEnglish ? "Toggle theme" : "تغيير المظهر"}
                >
                  <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-sm`} />
                </button>
              )}
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-luxury-gold/60 hover:text-luxury-gold transition-colors duration-300 py-2 tracking-wide"
                  style={{ textDecoration: "none" }}
                >
                  {isEnglish ? link.en : link.ar}
                  <span className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-luxury-gold scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-right" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3" dir={isEnglish ? "ltr" : "rtl"}>
              {onSearchOpen && (
                <button
                  onClick={onSearchOpen}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-white/5 transition-all"
                  aria-label={isEnglish ? "Search" : "بحث"}
                >
                  <i className="fas fa-search text-sm" />
                </button>
              )}

              <Link href="/wishlist" className="relative hidden md:block" style={{ textDecoration: "none" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-white/5 transition-all">
                  <i className="fas fa-heart text-sm" />
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-400 text-luxury-black text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              <button onClick={openCart} className="relative" style={{ textDecoration: "none" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-white/5 transition-all">
                  <i className="fas fa-shopping-bag text-sm" />
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-luxury-gold text-luxury-black text-[10px] font-bold flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
                <Logo showText={false} size="sm" />
              </Link>

              {onToggleLang && (
                <button
                  onClick={onToggleLang}
                  className="w-10 h-10 rounded-xl border border-white/10 text-luxury-gold hover:bg-white/5 transition-all flex items-center justify-center font-semibold text-xs"
                  aria-label={isEnglish ? "العربية" : "English"}
                >
                  {isEnglish ? "AR" : "EN"}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 bottom-0 z-50 w-72 bg-black/90 backdrop-blur-xl border-r border-white/10 flex flex-col"
              dir={isEnglish ? "ltr" : "rtl"}
              style={{ left: 0 }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Logo showText={false} size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-luxury-gold"
                  aria-label="Close"
                >
                  <i className="fas fa-times text-sm" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-luxury-gold/70 hover:text-luxury-gold hover:bg-white/5 transition-all text-sm font-medium"
                      style={{ textDecoration: "none" }}
                    >
                      {isEnglish ? link.en : link.ar}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-white/10 my-2" />
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-luxury-gold/70 hover:text-luxury-gold hover:bg-white/5 transition-all text-sm font-medium"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fas fa-heart text-xs" />
                  {isEnglish ? "Wishlist" : "المفضلة"}
                  {wishlistCount > 0 && (
                    <span className="text-[10px] text-red-400">({wishlistCount})</span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-luxury-gold/70 hover:text-luxury-gold hover:bg-white/5 transition-all text-sm font-medium"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fas fa-shopping-bag text-xs" />
                  {isEnglish ? "Cart" : "السلة"}
                  {totalItems > 0 && (
                    <span className="text-[10px] text-luxury-gold">({totalItems})</span>
                  )}
                </Link>
              </nav>

              <div className="p-4 border-t border-white/10 flex items-center gap-3">
                {onToggleTheme && (
                  <button
                    onClick={onToggleTheme}
                    className="flex-1 h-10 rounded-xl border border-white/10 text-luxury-gold hover:bg-white/5 transition-all text-xs"
                  >
                    <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} ml-2`} />
                    {isEnglish ? "Theme" : "المظهر"}
                  </button>
                )}
                {onToggleLang && (
                  <button
                    onClick={onToggleLang}
                    className="flex-1 h-10 rounded-xl border border-white/10 text-luxury-gold hover:bg-white/5 transition-all text-xs font-semibold"
                  >
                    {isEnglish ? "AR" : "EN"}
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
