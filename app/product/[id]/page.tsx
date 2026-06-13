"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import Toast from "@/components/Toast/Toast";
import ColorSwatches from "@/components/product/ColorSwatches";
import SizeSelector from "@/components/product/SizeSelector";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SizeGuideModal from "@/components/ui/SizeGuideModal";
import BackToTop from "@/components/ui/BackToTop";
import { useTheme } from "@/hooks/useTheme";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/Toast/ToastContext";

const RECENT_KEY = "sk_recently_viewed";

export default function ProductDetailPage() {
  const params = useParams();
  const [isEnglish, setIsEnglish] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const { addItem, items: cartItems } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const { addToast } = useToast();

  const product = products.find((p) => p.id === params.id);

  useEffect(() => {
    if (!product) return;
    try {
      const stored: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      const updated = [product.id, ...stored.filter((id) => id !== product.id)].slice(0, 6);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      setRecentlyViewed(updated);
    } catch { /* ignore */ }
  }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <i className="fas fa-tshirt text-4xl text-accent-gold/20 block" />
          <p className="text-accent-gold/60">{isEnglish ? "Product not found" : "المنتج غير موجود"}</p>
        </div>
      </div>
    );
  }

  const activeColor = product.colors.find((c) => c.name === selectedColor) || product.colors[0];
  const images = activeColor?.images || [];
  const wishlisted = isWishlisted(product.id);

  const sizeSurcharge = product.colors.find((c) => c.name === activeColor?.name)?.surcharge || 0;
  const finalPrice = product.basePrice + sizeSurcharge;

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes[0]) setSelectedSize(product.sizes[0]);
    const size = selectedSize || product.sizes[0];
    if (!size || !activeColor) {
      addToast("warning", isEnglish ? "Please select a size" : "الرجاء اختيار مقاس", "fa-ruler");
      return;
    }
    addItem({
      productId: product.id,
      title: product.title,
      englishTitle: product.englishTitle,
      price: finalPrice,
      size,
      color: activeColor.name,
      colorHex: activeColor.hex,
      image: activeColor.images[0] || "",
    });
    setAddedToCart(true);
    addToast("success", isEnglish ? "Added to cart!" : "أضيف للسلة!", "fa-check");
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentProducts = recentlyViewed.filter((id) => id !== product.id).slice(0, 4).map((id) => products.find((p) => p.id === id)).filter(Boolean);

  const cartQty = cartItems
    .filter((i) => i.productId === product.id && i.size === (selectedSize || product.sizes[0]) && i.color === activeColor.name)
    .reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]" dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((prev) => !prev)}
        onToggleTheme={toggleTheme}
      />
      <CartDrawer isEnglish={isEnglish} />
      <Toast />

      <main className="pt-28 pb-28 md:pb-20 section-padding max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { label: isEnglish ? "Home" : "الرئيسية", href: "/" },
            { label: isEnglish ? "Shop" : "المتجر", href: "/shop" },
            { label: isEnglish ? product.englishTitle : product.title },
          ]}
          isEnglish={isEnglish}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-card bg-surface-primary">
              <button
                onClick={() => {
                  toggleItem(product.id);
                  addToast(
                    wishlisted ? "info" : "success",
                    wishlisted
                      ? (isEnglish ? "Removed from wishlist" : "تمت الإزالة من المفضلة")
                      : (isEnglish ? "Added to wishlist" : "أضيف للمفضلة!"),
                    "fa-heart"
                  );
                }}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                  wishlisted
                    ? "bg-red-500/20 text-red-400"
                    : "bg-black/50 text-accent-gold/40 hover:text-red-400 hover:bg-red-500/20"
                }`}
              >
                <i className={`fas fa-heart ${wishlisted ? "text-sm" : "text-sm"}`} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeColor?.name}-${selectedImage}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {images[selectedImage] ? (
                    <Image src={images[selectedImage]} alt={isEnglish ? product.englishTitle : product.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fas fa-tshirt text-6xl text-accent-gold/20" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              {product.inStock && (
                <span className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-sm z-10">
                  {isEnglish ? "In Stock" : "متوفر"}
                </span>
              )}
              {cartQty > 0 && (
                <span className="absolute bottom-4 left-4 text-[10px] font-bold px-3 py-1.5 rounded-full bg-accent-gold-muted text-accent-gold border border-accent-gold-muted backdrop-blur-sm z-10">
                  {cartQty} {isEnglish ? "in cart" : "في السلة"}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2" dir="ltr">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === i ? "border-accent-gold scale-105" : "border-border hover:border-border-strong"
                    }`}
                  >
                    <Image src={img} alt={isEnglish ? `${product.englishTitle} ${i + 1}` : `${product.title} ${i + 1}`} fill sizes="80px" className="object-cover" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 md:sticky md:top-28 md:self-start">
            <div className="space-y-3">
              <h1 className={`text-2xl md:text-4xl font-bold leading-tight ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? product.englishTitle : product.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-bold text-accent-gold">
                  {finalPrice} {isEnglish ? "JD" : "د.أ"}
                </span>
                {sizeSurcharge > 0 && (
                  <span className="text-xs text-accent-gold/40 line-through">
                    {product.basePrice} {isEnglish ? "JD" : "د.أ"}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-accent-gold/60 leading-relaxed">
              {isEnglish ? product.englishDescription : product.description}
            </p>

            {product.colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-content-secondary">
                  {isEnglish ? "Color" : "اللون"}
                  <span className="text-accent-gold mr-2">{isEnglish ? activeColor?.englishName : activeColor?.name}</span>
                </h3>
                <ColorSwatches
                  colors={product.colors}
                  selectedColor={selectedColor || product.colors[0].name}
                  onColorChange={(name) => { setSelectedColor(name); setSelectedImage(0); }}
                  isEnglish={isEnglish}
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-content-secondary">{isEnglish ? "Size" : "المقاس"}</h3>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[10px] text-accent-gold/40 hover:text-accent-gold transition-colors flex items-center gap-1"
                >
                  <i className="fas fa-ruler" />
                  {isEnglish ? "Size Guide" : "دليل المقاسات"}
                </button>
              </div>
              <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-2xl bg-accent-gold text-surface-primary font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent-gold/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? (
                  <><i className="fas fa-check" />{isEnglish ? "Added!" : "تمت الإضافة!"}</>
                ) : (
                  <><i className="fas fa-shopping-bag" />{isEnglish ? "Add to Cart" : "أضف للسلة"}</>
                )}
              </motion.button>
              <motion.button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-2xl border border-accent-gold/30 text-accent-gold font-bold text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEnglish ? "Buy Now" : "اشتر الآن"}
              </motion.button>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-accent-gold/30">
              <span className="flex items-center gap-1"><i className="fas fa-truck text-accent-gold/40" />{isEnglish ? "Free Shipping" : "شحن مجاني"}</span>
              <span className="flex items-center gap-1"><i className="fas fa-rotate-left text-accent-gold/40" />{isEnglish ? "7-Day Returns" : "إرجاع 7 أيام"}</span>
              <span className="flex items-center gap-1"><i className="fas fa-shield text-accent-gold/40" />{isEnglish ? "COD" : "دفع عند الاستلام"}</span>
            </div>

            <div className="pt-4 border-t border-border space-y-4">
              <div>
                <h3 className="text-xs font-bold text-content-secondary mb-2">{isEnglish ? "Details" : "التفاصيل"}</h3>
                <p className="text-xs text-accent-gold/40 leading-relaxed">{isEnglish ? product.englishDetails : product.details}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-content-secondary mb-2">{isEnglish ? "Shipping & Returns" : "الشحن والإرجاع"}</h3>
                <ul className="space-y-2 text-xs text-accent-gold/40">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-truck text-accent-gold/60 text-[8px]" />
                    {isEnglish ? product.englishShipping : product.shipping}
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-rotate-left text-accent-gold/60 text-[8px]" />
                    {isEnglish ? "Free returns within 7 days" : "إرجاع مجاني خلال 7 أيام"}
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-shield text-accent-gold/60 text-[8px]" />
                    {isEnglish ? "Cash on delivery available" : "الدفع عند الاستلام متوفر"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-border">
            <h2 className={`text-xl font-bold mb-6 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish ? "You May Also Like" : "قد يعجبك أيضاً"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block glass-card rounded-xl overflow-hidden hover:border-accent-gold-muted transition-all" style={{ textDecoration: "none" }}>
                  <div className="relative aspect-[3/4] bg-surface-primary overflow-hidden">
                    <Image src={p.colors[0]?.images[0] || ""} alt={isEnglish ? p.englishTitle : p.title} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                  </div>
                  <div className="p-2.5 space-y-1">
                    <div className="relative">
                      <p className={`text-xs font-bold line-clamp-2 ${isEnglish ? "font-inter" : "font-alexandria"}`}>{isEnglish ? p.englishTitle : p.title}</p>
                      <div className="title-tooltip">
                        <p className={`text-xs font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>{isEnglish ? p.englishTitle : p.title}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-accent-gold/40">{p.basePrice} {isEnglish ? "JD" : "د.أ"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {recentProducts.length > 0 && (
          <section className="mt-12 pt-10 border-t border-border">
            <h2 className={`text-xl font-bold mb-6 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              <i className="fas fa-clock-rotate text-accent-gold/40 mr-2" />
              {isEnglish ? "Recently Viewed" : "مُشاهَد مؤخراً"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentProducts.map((p) => (
                <Link key={p!.id} href={`/product/${p!.id}`} className="group block glass-card rounded-xl overflow-hidden hover:border-accent-gold-muted transition-all" style={{ textDecoration: "none" }}>
                  <div className="relative aspect-[3/4] bg-surface-primary overflow-hidden">
                    <Image src={p!.colors[0]?.images[0] || ""} alt={isEnglish ? p!.englishTitle : p!.title} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                  </div>
                  <div className="p-2.5 space-y-1">
                    <div className="relative">
                      <p className={`text-xs font-bold line-clamp-2 ${isEnglish ? "font-inter" : "font-alexandria"}`}>{isEnglish ? p!.englishTitle : p!.title}</p>
                      <div className="title-tooltip">
                        <p className={`text-xs font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>{isEnglish ? p!.englishTitle : p!.title}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-accent-gold/40">{p!.basePrice} {isEnglish ? "JD" : "د.أ"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-black/80 backdrop-blur-xl border-t border-border p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className={`font-bold text-sm truncate ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish ? product.englishTitle : product.title}
            </p>
            <p className="text-accent-gold font-bold text-sm">
              {finalPrice} {isEnglish ? "JD" : "د.أ"}
            </p>
          </div>
          <motion.button
            onClick={handleAddToCart}
            className="px-8 py-3 rounded-xl bg-accent-gold text-surface-primary font-bold text-xs whitespace-nowrap"
            whileTap={{ scale: 0.95 }}
          >
            {addedToCart ? <><i className="fas fa-check ml-1" />{isEnglish ? "Done" : "تم"}</> : <><i className="fas fa-shopping-bag ml-1" />{isEnglish ? "Add" : "أضف"}</>}
          </motion.button>
        </div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} isEnglish={isEnglish} />
      <BackToTop />
      <Footer isEnglish={isEnglish} />
    </div>
  );
}
