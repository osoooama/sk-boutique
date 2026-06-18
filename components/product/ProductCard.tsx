"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { fadeUpVariant } from "@/lib/animations";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import CurrencyPopup from "@/components/CurrencyPopup";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/Toast/ToastContext";

interface ProductCardProps {
  product: Product;
  isEnglish: boolean;
  index?: number;
}

export default function ProductCard({ product, isEnglish, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState<"idle" | "adding" | "removing">("idle");
  const firstColor = product.colors[0];
  const previewColors = product.colors.slice(0, 3);
  const images = firstColor?.images || [];
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addingToCart) return;
    if (!firstColor || !product.sizes[0]) return;
    setAddingToCart(true);
    setTimeout(() => {
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
      setAddingToCart(false);
      setAddedToCart(true);
      addToast("success", isEnglish ? "Added to cart!" : "أضيف للسلة!", "fa-check");
      setTimeout(() => setAddedToCart(false), 1500);
    }, 400);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      setHeartAnimation("removing");
      toggleItem(product.id);
      addToast(
        "info",
        isEnglish ? "Removed from wishlist" : "تمت الإزالة من المفضلة",
        "fa-heart"
      );
      setTimeout(() => setHeartAnimation("idle"), 400);
    } else {
      setHeartAnimation("adding");
      toggleItem(product.id);
      addToast(
        "success",
        isEnglish ? "Added to wishlist" : "أضيف للمفضلة!",
        "fa-heart"
      );
      setTimeout(() => setHeartAnimation("idle"), 400);
    }
  };

  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      <Link
        href={`/product/${product.id}`}
        style={{ textDecoration: "none" }}
      >
        <motion.div
          className="group relative rounded-[20px] overflow-hidden will-change-transform"
          style={{
            background: "var(--bg-card)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(201,168,76,0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
          whileHover={{
            y: -8,
            borderColor: "rgba(201,168,76,0.4)",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-surface-primary">
            <motion.button
              onClick={handleToggleWishlist}
              className={`absolute ${isEnglish ? "right-3" : "left-3"} top-3 z-10 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center cursor-pointer`}
              style={{
                background: wishlisted ? "rgba(239, 68, 68, 0.2)" : "rgba(0,0,0,0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              animate={
                heartAnimation === "adding"
                  ? { scale: [1, 1.4, 1] }
                  : heartAnimation === "removing"
                  ? { x: [0, -4, 4, -4, 0] }
                  : { scale: 1 }
              }
              transition={
                heartAnimation === "adding"
                  ? { type: "spring", stiffness: 400, damping: 10 }
                  : { duration: 0.3 }
              }
            >
              <motion.i
                className="fas fa-heart text-xs"
                style={{ color: wishlisted ? "#f87171" : "var(--accent-gold)" }}
              />
            </motion.button>

            {images[0] && !imgError ? (
              <>
                <Image
                  src={images[0]}
                  alt={isEnglish ? product.englishTitle : product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  onError={() => setImgError(true)}
                />
                {images[1] && (
                  <Image
                    src={images[1]}
                    alt={isEnglish ? product.englishTitle : product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s]"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-4xl text-accent-gold/10">
                <i className="fas fa-tshirt" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={handleQuickAdd}
                disabled={addingToCart}
                className="w-full py-2.5 rounded-xl bg-accent-gold text-surface-primary text-xs font-bold text-center tracking-wide flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <i className="fas fa-spinner fa-spin" />
                ) : addedToCart ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <i className="fas fa-check ml-1" />
                    {isEnglish ? "Added ✓" : "تمت الإضافة ✓"}
                  </motion.span>
                ) : (
                  <>
                    <i className="fas fa-shopping-bag ml-1" />
                    {isEnglish ? "Add to Cart" : "أضف للسلة"}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-3 md:p-4 space-y-2">
            <div className="relative">
              <h3
                className={`font-bold text-sm line-clamp-2 ${
                  isEnglish ? "font-inter" : "font-alexandria"
                }`}
              >
                {isEnglish ? product.englishTitle : product.title}
              </h3>
              <div className="title-tooltip">
                <p className={`text-xs font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                  {isEnglish ? product.englishTitle : product.title}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <CurrencyPopup price={product.basePrice}>
                <span className="font-bold text-accent-gold text-sm">
                  {product.basePrice} {isEnglish ? "JD" : "د.أ"}
                </span>
              </CurrencyPopup>
              <div className="flex gap-1">
                {product.sizes.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="w-6 h-5 rounded text-[9px] font-bold border border-border text-accent-gold/60 flex items-center justify-center"
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
                    className="w-4 h-4 rounded-full border border-border-strong"
                    style={{ backgroundColor: c.hex }}
                    title={isEnglish ? c.englishName : c.name}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-[9px] text-accent-gold/40 mr-1">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
