"use client";

import Image from "next/image";
import PRODUCTS from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import { getCategoryLabel } from "@/lib/utils";

export default function FavoritesDrawer({
  isOpen,
  onClose,
  isEnglish,
  onOpenDetails,
  onAddToCart,
}) {
  const { favorites, toggleFavorite } = useFavorites();

  if (!isOpen) return null;

  const favoritedProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  const t = (key) => {
    const dict = {
      ar: {
        title: "المفضلة لديكِ",
        empty: "قائمة المفضلة فارغة",
        emptyDesc: "أضيفي بعض القطع الراقية التي نالت إعجابكِ لمشاهدتها لاحقاً.",
        startShopping: "استعراض التشكيلة",
        currency: "د.أ",
        remove: "إزالة",
        view: "عرض",
        addToCart: "إضافة للسلة"
      },
      en: {
        title: "Your Favorites",
        empty: "Your wishlist is empty",
        emptyDesc: "Add some premium luxury items you loved to view them later.",
        startShopping: "Explore Collection",
        currency: "JD",
        remove: "Remove",
        view: "View",
        addToCart: "Add to Bag"
      }
    };
    return dict[isEnglish ? "en" : "ar"][key] || key;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />

      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] flex flex-col shadow-2xl animate-slide-in-right pb-safe">
          {/* Header */}
          <div className="h-16 md:h-20 border-b border-[var(--border-subtle)] px-4 md:px-6 flex items-center justify-between pt-safe">
            <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 font-playfair">
              {t("title")} <span className="text-gold font-extrabold font-mono text-sm">({favoritedProducts.length})</span>
            </h3>
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition active:scale-90 min-touch-target" 
              aria-label="Close favorites"
            >
              <i className="fas fa-times text-sm" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {favoritedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-dim)] text-2xl">
                  <i className="far fa-heart" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[var(--text-primary)] text-sm">{t("empty")}</h4>
                  <p className="text-xs text-[var(--text-dim)] leading-relaxed max-w-xs">{t("emptyDesc")}</p>
                </div>
                <button 
                  onClick={onClose} 
                  className="px-8 py-3.5 bg-gold text-black rounded-xl text-xs font-semibold hover:bg-gold/90 transition active:scale-95 min-touch-target"
                >
                  {t("startShopping")}
                </button>
              </div>
            ) : (
              favoritedProducts.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 md:gap-4 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl p-3 md:p-4 relative hover:border-gold/20 transition-all duration-300"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 cursor-pointer" onClick={() => { onOpenDetails(item); onClose(); }}>
                    <Image src={item.colors[0].image} alt={item.title} fill sizes="80px" className="object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 
                      className="font-bold text-[var(--text-primary)] text-xs md:text-sm truncate cursor-pointer hover:text-gold transition"
                      onClick={() => { onOpenDetails(item); onClose(); }}
                    >
                      {isEnglish ? item.englishTitle : item.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-[var(--text-dim)]">
                      {getCategoryLabel(item.category, isEnglish)}
                    </p>
                    <p className="font-bold text-gold text-xs md:text-sm font-mono">
                      {item.price} {t("currency")}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end h-full self-stretch shrink-0">
                    <button 
                      onClick={() => toggleFavorite(item.id)} 
                      className="text-gold hover:text-red-400 transition text-sm active:scale-90"
                      title={t("remove")}
                    >
                      <i className="fas fa-heart" />
                    </button>
                    
                    <button
                      onClick={() => {
                        onAddToCart(item.id, item.sizes[0], item.colors[0].name, item.colors[0].image, 1);
                        onClose();
                      }}
                      className="px-2.5 py-1.5 bg-gold text-black rounded-lg text-[10px] font-bold hover:bg-gold/90 transition active:scale-95"
                    >
                      {t("addToCart")}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
