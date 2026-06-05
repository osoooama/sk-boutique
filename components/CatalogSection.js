"use client";

import Image from "next/image";
import PRODUCTS from "@/data/products";
import { getProductPrice, getCategoryLabel } from "@/lib/utils";

export default function CatalogSection({
  isEnglish,
  wishlist,
  searchQuery,
  activeCategory,
  sortBy,
  onSetActiveCategory,
  onSetSortBy,
  onSearchChange,
  onToggleWishlist,
  onAddToCart,
  onOpenDetails
}) {
  const t = (key) => {
    const dict = {
      ar: {
        catalogBadge: "مجموعتنا الحصرية 🇪🇺",
        catalogTitle: "تصاميمنا الراقية",
        catalogDesc: "تصاميم أوروبية عصرية تُصنع محلياً بأفضل الخامات المستوردة — ارتدِ الأناقة بفخر وثقة.",
        catAll: "الكل", catSets: "أطقم فاخرة", catOuterwear: "جاكيتات وبليزر", catBlouses: "بلوزات وقمصان",
        sortByLabel: "ترتيب حسب:", sortFeatured: "الأبرز", sortPriceLow: "السعر: من الأقل للأعلى", sortPriceHigh: "السعر: من الأعلى للأقل",
        noProducts: "لم نعثر على أي قطع تطابق تصفيتك.", noProductsDesc: "جرب إدخال كلمات بحث أخرى أو تغيير تصفية الأقسام.",
        startingFrom: "ابتداءً من", currency: "د.أ", viewDetails: "عرض التفاصيل"
      },
      en: {
        catalogBadge: "Our Exclusive Collection 🇪🇺",
        catalogTitle: "Our Exquisite Designs",
        catalogDesc: "Modern European designs, locally crafted with premium imported materials — wear elegance with pride.",
        catAll: "All", catSets: "Luxury Sets", catOuterwear: "Jackets & Blazers", catBlouses: "Blouses & Shirts",
        sortByLabel: "Sort by:", sortFeatured: "Featured", sortPriceLow: "Price: Low to High", sortPriceHigh: "Price: High to Low",
        noProducts: "No items found matching your filters.", noProductsDesc: "Try entering different keywords or changing category filters.",
        startingFrom: "Starting from", currency: "JD", viewDetails: "View Details"
      }
    };
    return dict[isEnglish ? "en" : "ar"][key] || key;
  };

  const filteredProducts = PRODUCTS.filter((prod) => {
    if (activeCategory !== "all" && prod.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prod.title.toLowerCase().includes(q) ||
        prod.englishTitle.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sortedProducts = [...filteredProducts];
  if (sortBy === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-16" id="catalog">
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <span className="inline-block bg-gold/10 text-gold px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-gold/15">
            {t("catalogBadge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] font-cairo">{t("catalogTitle")}</h2>
          <p className="text-[var(--text-muted)] text-sm max-w-xl mx-auto font-light leading-relaxed">{t("catalogDesc")}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-[var(--border-subtle)] pb-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none">
            {[
              { id: "all", label: t("catAll") },
              { id: "sets", label: t("catSets") },
              { id: "outerwear", label: t("catOuterwear") },
              { id: "blouses", label: t("catBlouses") }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSetActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition duration-300 whitespace-nowrap ${
                  activeCategory === tab.id
                    ? "bg-gold text-black shadow-lg shadow-gold/10 font-semibold"
                    : "bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle-hover)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <label htmlFor="sort-select" className="text-xs text-[var(--text-muted)] font-medium whitespace-nowrap">
              {t("sortByLabel")}
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSetSortBy(e.target.value)}
              className="bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-xl px-4 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-gold/30 transition duration-300"
            >
              <option value="featured">{t("sortFeatured")}</option>
              <option value="price-low">{t("sortPriceLow")}</option>
              <option value="price-high">{t("sortPriceHigh")}</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-3xl">
            <i className="fas fa-search-minus text-4xl text-[var(--text-dim)] mb-4" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{t("noProducts")}</h3>
            <p className="text-xs text-[var(--text-dim)] mt-2">{t("noProductsDesc")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {sortedProducts.map((prod) => {
              const isLiked = wishlist.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="group bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:border-gold/15 hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 cursor-pointer">
                    <Image
                      src={prod.colors[0].image}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      onClick={() => onOpenDetails(prod)}
                    />

                    <button
                      onClick={(e) => onToggleWishlist(e, prod.id)}
                      className={`absolute top-2.5 right-2.5 md:top-4 md:right-4 w-[30px] h-[30px] md:w-9 md:h-9 rounded-full flex items-center justify-center glass-effect transition duration-300 transform active:scale-90 ${
                        isLiked ? "text-gold" : "text-[var(--text-primary)]/60 hover:text-[var(--text-primary)]"
                      }`}
                      aria-label={isEnglish ? "Add to wishlist" : "أضف للمفضلة"}
                    >
                      <i className={isLiked ? "fas fa-heart text-xs md:text-sm" : "far fa-heart text-xs md:text-sm"} />
                    </button>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <button
                        onClick={() => onOpenDetails(prod)}
                        className="px-6 py-3 bg-white text-black font-semibold rounded-xl text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                      >
                        {t("viewDetails")} <i className="far fa-eye text-xs" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 md:p-5 space-y-1.5 md:space-y-2">
                    <div className="flex items-center justify-between text-[9px] md:text-[10px] text-[var(--text-dim)]">
                      <span>{getCategoryLabel(prod.category, isEnglish)}</span>
                    </div>
                    <h3
                      onClick={() => onOpenDetails(prod)}
                      className="font-bold text-[var(--text-primary)] text-xs md:text-sm hover:text-gold transition cursor-pointer truncate"
                    >
                      {isEnglish ? prod.englishTitle : prod.title}
                    </h3>
                    <div className="flex items-center justify-between pt-0.5 md:pt-1">
                      <span className="font-extrabold text-gold text-xs md:text-sm">
                        {t("startingFrom")} {prod.price} {t("currency")}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod.id, prod.sizes[0], prod.colors[0].name, prod.colors[0].image, 1);
                        }}
                        className="w-[30px] h-[30px] md:w-8 md:h-8 rounded-full bg-[var(--bg-subtle)] hover:bg-gold hover:text-black text-[var(--text-primary)]/80 transition-all duration-300 flex items-center justify-center active:scale-90"
                        title={isEnglish ? "Quick add to cart" : "إضافة سريعة للسلة"}
                      >
                        <i className="fas fa-plus text-[10px] md:text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
