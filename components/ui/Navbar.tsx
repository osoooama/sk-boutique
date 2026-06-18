"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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

type PillMode = "default" | "compact" | "notification" | "cart";

const menuItemVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, ...springs.gentle },
  }),
};

function pillBg(dark: boolean) {
  return dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)";
}

export default function Navbar({
  isEnglish,
  isDark,
  onToggleLang,
  onToggleTheme,
  onSearchOpen,
}: NavbarProps) {
  const { items, totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScroll = useRef(0);
  const prevTotal = useRef(totalItems);
  const [pillMode, setPillMode] = useState<PillMode>("default");
  const [overrideMode, setOverrideMode] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const notifTimer = useRef<ReturnType<typeof setTimeout>>();
  const [themeRotation, setThemeRotation] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (overrideMode) return;
    setPillMode(isScrolled ? "compact" : "default");
  }, [isScrolled, overrideMode]);

  const revertMode = useCallback(() => {
    setOverrideMode(false);
    setIsScrolled(window.scrollY > 50);
  }, []);

  const showNotification = useCallback((msg: string) => {
    setNotificationMsg(msg);
    setOverrideMode(true);
    setPillMode("notification");
    if (notifTimer.current) clearTimeout(notifTimer.current);
    notifTimer.current = setTimeout(revertMode, 3000);
  }, [revertMode]);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      const last = items[items.length - 1];
      const name = isEnglish ? last?.englishTitle : last?.title;
      showNotification(name ? `✓ ${name}` : isEnglish ? "✓ Added to cart!" : "✓ أضيف للسلة!");
    }
    prevTotal.current = totalItems;
  }, [totalItems, items, isEnglish, showNotification]);

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
    if (overrideMode) return;
    if (diff > 80 && isScrolled) setHidden(true);
    else if (diff < 0) setHidden(false);
    lastScroll.current = latest;
  });

  const handleCartClick = useCallback(() => {
    openCart();
    setPillMode("cart");
    setOverrideMode(true);
  }, [openCart]);

  const IridescentLogo = ({ className = "", width = 40, height = 40 }: { className?: string; width?: number; height?: number }) => (
    <span className={`logo-container relative inline-flex items-center justify-center select-none ${className}`}>
      <span className="absolute inset-0 rounded-full" style={{
        background: "conic-gradient(from 0deg, #C9A84C, #FFB6C1, #C0C0C0, #C9A84C)",
        filter: "blur(20px)",
        opacity: 0.5,
        animation: "spin-glow 6s linear infinite",
      }} />
      <Image
        src="/logo.webp"
        alt="SK BOUTIQUE"
        width={width}
        height={height}
        priority
        className="object-contain relative z-10"
        style={{ borderRadius: "50%" }}
      />
    </span>
  );

  const liquidGlass: React.CSSProperties = {
    background: pillBg(isDark),
    backdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
    WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: isMobile ? "16px" : "20px",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.3)",
  };

  const pillCompact = pillMode === "compact" || (pillMode === "default" && isMobile);
  const horizontalPadding = pillCompact ? "0 12px" : "0 8px";
  const pillHeight = pillCompact ? 40 : 48;

  const CompactContent = () => (
    <motion.div
      key="compact"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={springs.gentle}
      className="flex items-center gap-1.5"
      dir={isEnglish ? "ltr" : "rtl"}
    >
        <Link href="/" className="flex items-center shrink-0" style={{ textDecoration: "none" }}>
          <IridescentLogo width={60} height={18} />
        </Link>
      <div className="flex items-center gap-1">
        <MagneticWrapper>
          <button onClick={handleCartClick} className="relative w-7 h-7 flex items-center justify-center text-accent-gold/60 hover:text-accent-gold transition-all">
            <i className="fas fa-shopping-bag text-xs" />
            {totalItems > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-extrabold"
                style={{ background: "var(--accent-gold)", color: "var(--text-on-accent)" }}
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ scale: { duration: 0.35, ...springs.bouncy } }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </motion.span>
            )}
          </button>
        </MagneticWrapper>
        {onToggleTheme && (
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onToggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
              setThemeRotation((p) => p + 180);
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <motion.i
              animate={{ rotate: themeRotation }}
              className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-[10px]`}
              style={{ color: "var(--accent-gold)" }}
            />
          </button>
        )}
        {onToggleLang && (
          <button
            onClick={onToggleLang}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-accent-gold/60 hover:text-accent-gold transition-all font-semibold text-[9px]"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {isEnglish ? "AR" : "EN"}
          </button>
        )}
      </div>
      {isMobile && (
        <button
          onClick={() => setMobileOpen(true)}
          className="w-7 h-7 flex items-center justify-center text-accent-gold/60 hover:text-accent-gold transition-all"
          aria-label={isEnglish ? "Menu" : "القائمة"}
        >
          <i className="fas fa-bars text-xs" />
        </button>
      )}
    </motion.div>
  );

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 flex justify-center"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
          pointerEvents: "none",
        }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={springs.gentle}
      >
        <motion.div
          layout
          className="flex items-center overflow-hidden"
          style={{
            ...liquidGlass,
            pointerEvents: "auto",
            padding: horizontalPadding,
            height: pillHeight + (pillMode === "notification" || pillMode === "cart" ? 0 : 0),
          }}
          transition={springs.gentle}
        >
          <AnimatePresence mode="popLayout">
            {pillMode === "default" && !isMobile && (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={springs.gentle}
                className="flex items-center gap-1"
                dir={isEnglish ? "ltr" : "rtl"}
              >
                <Link href="/" className="flex items-center shrink-0 mx-2" style={{ textDecoration: "none" }}>
                  <IridescentLogo width={80} height={24} />
                </Link>

                <nav className="flex items-center gap-1 text-sm mx-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-3 py-1.5 rounded-xl text-accent-gold/60 hover:text-accent-gold hover:bg-accent-gold-muted transition-all text-xs font-medium tracking-wide whitespace-nowrap"
                      style={{ textDecoration: "none" }}
                    >
                      {isEnglish ? link.en : link.ar}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center gap-1 mx-1">
                  {onSearchOpen && (
                    <button
                      onClick={onSearchOpen}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-accent-gold/60 hover:text-accent-gold hover:bg-accent-gold-muted transition-all"
                      aria-label={isEnglish ? "Search" : "بحث"}
                    >
                      <i className="fas fa-search text-xs" />
                    </button>
                  )}
                  <Link href="/wishlist" style={{ textDecoration: "none" }}>
                    <div className="relative w-8 h-8 rounded-xl flex items-center justify-center text-accent-gold/60 hover:text-accent-gold hover:bg-accent-gold-muted transition-all">
                      <i className="fas fa-heart text-xs" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-400 text-[8px] font-extrabold flex items-center justify-center" style={{ color: "#1A1208" }}>
                          {wishlistCount > 9 ? "9+" : wishlistCount}
                        </span>
                      )}
                    </div>
                  </Link>
                  <MagneticWrapper>
                    <button onClick={handleCartClick} className="relative" style={{ textDecoration: "none" }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-accent-gold/60 hover:text-accent-gold hover:bg-accent-gold-muted transition-all">
                        <i className="fas fa-shopping-bag text-xs" />
                      </div>
                      {totalItems > 0 && (
                        <motion.span
                          className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-extrabold"
                          style={{ background: "var(--accent-gold)", color: "var(--text-on-accent)" }}
                          key={totalItems}
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ scale: { duration: 0.35, ...springs.bouncy } }}
                        >
                          {totalItems > 9 ? "9+" : totalItems}
                        </motion.span>
                      )}
                    </button>
                  </MagneticWrapper>
                  {onToggleTheme && (
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        onToggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
                        setThemeRotation((p) => p + 180);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:shadow-[0_0_12px_rgba(201,169,110,0.3)]"
                      style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}
                      aria-label={isEnglish ? "Toggle theme" : "تغيير المظهر"}
                    >
                      <motion.i
                        animate={{ rotate: themeRotation }}
                        transition={springs.gentle}
                        className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-xs`}
                        style={{ color: "var(--accent-gold)" }}
                      />
                    </button>
                  )}
                  {onToggleLang && (
                    <button
                      onClick={onToggleLang}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-accent-gold/60 hover:text-accent-gold hover:bg-accent-gold-muted transition-all font-semibold text-[10px]"
                      style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                      aria-label={isEnglish ? "العربية" : "English"}
                    >
                      {isEnglish ? "AR" : "EN"}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {(pillMode === "compact" || (pillMode === "default" && isMobile)) && <CompactContent />}

            {pillMode === "notification" && (
              <motion.div
                key="notification"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={springs.gentle}
                className="flex items-center gap-2 px-4 py-2"
                dir={isEnglish ? "ltr" : "rtl"}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...springs.bouncy, delay: 0.1 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--accent-gold)" }}
                >
                  <i className="fas fa-check text-[10px]" style={{ color: "var(--text-on-accent)" }} />
                </motion.div>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                  {notificationMsg}
                </span>
                <motion.div
                  className="h-0.5 rounded-full"
                  style={{ background: "var(--accent-gold)", width: 48, minWidth: 48 }}
                />
              </motion.div>
            )}

            {pillMode === "cart" && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={springs.gentle}
                className="flex flex-col gap-2 px-4 py-3 min-w-[220px]"
                dir={isEnglish ? "ltr" : "rtl"}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    {isEnglish ? "Cart" : "السلة"} ({totalItems})
                  </span>
                  <button
                    onClick={revertMode}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-accent-gold/40 hover:text-accent-gold transition-all"
                  >
                    <i className="fas fa-times text-[10px]" />
                  </button>
                </div>
                {items.length === 0 ? (
                  <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {isEnglish ? "Cart is empty" : "السلة فارغة"}
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {items.slice(0, 4).map((item) => (
                      <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.colorHex || "var(--accent-gold)" }} />
                        <span className="text-[11px] truncate flex-1" style={{ color: "var(--text-secondary)" }}>
                          {isEnglish ? item.englishTitle : item.title}
                        </span>
                        <span className="text-[10px] font-medium shrink-0" style={{ color: "var(--accent-gold)" }}>
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                    {items.length > 4 && (
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        +{items.length - 4} {isEnglish ? "more" : "أخرى"}
                      </p>
                    )}
                  </div>
                )}
                <button
                  onClick={() => { revertMode(); window.location.href = "/cart"; }}
                  className="w-full h-8 rounded-xl flex items-center justify-center text-[11px] font-bold transition-all"
                  style={{
                    background: "var(--accent-gold)",
                    color: "var(--text-on-accent)",
                  }}
                >
                  {isEnglish ? "View Cart" : "عرض السلة"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
                <IridescentLogo width={80} height={24} />
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
