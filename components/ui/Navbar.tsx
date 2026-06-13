"use client";

import { useState, useEffect, useRef } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScroll.current;
    if (diff > 10) setHidden(true);
    else if (diff < -5) setHidden(false);
    lastScroll.current = latest;
  });

  const pillPy = isScrolled ? "py-2" : "py-4";

  return (
    <>
      <div
        className="fixed top-0 inset-x-0 z-50 pointer-events-none"
        style={{ padding: "12px 16px 4px 16px" }}
      >
        <motion.div
          className="mx-auto pointer-events-auto"
          style={{ maxWidth: "1200px", borderRadius: "20px" }}
          dir="ltr"
          animate={{ y: hidden ? -130 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div
            className={`flex items-center justify-between ${pillPy} px-3 md:px-5 transition-all duration-300`}
            style={{
              background: isScrolled ? "var(--nav-bg)" : "var(--nav-bg-ghost)",
              backdropFilter: isScrolled ? "blur(16px)" : "blur(8px)",
              WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(8px)",
              border: isScrolled ? "1px solid var(--border-color-strong)" : "1px solid var(--border-color)",
              boxShadow: isScrolled ? "var(--shadow-card)" : "none",
              borderRadius: "20px",
            }}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all"
                aria-label={isEnglish ? "Menu" : "القائمة"}
              >
                <i className="fas fa-bars text-xs" />
              </button>

              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="hidden md:flex w-9 h-9 rounded-xl items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all"
                  aria-label={isEnglish ? "Toggle theme" : "تغيير المظهر"}
                >
                  <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-xs`} />
                </button>
              )}
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-accent-gold/60 hover:text-accent-gold transition-colors duration-300 py-2 tracking-wide"
                  style={{ textDecoration: "none" }}
                >
                  {isEnglish ? link.en : link.ar}
                  <span className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-accent-gold scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-right" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5" dir={isEnglish ? "ltr" : "rtl"}>
              {onSearchOpen && (
                <button
                  onClick={onSearchOpen}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all"
                  aria-label={isEnglish ? "Search" : "بحث"}
                >
                  <i className="fas fa-search text-xs" />
                </button>
              )}

              <Link href="/wishlist" className="relative hidden md:block" style={{ textDecoration: "none" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all">
                  <i className="fas fa-heart text-xs" />
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-red-400 text-[#1A1208] text-[9px] font-extrabold flex items-center justify-center animate-badge-pop">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              <button onClick={openCart} className="relative" style={{ textDecoration: "none" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all">
                  <i className="fas fa-shopping-bag text-xs" />
                </div>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-extrabold animate-badge-pop"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover))",
                      color: "#1A1208",
                    }}
                  >
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
                  className="w-9 h-9 rounded-xl border border-border text-accent-gold hover:bg-accent-gold-muted transition-all flex items-center justify-center font-semibold text-[10px]"
                  aria-label={isEnglish ? "العربية" : "English"}
                >
                  {isEnglish ? "AR" : "EN"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

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
              className="fixed top-0 bottom-0 z-50 w-72 bg-surface-primary backdrop-blur-xl border-r border-border flex flex-col"
              dir={isEnglish ? "ltr" : "rtl"}
              style={{ left: 0 }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Logo showText={false} size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-border text-accent-gold"
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
                      className="block px-4 py-3 rounded-xl text-accent-gold/70 hover:text-accent-gold hover:bg-accent-gold-muted transition-all text-sm font-medium"
                      style={{ textDecoration: "none" }}
                    >
                      {isEnglish ? link.en : link.ar}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-border my-2" />
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-accent-gold/70 hover:text-accent-gold hover:bg-accent-gold-muted transition-all text-sm font-medium"
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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-accent-gold/70 hover:text-accent-gold hover:bg-accent-gold-muted transition-all text-sm font-medium"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fas fa-shopping-bag text-xs" />
                  {isEnglish ? "Cart" : "السلة"}
                  {totalItems > 0 && (
                    <span className="text-[10px] text-accent-gold">({totalItems})</span>
                  )}
                </Link>
              </nav>

              <div className="p-4 border-t border-border flex items-center gap-3">
                {onToggleTheme && (
                  <button
                    onClick={onToggleTheme}
                    className="flex-1 h-10 rounded-xl border border-border text-accent-gold hover:bg-accent-gold-muted transition-all text-xs"
                  >
                    <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} ml-2`} />
                    {isEnglish ? "Theme" : "المظهر"}
                  </button>
                )}
                {onToggleLang && (
                  <button
                    onClick={onToggleLang}
                    className="flex-1 h-10 rounded-xl border border-border text-accent-gold hover:bg-accent-gold-muted transition-all text-xs font-semibold"
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
