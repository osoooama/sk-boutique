"use client";

export default function BottomNav({
  isEnglish,
  isThemeDark,
  cartCount,
  onCartOpen,
  onToggleTheme,
  onMobileSearchOpen
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-tertiary)]/90 backdrop-blur-lg border-t border-[var(--border-subtle)] h-16 flex items-center justify-around px-4 pb-safe">
      <a href="#hero" className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[var(--text-muted)] hover:text-gold transition active:scale-95">
        <i className="fas fa-home text-base" />
        <span>{isEnglish ? "Home" : "الرئيسية"}</span>
      </a>
      <a href="#catalog" className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[var(--text-muted)] hover:text-gold transition active:scale-95">
        <i className="fas fa-shirt text-base" />
        <span>{isEnglish ? "Shop" : "المتجر"}</span>
      </a>
      <button onClick={onCartOpen} className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[var(--text-muted)] hover:text-gold transition relative active:scale-95">
        <i className="fas fa-shopping-bag text-base" />
        <span>{isEnglish ? "Cart" : "السلة"}</span>
        {cartCount > 0 && (
          <span className="absolute -top-0.5 -end-1.5 bg-gold text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
            {cartCount}
          </span>
        )}
      </button>
      <button onClick={onMobileSearchOpen} className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[var(--text-muted)] hover:text-gold transition active:scale-95">
        <i className="fas fa-search text-base" />
        <span>{isEnglish ? "Search" : "بحث"}</span>
      </button>
      <button onClick={onToggleTheme} className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-gold transition active:scale-95">
        <i className={`fas ${isThemeDark ? "fa-sun" : "fa-moon"} text-base`} />
        <span>{isEnglish ? "Theme" : "المظهر"}</span>
      </button>
    </nav>
  );
}
