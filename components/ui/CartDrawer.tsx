"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast/ToastContext";

interface CartDrawerProps {
  isEnglish: boolean;
}

export default function CartDrawer({ isEnglish }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, discountCode, discountPercent, discountedSubtotal, applyDiscount, removeDiscount } = useCart();
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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 bottom-0 z-50 w-full max-w-md bg-surface-primary backdrop-blur-xl border-l border-border flex flex-col"
            style={{ right: 0 }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            dir={isEnglish ? "ltr" : "rtl"}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Shopping Cart" : "سلة التسوق"}
                <span className="text-accent-gold/60 mr-2 text-xs">({items.length})</span>
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-border text-accent-gold hover:bg-accent-gold-muted transition-all"
              >
                <i className="fas fa-times text-sm" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <i className="fas fa-shopping-bag text-4xl text-accent-gold/20 block" />
                  <p className="text-sm text-accent-gold/40">
                    {isEnglish ? "Your cart is empty" : "سلتك فارغة"}
                  </p>
                  <button onClick={closeCart} className="btn-primary text-xs px-6 py-3">
                    {isEnglish ? "Start Shopping" : "تسوق الآن"}
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      layout
                      initial={{ height: 0, opacity: 0, x: 100 }}
                      animate={{ height: "auto", opacity: 1, x: 0 }}
                      exit={{ height: 0, opacity: 0, x: 100 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-3 p-3 rounded-2xl bg-accent-gold-muted border border-border overflow-hidden"
                    >
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-surface-primary flex-shrink-0 relative">
                        <Image src={item.image} alt={isEnglish ? item.englishTitle : item.title} fill sizes="80px" className="object-cover" loading="lazy" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="relative">
                          <p className={`text-xs font-bold line-clamp-2 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                            {isEnglish ? item.englishTitle : item.title}
                          </p>
                          <div className="title-tooltip">
                            <p className={`text-xs font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                              {isEnglish ? item.englishTitle : item.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-accent-gold/40">
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full border border-border-strong" style={{ background: item.colorHex }} />
                            {item.color}
                          </span>
                          <span>{item.size}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  removeItem(item.productId, item.size, item.color);
                                  addToast("info", isEnglish ? "Item removed" : "تمت إزالة المنتج", "fa-trash");
                                } else {
                                  updateQuantity(item.productId, item.size, item.color, -1);
                                }
                              }}
                              className="w-6 h-6 rounded-lg border border-border text-accent-gold/60 hover:text-accent-gold hover:bg-accent-gold-muted transition-all text-xs flex items-center justify-center"
                            >
                              <i className="fas fa-minus" />
                            </button>
                            <div className="relative w-5 text-center overflow-hidden">
                              <AnimatePresence mode="popLayout">
                                <motion.span
                                  key={item.quantity}
                                  className="text-xs font-bold text-accent-gold block"
                                  initial={{ y: item.quantity > 1 ? -10 : 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: item.quantity > 1 ? 10 : -10, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {item.quantity}
                                </motion.span>
                              </AnimatePresence>
                            </div>
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.color, 1)}
                              className="w-6 h-6 rounded-lg border border-border text-accent-gold/60 hover:text-accent-gold hover:bg-accent-gold-muted transition-all text-xs flex items-center justify-center"
                            >
                              <i className="fas fa-plus" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-accent-gold">
                              {item.price * item.quantity} {isEnglish ? "JD" : "د.أ"}
                            </span>
                            <button
                              onClick={() => {
                                removeItem(item.productId, item.size, item.color);
                                addToast("info", isEnglish ? "Item removed" : "تمت إزالة المنتج", "fa-trash");
                              }}
                              className="w-6 h-6 rounded-lg border border-border text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all text-xs flex items-center justify-center"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                {discountCode ? (
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-accent-gold-muted border border-accent-gold-muted">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-tag text-accent-gold text-xs" />
                      <span className="text-xs font-bold text-accent-gold">SK30</span>
                      <span className="text-[10px] text-accent-gold/60">-20%</span>
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
                      className="flex-1 bg-accent-gold-muted border border-border rounded-xl px-3 py-2 text-xs text-content-primary placeholder:text-accent-gold/30 outline-none focus:border-accent-gold/30 transition-all"
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className="px-3 py-2 rounded-xl bg-accent-gold-muted text-accent-gold text-xs font-bold hover:bg-accent-gold/30 transition-all"
                    >
                      {isEnglish ? "Apply" : "تطبيق"}
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-accent-gold/60">{isEnglish ? "Subtotal" : "المجموع"}</span>
                  <motion.span
                    key={subtotal}
                    className="font-bold text-accent-gold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {subtotal} {isEnglish ? "JD" : "د.أ"}
                  </motion.span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400/80">{isEnglish ? "Discount (20%)" : "الخصم (20%)"}</span>
                    <span className="text-green-400 font-bold">-{(subtotal - discountedSubtotal).toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                  </div>
                )}

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-sm border-t border-border pt-2">
                    <span className="font-bold">{isEnglish ? "Total after discount" : "المجموع بعد الخصم"}</span>
                    <span className="font-bold text-accent-gold">{discountedSubtotal.toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                  </div>
                )}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3.5 rounded-xl bg-accent-gold text-content-on-accent font-bold text-xs text-center tracking-wide"
                >
                  {isEnglish ? "Proceed to Checkout" : "إتمام الطلب"}
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full py-2 text-[10px] text-accent-gold/40 hover:text-accent-gold/60 transition-colors"
                >
                  {isEnglish ? "Continue Shopping" : "متابعة التسوق"}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
