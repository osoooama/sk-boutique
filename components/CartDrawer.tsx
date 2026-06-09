"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  isEnglish: boolean;
  onClose: () => void;
  onProceedCheckout: () => void;
}

const PHONE = "962798921123";

export default function CartDrawer({ isOpen, isEnglish, onClose, onProceedCheckout }: CartDrawerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { items, count, subtotal, discountAmount, total, appliedPromo, promoInput, setPromoInput, changeQty, removeItem, applyPromo } = useCart();

  const waMsg = encodeURIComponent(
    isEnglish
      ? `Hi SK BOUTIQUE! I'd like to order:\n${items.map((i) => `- ${i.title} (${i.size}, ${i.color}) x${i.quantity} = ${i.price * i.quantity} JD`).join("\n")}\nTotal: ${total.toFixed(2)} JD`
      : `مرحباً SK BOUTIQUE! أود طلب:\n${items.map((i) => `- ${i.title} (${i.size}، ${i.color}) x${i.quantity} = ${i.price * i.quantity} د.أ`).join("\n")}\nالمجموع: ${total.toFixed(2)} د.أ`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={shouldReduceMotion ? false : { x: "100%" }}
            animate={shouldReduceMotion ? undefined : { x: 0 }}
            exit={shouldReduceMotion ? undefined : { x: "100%" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 end-0 max-w-full flex"
          >
            <div
              className="w-screen max-w-md flex flex-col shadow-2xl pb-safe backdrop-blur-2xl"
              style={{
                background: "var(--bg-glass)",
                borderInlineStart: "1px solid var(--border-light)",
              }}
            >
              {/* ─── Header ─── */}
              <div
                className="flex items-center justify-between px-5 pt-5 pb-4 border-b min-touch-target"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <h3 className="text-base md:text-lg font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  {isEnglish ? "Shopping Bag" : "حقيبة التسوق"}
                  {count > 0 && (
                    <span className="text-gold font-extrabold font-mono text-sm">({count})</span>
                  )}
                </h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 active:scale-90 border min-touch-target"
                  style={{
                    background: "var(--bg-subtle)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-muted)",
                  }}
                  aria-label={isEnglish ? "Close" : "إغلاق"}
                >
                  <i className="fas fa-times text-sm" />
                </button>
              </div>

              {/* ─── Items ─── */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 apple-modal-scroll">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl border"
                      style={{
                        background: "var(--bg-subtle)",
                        borderColor: "var(--border-light)",
                        color: "var(--text-dim)",
                      }}
                    >
                      <i className="fas fa-shopping-bag" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                        {isEnglish ? "Your bag is empty" : "حقيبتك فارغة"}
                      </h4>
                      <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                        {isEnglish ? "Add some luxury pieces to your collection." : "أضف بعض القطع الفاخرة إلى تسوقك."}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-8 py-3.5 rounded-xl text-xs font-semibold border transition active:scale-95 min-touch-target"
                      style={{
                        background: "var(--bg-subtle)",
                        borderColor: "var(--border-light)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {isEnglish ? "Browse Collection" : "تصفح المجموعة"}
                    </button>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex items-center gap-3 rounded-2xl p-3 border"
                      style={{
                        background: "var(--bg-subtle)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      {/* Image */}
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0" style={{ background: "var(--bg-tertiary)" }}>
                        <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <h4 className="font-bold text-xs md:text-sm truncate" style={{ color: "var(--text-primary)" }}>
                          {item.title}
                        </h4>
                        <p className="text-[10px] md:text-xs font-light" style={{ color: "var(--text-muted)" }}>
                          {isEnglish ? "Size" : "المقاس"}: {item.size}
                          {item.color ? ` | ${item.color}` : ""}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => changeQty(idx, -1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] border transition active:scale-90 min-touch-target"
                            style={{
                              background: "var(--bg-subtle)",
                              borderColor: "var(--border-subtle)",
                              color: "var(--text-muted)",
                            }}
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <span className="text-xs font-bold w-5 text-center font-mono" style={{ color: "var(--text-primary)" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => changeQty(idx, 1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] border transition active:scale-90 min-touch-target"
                            style={{
                              background: "var(--bg-subtle)",
                              borderColor: "var(--border-subtle)",
                              color: "var(--text-muted)",
                            }}
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-[var(--text-dim)] hover:text-red-400 transition text-xs active:scale-90"
                          aria-label={isEnglish ? "Remove" : "حذف"}
                        >
                          <i className="far fa-trash-alt" />
                        </button>
                        <span className="font-bold text-gold text-xs md:text-sm font-mono">
                          {item.price * item.quantity} {isEnglish ? "JD" : "د.أ"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* ─── Footer ─── */}
              {items.length > 0 && (
                <div
                  className="px-5 py-4 space-y-3 border-t backdrop-blur-sm"
                  style={{ borderColor: "var(--border-subtle)", background: "var(--bg-subtle)" }}
                >
                  {/* Promo Code */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder={isEnglish ? "Discount code (e.g. SK10)" : "رمز الخصم (مثال: SK10)"}
                      className="flex-1 rounded-xl px-4 py-2.5 text-xs outline-none border transition"
                      style={{
                        background: "var(--bg-primary)",
                        borderColor: "var(--border-light)",
                        color: "var(--text-primary)",
                      }}
                      onKeyDown={(e) => { if (e.key === "Enter") applyPromo(); }}
                    />
                    <button
                      onClick={() => applyPromo()}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold border transition active:scale-90 min-touch-target"
                      style={{
                        background: "var(--bg-subtle)",
                        borderColor: "var(--border-light)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {isEnglish ? "Apply" : "تطبيق"}
                    </button>
                  </div>

                  {/* Totals */}
                  <div className="space-y-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                    <div className="flex justify-between">
                      <span>{isEnglish ? "Subtotal:" : "المجموع الفرعي:"}</span>
                      <span className="font-bold font-mono" style={{ color: "var(--text-primary)" }}>
                        {subtotal.toFixed(2)} {isEnglish ? "JD" : "د.أ"}
                      </span>
                    </div>

                    {appliedPromo && discountAmount > 0 && (
                      <div className="flex justify-between" style={{ color: "var(--gold)" }}>
                        <span>
                          {isEnglish ? "Discount" : "الخصم"} ({appliedPromo}):
                        </span>
                        <span className="font-bold font-mono">-{discountAmount.toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                      </div>
                    )}

                    <div className="h-px my-1" style={{ background: "var(--border-subtle)" }} />

                    <div className="flex justify-between text-sm">
                      <span className="font-bold" style={{ color: "var(--text-primary)" }}>
                        {isEnglish ? "Total:" : "المجموع:"}
                      </span>
                      <span className="font-extrabold text-gold font-mono">
                        {total.toFixed(2)} {isEnglish ? "JD" : "د.أ"}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Checkout */}
                  <a
                    href={`https://wa.me/${PHONE}?text=${waMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-gradient-to-r from-gold to-gold/90 text-black font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-lg min-touch-target"
                    style={{ boxShadow: "0 4px 20px rgba(201, 168, 76, 0.25)" }}
                    onClick={() => { setTimeout(onClose, 300); }}
                  >
                    <i className="fab fa-whatsapp text-sm" />
                    {isEnglish ? "Order via WhatsApp" : "اطلب عبر واتساب"}
                  </a>

                  {/* Checkout Button */}
                  <button
                    onClick={onProceedCheckout}
                    className="w-full py-3 rounded-xl text-xs font-semibold border transition active:scale-95 min-touch-target"
                    style={{
                      background: "var(--bg-subtle)",
                      borderColor: "var(--border-light)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {isEnglish ? "Continue Shopping" : "متابعة التسوق"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
