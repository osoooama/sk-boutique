"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { springs } from "@/lib/springs";
import Link from "next/link";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import { hapticMedium } from "@/lib/haptics";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import Toast from "@/components/Toast/Toast";
import ColorSwatches from "@/components/product/ColorSwatches";
import SizeSelector from "@/components/product/SizeSelector";
import ImageTouchSlider from "@/components/product/ImageTouchSlider";
import BottomSheet from "@/components/BottomSheet";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SizeGuideModal from "@/components/ui/SizeGuideModal";
import BackToTop from "@/components/ui/BackToTop";
import { useTheme } from "@/context/ThemeContext";
import { useProducts } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/Toast/ToastContext";
import CurrencyPopup from "@/components/CurrencyPopup";

const RECENT_KEY = "sk_recently_viewed";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [sheetQuantity, setSheetQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [gestureX, setGestureX] = useState(0);
  const gestureStart = useRef(0);

  const handleGestureStart = useCallback((e: React.TouchEvent) => {
    if (e.touches[0].clientX < 40) {
      gestureStart.current = e.touches[0].clientX;
    } else {
      gestureStart.current = 0;
    }
  }, []);

  const handleGestureMove = useCallback((e: React.TouchEvent) => {
    if (!gestureStart.current) return;
    const dx = e.touches[0].clientX - gestureStart.current;
    if (dx > 0) setGestureX(dx);
  }, []);

  const handleGestureEnd = useCallback(() => {
    if (gestureX > 80) {
      router.back();
    }
    setGestureX(0);
    gestureStart.current = 0;
  }, [gestureX, router]);

  const { products } = useProducts();
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
      <div className="min-h-screen flex items-center justify-center">
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
    <div
      className="min-h-screen"
      dir={isEnglish ? "ltr" : "rtl"}
      onTouchStart={handleGestureStart}
      onTouchMove={handleGestureMove}
      onTouchEnd={handleGestureEnd}
    >
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
            <div className="relative">
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
                <i className="fas fa-heart text-sm" />
              </button>

              {images.length > 0 ? (
                <ImageTouchSlider key={activeColor?.name || "default"} images={images} alt={isEnglish ? product.englishTitle : product.title} productId={product.id} />
              ) : (
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-card bg-surface-primary flex items-center justify-center">
                  <i className="fas fa-tshirt text-6xl text-accent-gold/20" />
                </div>
              )}
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
          </div>

          <div className="space-y-6 md:sticky md:top-28 md:self-start">
            <div className="space-y-3">
              <h1 className={`text-2xl md:text-4xl font-bold leading-tight ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? product.englishTitle : product.title}
              </h1>
              <div className="flex items-center gap-4">
                <CurrencyPopup price={finalPrice}>
                  <span className="text-2xl md:text-3xl font-bold text-accent-gold">
                    {finalPrice} {isEnglish ? "JD" : "د.أ"}
                  </span>
                </CurrencyPopup>
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
                <div className="flex items-center gap-2.5 flex-wrap">
                  <ColorSwatches
                    colors={product.colors.slice(0, 2)}
                    selectedColor={selectedColor || product.colors[0].name}
                    onColorChange={(name) => { setSelectedColor(name); setSelectedImage(0); }}
                    isEnglish={isEnglish}
                  />
                  {product.colors.length > 2 && (
                    <span className="text-[10px] text-accent-gold/50">
                      +{product.colors.length - 2} {isEnglish ? "more" : "أخرى"}
                    </span>
                  )}
                </div>
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
                whileHover={{ scale: 1.02, transition: springs.gentle }}
                whileTap={{ scale: 0.95, transition: springs.snappy }}
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
                whileHover={{ scale: 1.02, transition: springs.gentle }}
                whileTap={{ scale: 0.95, transition: springs.snappy }}
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
            onClick={() => { setSheetQuantity(1); setSelectedSize(product.sizes[0] || ""); setBottomSheetOpen(true); }}
            className="px-8 py-3 rounded-xl bg-accent-gold text-surface-primary font-bold text-xs whitespace-nowrap"
            whileTap={{ scale: 0.95, transition: springs.snappy }}
          >
            <i className="fas fa-shopping-bag ml-1" />{isEnglish ? "Add" : "أضف"}
          </motion.button>
        </div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} isEnglish={isEnglish} />
      <BottomSheet isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-surface-primary flex-shrink-0">
              {images[0] && (
                <Image src={images[0]} alt={isEnglish ? product.englishTitle : product.title} fill sizes="64px" className="object-cover" />
              )}
            </div>
            <div className="min-w-0">
              <p className={`font-bold text-sm line-clamp-1 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? product.englishTitle : product.title}
              </p>
              <p className="text-accent-gold font-bold text-sm mt-1">
                {finalPrice} {isEnglish ? "JD" : "د.أ"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-content-secondary mb-2">{isEnglish ? "Color" : "اللون"}</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.slice(0, 2).map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setSelectedColor(c.name); setSelectedImage(0); }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    (selectedColor || product.colors[0].name) === c.name ? "border-accent-gold scale-110" : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={isEnglish ? c.englishName : c.name}
                />
              ))}
              {product.colors.length > 2 && (
                <span className="text-[10px] text-accent-gold/50 self-center">
                  +{product.colors.length - 2}
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-content-secondary mb-2">{isEnglish ? "Size" : "المقاس"}</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-9 rounded-lg text-xs font-bold border transition-all ${
                    (selectedSize || product.sizes[0]) === s
                      ? "border-accent-gold bg-accent-gold-muted text-accent-gold"
                      : "border-border text-accent-gold/60 hover:border-accent-gold/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-content-secondary mb-2">{isEnglish ? "Quantity" : "الكمية"}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSheetQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg border border-border text-accent-gold flex items-center justify-center text-sm"
              >
                <i className="fas fa-minus text-xs" />
              </button>
              <span className="w-8 text-center font-bold text-sm">{sheetQuantity}</span>
              <button
                onClick={() => setSheetQuantity((q) => Math.min(10, q + 1))}
                className="w-9 h-9 rounded-lg border border-border text-accent-gold flex items-center justify-center text-sm"
              >
                <i className="fas fa-plus text-xs" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              onClick={() => {
                hapticMedium();
                const size = selectedSize || product.sizes[0];
                if (!size || !activeColor) return;
                for (let i = 0; i < sheetQuantity; i++) {
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
                }
                setAddedToCart(true);
                addToast("success", isEnglish ? "Added to cart!" : "أضيف للسلة!", "fa-check");
                setTimeout(() => setAddedToCart(false), 2000);
                setBottomSheetOpen(false);
              }}
              className="flex-1 py-3.5 rounded-2xl text-surface-primary font-bold text-sm"
              style={{ background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover))" }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-shopping-bag ml-2" />{isEnglish ? "Add to Cart" : "أضف للسلة"}
            </motion.button>
            <motion.button
              onClick={() => {
                toggleItem(product.id);
                addToast("success", isEnglish ? "Added to wishlist" : "أضيف للمفضلة!", "fa-heart");
                setBottomSheetOpen(false);
              }}
              className="py-3.5 px-5 rounded-2xl border border-accent-gold/30 text-accent-gold font-bold text-sm"
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-heart" />
            </motion.button>
          </div>
        </div>
      </BottomSheet>
      <BackToTop />
      <Footer isEnglish={isEnglish} />
    </div>
  );
}
