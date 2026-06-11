"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 bottom-0 z-50 w-full max-w-md bg-black/90 backdrop-blur-xl border-r border-white/10 flex flex-col"
            style={{ left: 0 }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            dir={isEnglish ? "ltr" : "rtl"}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Shopping Cart" : "سلة التسوق"}
                <span className="text-luxury-gold/60 mr-2 text-xs">({items.length})</span>
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-white/5 transition-all"
              >
                <i className="fas fa-times text-sm" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <i className="fas fa-shopping-bag text-4xl text-luxury-gold/20 block" />
                  <p className="text-sm text-luxury-gold/40">
                    {isEnglish ? "Your cart is empty" : "سلتك فارغة"}
                  </p>
                  <button onClick={closeCart} className="btn-primary text-xs px-6 py-3">
                    {isEnglish ? "Start Shopping" : "تسوق الآن"}
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex gap-3 p-3 rounded-2xl bg-white/5 border border-white/5"
                  >
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-luxury-black flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className={`text-xs font-bold truncate ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                        {isEnglish ? item.englishTitle : item.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-luxury-gold/40">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ background: item.colorHex }} />
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
                            className="w-6 h-6 rounded-lg border border-white/10 text-luxury-gold/60 hover:text-luxury-gold hover:bg-white/5 transition-all text-xs flex items-center justify-center"
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <span className="text-xs font-bold text-luxury-gold w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, 1)}
                            className="w-6 h-6 rounded-lg border border-white/10 text-luxury-gold/60 hover:text-luxury-gold hover:bg-white/5 transition-all text-xs flex items-center justify-center"
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-luxury-gold">
                            {item.price * item.quantity} {isEnglish ? "JD" : "د.أ"}
                          </span>
                          <button
                            onClick={() => {
                              removeItem(item.productId, item.size, item.color);
                              addToast("info", isEnglish ? "Item removed" : "تمت إزالة المنتج", "fa-trash");
                            }}
                            className="w-6 h-6 rounded-lg border border-white/10 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all text-xs flex items-center justify-center"
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-white/10 space-y-3">
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

                <div className="flex items-center justify-between text-sm">
                  <span className="text-luxury-gold/60">{isEnglish ? "Subtotal" : "المجموع"}</span>
                  <span className="font-bold text-luxury-gold">{subtotal} {isEnglish ? "JD" : "د.أ"}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400/80">{isEnglish ? "Discount (20%)" : "الخصم (20%)"}</span>
                    <span className="text-green-400 font-bold">-{(subtotal - discountedSubtotal).toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                  </div>
                )}

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-sm border-t border-white/10 pt-2">
                    <span className="font-bold">{isEnglish ? "Total after discount" : "المجموع بعد الخصم"}</span>
                    <span className="font-bold text-[#C9A84C]">{discountedSubtotal.toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                  </div>
                )}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3.5 rounded-xl bg-luxury-gold text-luxury-black font-bold text-xs text-center tracking-wide"
                >
                  {isEnglish ? "Proceed to Checkout" : "إتمام الطلب"}
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full py-2 text-[10px] text-luxury-gold/40 hover:text-luxury-gold/60 transition-colors"
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
