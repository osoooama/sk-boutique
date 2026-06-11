"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  isEnglish: boolean;
  index?: number;
}

export default function ProductCard({ product, isEnglish, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const firstColor = product.colors[0];
  const previewColors = product.colors.slice(0, 3);
  const imageSrc = firstColor?.images[0];
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstColor && product.sizes[0]) {
      addItem({
        productId: product.id,
        title: product.title,
        englishTitle: product.englishTitle,
        price: product.basePrice,
        size: product.sizes[0],
        color: firstColor.name,
        colorHex: firstColor.hex,
        image: firstColor.images[0] || "",
      });
      addToast("success", isEnglish ? "Added to cart!" : "أضيف للسلة!", "fa-check");
      openCart();
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    addToast(
      wishlisted ? "info" : "success",
      wishlisted
        ? (isEnglish ? "Removed from wishlist" : "تمت الإزالة من المفضلة")
        : (isEnglish ? "Added to wishlist" : "أضيف للمفضلة!"),
      "fa-heart"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group block glass-card rounded-2xl overflow-hidden hover:border-luxury-gold/20 transition-all duration-500 hover:-translate-y-1"
        style={{ textDecoration: "none" }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-luxury-black">
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              wishlisted
                ? "bg-red-500/20 text-red-400"
                : "bg-black/50 text-luxury-gold/40 hover:text-red-400 hover:bg-red-500/20"
            }`}
          >
            <i className={`fas fa-heart ${wishlisted ? "text-xs" : "text-xs"}`} />
          </button>

          {imageSrc && !imgError ? (
            <Image
              src={imageSrc}
              alt={isEnglish ? product.englishTitle : product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-luxury-gold/10">
              <i className="fas fa-tshirt" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 rounded-xl bg-luxury-gold text-luxury-black text-xs font-bold text-center tracking-wide"
            >
              <i className="fas fa-shopping-bag ml-1" />
              {isEnglish ? "Add to Cart" : "أضف للسلة"}
            </button>
          </div>
        </div>

        <div className="p-3 md:p-4 space-y-2">
          <h3
            className={`font-bold text-sm truncate ${
              isEnglish ? "font-inter" : "font-alexandria"
            }`}
          >
            {isEnglish ? product.englishTitle : product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="font-bold text-luxury-gold text-sm">
              {product.basePrice} {isEnglish ? "JD" : "د.أ"}
            </span>
            <div className="flex gap-1">
              {product.sizes.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="w-6 h-5 rounded text-[9px] font-bold border border-white/10 text-luxury-gold/60 flex items-center justify-center"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {previewColors.length > 0 && (
            <div className="flex gap-1.5 items-center" dir="ltr">
              {previewColors.map((c) => (
                <span
                  key={c.name}
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: c.hex }}
                  title={isEnglish ? c.englishName : c.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-luxury-gold/40 mr-1">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
