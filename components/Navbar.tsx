"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import { useWishlist } from "@/context/WishlistContext";

interface NavbarProps {
  isEnglish: boolean;
  isThemeDark: boolean;
  searchQuery: string;
  cartCount: number;
  cartWobble: boolean;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onSearchChange: (v: string) => void;
  onCartOpen: () => void;
  onSizeGuideOpen: () => void;
  onWishlistOpen: () => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

const NAV_LINKS = [
  { href: "#hero", ar: "الرئيسية", en: "Home" },
  { href: "#catalog", ar: "المجموعة", en: "Collection" },
  { href: "#about", ar: "قصتنا", en: "Our Story" },
  { href: "#contact", ar: "تواصل معنا", en: "Contact Us" },
];

export default function Navbar({
  isEnglish,
  isThemeDark,
  searchQuery,
  cartCount,
  cartWobble,
  onToggleTheme,
  onToggleLang,
  onSearchChange,
  onCartOpen,
  onSizeGuideOpen,
  onWishlistOpen,
  searchInputRef,
}: NavbarProps) {
  const { favorites } = useWishlist();
  const wishlistCount = favorites.length;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMobileOpen(false); setMobileSearchOpen(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const t = (ar: string, en: string) => isEnglish ? en : ar;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 pt-safe ${
          scrolled
            ? "bg-[var(--bg-glass)]/80 backdrop-blur-2xl shadow-2xl"
            : "bg-transparent backdrop-blur-xl"
        }`}
        style={{ borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 select-none group min-touch-target"
              style={{ textDecoration: "none" }}
            >
              <span className="text-xl md:text-2xl font-bold tracking-wider font-playfair text-gold transition-all duration-300"
                style={{
                  textShadow: scrolled
                    ? "0 0 20px rgba(201, 168, 76, 0.3)"
                    : "0 0 12px rgba(201, 168, 76, 0.15)",
                }}
              >
                SK <span className="text-[var(--text-primary)] font-cinzel tracking-[0.15em]">BOUTIQUE</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-[var(--text-muted)] hover:text-gold transition-colors duration-300 py-2 group tracking-wide"
                  style={{ textDecoration: "none" }}
                >
                  {isEnglish ? link.en : link.ar}
                  <span className={`absolute -bottom-0.5 inset-x-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isEnglish ? "origin-left" : "origin-right"}`} />
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onSizeGuideOpen}
                className="w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-[var(--text-muted)] hover:text-gold flex items-center justify-center active:scale-90 min-touch-target"
                aria-label={t("جدول المقاسات", "Size Guide")}
              >
                <i className="fas fa-ruler text-xs" />
              </button>

              <div className="flex items-center bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-xl px-3 h-10 focus-within:border-gold/30 transition-all duration-300">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t("ابحث عن قطعة...", "Search for items...")}
                  className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] w-32 focus:w-44 transition-all duration-300"
                />
                <i className="fas fa-search text-[var(--text-dim)] text-xs" />
              </div>

              <button
                onClick={onWishlistOpen}
                className="relative w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-gold flex items-center justify-center active:scale-90 min-touch-target"
                aria-label={t("المفضلة", "Wishlist")}
              >
                <i className={`${wishlistCount > 0 ? "fas" : "far"} fa-heart text-sm`} />
                {wishlistCount > 0 && (
                  <span key={wishlistCount} className="absolute -top-1 -end-1 bg-gold text-black text-[9px] font-black w-[18px] h-[18px] rounded-lg flex items-center justify-center border-2 border-[var(--bg-primary)] shadow-lg animate-counter-bounce">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onCartOpen}
                className={`relative w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-[var(--text-primary)] flex items-center justify-center active:scale-90 min-touch-target ${cartWobble ? "animate-wobble" : ""}`}
                aria-label={t("سلة التسوق", "Shopping Cart")}
              >
                <i className="fas fa-shopping-bag text-sm" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -end-1 bg-gold text-black text-[9px] font-black w-[18px] h-[18px] rounded-lg flex items-center justify-center border-2 border-[var(--bg-primary)] shadow-lg animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={onToggleTheme}
                className="w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-gold flex items-center justify-center active:scale-90 min-touch-target"
                aria-label={t("تغيير المظهر", "Change Theme")}
              >
                <i className={`fas ${isThemeDark ? "fa-sun" : "fa-moon"} text-sm transition-all duration-500 ${isThemeDark ? "hover:rotate-90" : "hover:-rotate-90"}`} />
              </button>

              <button
                onClick={onToggleLang}
                className="w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-gold flex items-center justify-center font-semibold text-[11px] active:scale-90 min-touch-target"
                aria-label={t("English", "العربية")}
              >
                {isEnglish ? "AR" : "EN"}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-gold flex items-center justify-center active:scale-90 min-touch-target"
                aria-label={t("بحث", "Search")}
              >
                <i className="fas fa-search text-sm" />
              </button>

              <button
                onClick={onWishlistOpen}
                className="relative w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] text-gold flex items-center justify-center active:scale-90 min-touch-target"
                aria-label={t("المفضلة", "Wishlist")}
              >
                <i className={`${wishlistCount > 0 ? "fas" : "far"} fa-heart text-sm`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -end-1 bg-gold text-black text-[9px] font-black w-[17px] h-[17px] rounded-lg flex items-center justify-center border-2 border-[var(--bg-primary)] shadow-lg animate-counter-bounce">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onCartOpen}
                className={`relative w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] flex items-center justify-center active:scale-90 min-touch-target ${cartWobble ? "animate-wobble" : ""}`}
                aria-label={t("سلة التسوق", "Cart")}
              >
                <i className="fas fa-shopping-bag text-sm" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -end-1 bg-gold text-black text-[9px] font-black w-[17px] h-[17px] rounded-lg flex items-center justify-center border-2 border-[var(--bg-primary)] shadow-lg animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="w-10 h-10 rounded-xl hover:bg-[var(--bg-subtle)] text-gold flex items-center justify-center active:scale-90 min-touch-target"
                aria-label={t("القائمة", "Menu")}
              >
                <i className="fas fa-bars text-sm" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden items-start pt-safe bg-[var(--bg-glass)] backdrop-blur-2xl animate-fade-in">
          <div className="w-full px-4 pt-4 pb-4">
            <div className="flex items-center gap-3 bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-2xl px-4 h-14">
              <i className="fas fa-search text-gold text-sm" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t("ابحث عن قطعة...", "Search for items...")}
                className="flex-1 bg-transparent border-none outline-none text-base text-[var(--text-primary)]"
              />
              <button
                onClick={() => { setMobileSearchOpen(false); onSearchChange(""); }}
                className="w-9 h-9 rounded-xl hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] flex items-center justify-center"
                aria-label={t("إغلاق", "Close")}
              >
                <i className="fas fa-times text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 bottom-0 z-[60] w-[280px] md:hidden bg-[var(--bg-elevated)] border-s border-[var(--border-light)] shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isEnglish ? "right-0" : "left-0"
        } ${mobileOpen ? "translate-x-0" : isEnglish ? "translate-x-full" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[var(--border-subtle)]">
          <span className="text-lg font-bold font-playfair text-gold">SK BOUTIQUE</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 rounded-xl hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-gold flex items-center justify-center active:scale-90"
            aria-label={t("إغلاق", "Close")}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[var(--text-muted)] hover:text-gold hover:bg-[var(--bg-subtle)] transition-all duration-300 font-medium text-sm"
              style={{ textDecoration: "none" }}
            >
              <i className={`fas ${
                link.href === "#hero" ? "fa-home" :
                link.href === "#catalog" ? "fa-layer-group" :
                link.href === "#about" ? "fa-star" : "fa-envelope"
              } text-gold/70 text-xs w-5 text-center`} />
              {isEnglish ? link.en : link.ar}
            </a>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-3 py-4 border-t border-[var(--border-subtle)] space-y-2">
          <button
            onClick={() => { onToggleTheme(); setMobileOpen(false); }}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-muted)] hover:text-gold hover:bg-[var(--bg-subtle)] transition-all duration-300 text-sm font-medium"
          >
            <i className={`fas ${isThemeDark ? "fa-sun" : "fa-moon"} text-gold text-xs w-5 text-center`} />
            {t("المظهر الداكن", "Dark Mode")}
            <span className={`ms-auto w-10 h-5 rounded-full transition-colors duration-300 flex items-center px-0.5 ${isThemeDark ? "bg-gold" : "bg-[var(--border-light)]"}`}>
              <span className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isThemeDark ? "translate-x-5" : "translate-x-0"}`} />
            </span>
          </button>
          <button
            onClick={() => { onToggleLang(); setMobileOpen(false); }}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-muted)] hover:text-gold hover:bg-[var(--bg-subtle)] transition-all duration-300 text-sm font-medium"
          >
            <i className="fas fa-globe text-gold text-xs w-5 text-center" />
            {t("English", "العربية")}
          </button>
        </div>
      </div>
    </>
  );
}
