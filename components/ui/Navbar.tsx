"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { springs } from "@/lib/springs";
import MagneticWrapper from "./MagneticWrapper";

interface NavbarProps {
  isEnglish: boolean;
  isDark: boolean;
  onToggleLang?: () => void;
  onToggleTheme?: (x?: number, y?: number) => void;
  onSearchOpen?: () => void;
}

const NAV_LINKS = [
  { href: "/", ar: "الرئيسية", en: "Home" },
  { href: "/shop", ar: "الملابس", en: "Clothing" },
  { href: "/perfumes", ar: "العطور", en: "Perfumes" },
  { href: "/#contact", ar: "تواصل معنا", en: "Contact Us" },
];

const menuItemVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, ...springs.gentle },
  }),
};

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
  const [badgeBounce, setBadgeBounce] = useState(false);
  const { scrollY } = useScroll();
  const lastScroll = useRef(0);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setBadgeBounce(true);
      setTimeout(() => setBadgeBounce(false), 400);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScroll.current;
    if (diff > 80 && isScrolled) setHidden(true);
    else if (diff < 0) setHidden(false);
    lastScroll.current = latest;
  });

  const [themeRotation, setThemeRotation] = useState(0);

  const scrollBg = isScrolled
    ? isDark ? "rgba(10,10,10,0.72)" : "rgba(255,255,253,0.75)"
    : "transparent";

  const IridescentLogo = ({ className = "" }: { className?: string }) => (
    <span
      className={`text-xl md:text-2xl font-bold tracking-wider select-none ${className}`}
      style={{
        background: "linear-gradient(90deg, #C0C0C0 0%, #C9A84C 20%, #E8D5A3 40%, #FFB6C1 60%, #D4A574 80%, #C0C0C0 100%)",
        backgroundSize: "300% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "logo-shimmer 4s linear infinite",
      }}
    >
      SK
    </span>
  );

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          background: scrollBg,
          backdropFilter: isScrolled ? "blur(24px)" : "blur(4px)",
          WebkitBackdropFilter: isScrolled ? "blur(24px)" : "blur(4px)",
          borderBottom: isScrolled ? "1px solid rgba(201,169,110,0.35)" : "1px solid transparent",
          transition: "background 0.3s ease, border 0.3s ease, backdrop-filter 0.3s ease",
        }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={springs.gentle}
      >
        <div
          className="flex items-center justify-between h-14 md:h-[60px] px-4 md:px-6 mx-auto"
          style={{ maxWidth: "1280px" }}
          dir={isEnglish ? "ltr" : "rtl"}
        >
          <Link href="/" className="flex items-center shrink-0" style={{ textDecoration: "none" }}>
            <IridescentLogo />
          </Link>

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

          <div className="hidden md:flex items-center gap-2.5">
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
                <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-red-400 text-[#1A1208] text-[9px] font-extrabold flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>
            <MagneticWrapper>
              <button onClick={openCart} className="relative" style={{ textDecoration: "none" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all">
                  <i className="fas fa-shopping-bag text-xs" />
                </div>
              {totalItems > 0 && (
                <motion.span
                  key={badgeBounce ? "bounce" : "normal"}
                  className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-extrabold"
                  style={{
                    background: "var(--accent-gold)",
                    color: "var(--text-on-accent)",
                  }}
                  animate={badgeBounce ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={springs.bouncy}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={totalItems}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={springs.snappy}
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              )}
            </button>
            </MagneticWrapper>
            {onToggleTheme && (
              <button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = rect.left + rect.width / 2;
                  const y = rect.top + rect.height / 2;
                  setThemeRotation((p) => p + 180);
                  onToggleTheme(x, y);
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer hover:shadow-[0_0_16px_rgba(201,169,110,0.4)]"
                style={{
                  borderColor: isDark ? "var(--border-color)" : "var(--accent-gold)",
                  background: "var(--nav-bg-ghost)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                aria-label={isEnglish ? "Toggle theme" : "تغيير المظهر"}
              >
                <motion.i
                  animate={{ rotate: themeRotation }}
                  transition={springs.gentle}
                  className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-sm`}
                  style={{ color: "var(--accent-gold)" }}
                />
              </button>
            )}
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

          <div className="flex md:hidden items-center gap-0.5" dir={isEnglish ? "ltr" : "rtl"}>
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="w-11 h-11 rounded-xl border border-border text-accent-gold hover:bg-accent-gold-muted transition-all flex items-center justify-center font-semibold text-[10px]"
                aria-label={isEnglish ? "العربية" : "English"}
              >
                {isEnglish ? "AR" : "EN"}
              </button>
            )}
            {onToggleTheme && (
              <button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = rect.left + rect.width / 2;
                  const y = rect.top + rect.height / 2;
                  setThemeRotation((p) => p + 180);
                  onToggleTheme(x, y);
                }}
                className="w-11 h-11 flex items-center justify-center border-2 transition-all duration-300 cursor-pointer rounded-full hover:shadow-[0_0_16px_rgba(201,169,110,0.4)]"
                style={{
                  borderColor: isDark ? "var(--border-color)" : "var(--accent-gold)",
                  background: "var(--nav-bg-ghost)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                aria-label={isEnglish ? "Toggle theme" : "تغيير المظهر"}
              >
                <motion.i
                  animate={{ rotate: themeRotation }}
                  transition={springs.gentle}
                  className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-sm`}
                  style={{ color: "var(--accent-gold)" }}
                />
              </button>
            )}
            <MagneticWrapper>
            <button
              onClick={openCart}
              className="relative w-11 h-11 flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all rounded-xl"
            >
              <i className="fas fa-shopping-bag text-xs" />
              {totalItems > 0 && (
                <motion.span
                  key={badgeBounce ? "bounce-m" : "normal-m"}
                  className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-extrabold"
                  style={{ background: "var(--accent-gold)", color: "var(--text-on-accent)" }}
                  animate={badgeBounce ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={springs.bouncy}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={totalItems}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={springs.snappy}
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              )}
            </button>
            </MagneticWrapper>
            <button
              onClick={() => setMobileOpen(true)}
              className="w-11 h-11 flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all rounded-xl"
              aria-label={isEnglish ? "Menu" : "القائمة"}
            >
              <div className="relative w-4 h-3">
                <motion.span
                  className="absolute inset-x-0 h-[2px] rounded-full"
                  style={{ background: "var(--accent-gold)", top: 0 }}
                  animate={mobileOpen ? { rotate: 45, top: 5 } : { rotate: 0, top: 0 }}
                  transition={springs.snappy}
                />
                <motion.span
                  className="absolute inset-x-0 top-[5px] h-[2px] rounded-full"
                  style={{ background: "var(--accent-gold)" }}
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={springs.snappy}
                />
                <motion.span
                  className="absolute inset-x-0 h-[2px] rounded-full"
                  style={{ background: "var(--accent-gold)", bottom: 0 }}
                  animate={mobileOpen ? { rotate: -45, bottom: 5 } : { rotate: 0, bottom: 0 }}
                  transition={springs.snappy}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={springs.gentle}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 bottom-0 z-50 w-72 bg-surface-primary backdrop-blur-xl border-l border-border flex flex-col"
              dir={isEnglish ? "ltr" : "rtl"}
              style={{ right: 0, paddingTop: "env(safe-area-inset-top, 0px)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={springs.gentle}
            >
              <div
                className="flex items-center justify-between p-4 border-b border-border"
                style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
              >
                <IridescentLogo className="text-lg" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-border text-accent-gold"
                  aria-label="Close"
                >
                  <i className="fas fa-times text-sm" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    variants={menuItemVariant}
                    initial="hidden"
                    animate="visible"
                    custom={i}
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

              {onToggleLang && (
                <div className="p-4 border-t border-border">
                  <button
                    onClick={onToggleLang}
                    className="w-full h-10 rounded-xl border border-border text-accent-gold hover:bg-accent-gold-muted transition-all text-xs font-semibold"
                  >
                    {isEnglish ? "AR" : "EN"}
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
