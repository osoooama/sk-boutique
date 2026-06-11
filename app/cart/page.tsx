"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import ToastContainer from "@/components/ui/ToastContainer";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function CartPage() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { items, removeItem, updateQuantity, subtotal, clearCart, discountCode, discountPercent, discountedSubtotal, applyDiscount, removeDiscount } = useCart();
  const { addToast } = useToast();
  const [discountInput, setDiscountInput] = useState("");

  const handleApplyDiscount = () => {
    if (!discountInput.trim()) return;
    if (applyDiscount(discountInput.trim())) {
      addToast("success", isEnglish ? "Discount applied — 20% off!" : "تم تطبيق الخصم — خصم 20%!", "fa-tag");
      setDiscountInput("");
    } else {
      addToast("error", isEnglish ? "Invalid discount code" : "رمز خصم غير صالح", "fa-times");
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] ${isEnglish ? "font-inter" : "font-alexandria"}`} dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((p) => !p)}
        onToggleTheme={toggleTheme}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <CartDrawer isEnglish={isEnglish} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} isEnglish={isEnglish} />
      <ToastContainer />
      <BackToTop />

      <main className="pt-28 pb-20 section-padding max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { label: isEnglish ? "Home" : "الرئيسية", href: "/" },
            { label: isEnglish ? "Shop" : "المتجر", href: "/shop" },
            { label: isEnglish ? "Cart" : "سلة التسوق" },
          ]}
          isEnglish={isEnglish}
        />

        <h1 className={`text-2xl font-bold mb-8 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
          {isEnglish ? "Shopping Cart" : "سلة التسوق"}
          {items.length > 0 && <span className="text-luxury-gold/40 text-sm mr-2">({items.length})</span>}
        </h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 space-y-6"
          >
            <i className="fas fa-shopping-bag text-5xl text-luxury-gold/20 block" />
            <p className="text-sm text-luxury-gold/40">
              {isEnglish ? "Your cart is empty" : "سلتك فارغة"}
            </p>
            <Link href="/shop" className="btn-primary text-xs px-8 py-3.5 inline-block">
              {isEnglish ? "Browse Collection" : "تصفح المجموعة"}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                    className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <Link href={`/product/${item.productId}`} className="w-20 h-24 rounded-xl overflow-hidden bg-luxury-black flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <Link href={`/product/${item.productId}`} className={`text-sm font-bold truncate block hover:text-luxury-gold transition-colors ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                        {isEnglish ? item.englishTitle : item.title}
                      </Link>
                      <div className="flex items-center gap-3 text-[11px] text-luxury-gold/40">
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: item.colorHex }} />
                          {item.color}
                        </span>
                        <span>{item.size}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl p-1">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeItem(item.productId, item.size, item.color);
                                addToast("info", isEnglish ? "Item removed" : "تمت إزالة المنتج", "fa-trash");
                              } else {
                                updateQuantity(item.productId, item.size, item.color, -1);
                              }
                            }}
                            className="w-7 h-7 rounded-lg hover:bg-white/5 text-luxury-gold/60 hover:text-luxury-gold transition-all text-xs flex items-center justify-center"
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <span className="text-xs font-bold text-luxury-gold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, 1)}
                            className="w-7 h-7 rounded-lg hover:bg-white/5 text-luxury-gold/60 hover:text-luxury-gold transition-all text-xs flex items-center justify-center"
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-luxury-gold">
                            {item.price * item.quantity} {isEnglish ? "JD" : "د.أ"}
                          </span>
                          <button
                            onClick={() => {
                              removeItem(item.productId, item.size, item.color);
                              addToast("info", isEnglish ? "Item removed" : "تمت إزالة المنتج", "fa-trash");
                            }}
                            className="w-7 h-7 rounded-lg border border-white/10 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all text-xs flex items-center justify-center"
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="sticky top-28 space-y-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <h3 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Order Summary" : "ملخص الطلب"}
              </h3>

              {/* Discount Code */}
              {discountCode ? (
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[#C9A84C]/20">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-tag text-[#C9A84C] text-xs" />
                    <span className="text-xs font-bold text-[#C9A84C]">SK30</span>
                    <span className="text-[10px] text-luxury-gold/60">-20%</span>
                  </div>
                  <button onClick={removeDiscount} className="text-[10px] text-red-400/60 hover:text-red-400 transition-colors">
                    <i className="fas fa-times" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyDiscount()}
                    placeholder={isEnglish ? "Discount code" : "رمز الخصم"}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-luxury-white placeholder:text-luxury-gold/30 outline-none focus:border-[#C9A84C]/30 transition-all"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="px-3 py-2 rounded-xl bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold hover:bg-[#C9A84C]/30 transition-all"
                  >
                    {isEnglish ? "Apply" : "تطبيق"}
                  </button>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-luxury-gold/60">
                  <span>{isEnglish ? "Subtotal" : "المجموع الفرعي"}</span>
                  <span>{subtotal} {isEnglish ? "JD" : "د.أ"}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-green-400/80">
                    <span>{isEnglish ? "Discount (20%)" : "الخصم (20%)"}</span>
                    <span className="font-bold text-green-400">-{(subtotal - discountedSubtotal).toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-luxury-gold/60">
                  <span>{isEnglish ? "Shipping" : "الشحن"}</span>
                  <span className="text-green-400/60">{isEnglish ? "Free" : "مجاني"}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex items-center justify-between font-bold text-sm">
                  <span>{isEnglish ? "Total" : "المجموع"}</span>
                  <span className="text-luxury-gold">{discountedSubtotal} {isEnglish ? "JD" : "د.أ"}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full py-3.5 rounded-xl bg-luxury-gold text-luxury-black font-bold text-xs text-center tracking-wide"
              >
                {isEnglish ? "Proceed to Checkout" : "إتمام الطلب"}
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  addToast("info", isEnglish ? "Cart cleared" : "تم إفراغ السلة", "fa-trash");
                }}
                className="block w-full py-2 text-[10px] text-red-400/40 hover:text-red-400 transition-colors text-center"
              >
                <i className="fas fa-trash mr-1" />
                {isEnglish ? "Clear Cart" : "إفراغ السلة"}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
