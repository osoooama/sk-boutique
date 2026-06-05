"use client";

import Image from "next/image";

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
  searchInputRef
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="rounded-[1.5rem] glass-effect border border-[var(--border-light)] shadow-2xl transition-all duration-500 backdrop-blur-md">
          <div className="px-4 md:px-10 h-14 md:h-20 flex items-center justify-between">
            <a href="#hero" className="flex items-center gap-2 select-none group">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center transition-all duration-500 group-hover:bg-gold/20 group-hover:scale-105">
                <Image
                  src="/assets/logo_gold.png"
                  alt="SK Logo"
                  width={26}
                  height={26}
                  className="w-5 h-5 md:w-[26px] md:h-[26px] object-contain color-cycle-logo"
                />
              </div>
              <span className="text-base md:text-2xl font-bold tracking-wider font-cinzel text-gold group-hover:text-gold/90 transition-all duration-300">
                BOUTIQUE
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-muted)]">
              {["#hero", "#catalog", "#about", "#contact"].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  className="hover:text-[var(--text-primary)] transition duration-300 relative group py-2"
                >
                  {i === 0 ? (isEnglish ? "Home" : "الرئيسية") : i === 1 ? (isEnglish ? "Collection" : "المجموعة") : i === 2 ? (isEnglish ? "Our Story" : "قصتنا") : (isEnglish ? "Contact Us" : "تواصل معنا")}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={onToggleTheme}
                className="w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-gold flex items-center justify-center active:scale-90"
                aria-label={isEnglish ? "Change Theme" : "تغيير المظهر"}
              >
                <i className={`fas ${isThemeDark ? "fa-sun animate-pulse" : "fa-moon"} text-xs md:text-sm transition-transform duration-500 hover:rotate-45`} />
              </button>

              <button
                onClick={onToggleLang}
                className="w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-gold flex items-center justify-center font-sans font-bold text-[10px] md:text-xs active:scale-90"
                aria-label="Switch Language"
              >
                {isEnglish ? "AR" : "EN"}
              </button>

              <div className="hidden md:flex items-center bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-xl px-4 h-10 focus-within:border-gold/30 transition-all duration-300">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={isEnglish ? "Search for items..." : "ابحث عن قطعة..."}
                  className="bg-transparent border-none outline-none text-xs text-[var(--text-primary)] w-36 focus:w-48 transition-all duration-300"
                />
                <i className="fas fa-search text-[var(--text-dim)] text-xs" />
              </div>

              <button
                onClick={onCartOpen}
                className={`relative w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-gold/20 transition-all duration-300 text-[var(--text-primary)] flex items-center justify-center active:scale-90 ${cartWobble ? "animate-wobble" : ""}`}
                aria-label={isEnglish ? "Shopping Cart" : "سلة التسوق"}
              >
                <i className="fas fa-shopping-bag text-xs md:text-sm" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -end-1 bg-gold text-black text-[9px] font-black w-[18px] h-[18px] rounded-lg flex items-center justify-center border border-[var(--bg-primary)] shadow-lg animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
