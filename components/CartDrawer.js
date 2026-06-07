"use client";

import Image from "next/image";

export default function CartDrawer({
  isOpen,
  isEnglish,
  cart,
  promoInput,
  appliedPromo: promoCode,
  cartSubtotal,
  cartDiscountAmount,
  cartTotalPrice,
  cartCount,
  onClose,
  onSetPromoInput,
  onApplyPromo,
  onChangeQty,
  onRemoveItem,
  onProceedCheckout
}) {
  if (!isOpen) return null;

  const discountPct = promoCode
    ? (["JORDAN", "SK10", "WELCOME10"].includes(promoCode.toUpperCase()) ? 10 : 0)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] flex flex-col shadow-2xl animate-slide-in-right pb-safe">
          <div className="h-16 md:h-20 border-b border-[var(--border-subtle)] px-4 md:px-6 flex items-center justify-between pt-safe">
            <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              {isEnglish ? "Shopping Bag" : "حقيبة التسوق"} <span className="text-gold font-extrabold font-mono text-sm">({cartCount})</span>
            </h3>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition active:scale-90 min-touch-target" aria-label={isEnglish ? "Close cart" : "إغلاق السلة"}>
              <i className="fas fa-times text-sm" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-dim)] text-2xl">
                  <i className="fas fa-shopping-bag" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[var(--text-primary)] text-sm">{isEnglish ? "Your bag is currently empty" : "حقيبتك فارغة حالياً"}</h4>
                  <p className="text-xs text-[var(--text-dim)]">{isEnglish ? "Add some luxury items to your shopping." : "أضف بعض القطع الفاخرة لتسوقك."}</p>
                </div>
                <button onClick={onClose} className="px-8 py-3.5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-primary)] rounded-xl text-xs font-semibold border border-[var(--border-light)] transition active:scale-95 min-touch-target">
                  {isEnglish ? "Start Shopping" : "ابدأ التسوق"}
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 md:gap-4 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl p-3 md:p-4 relative">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                    <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h4 className="font-bold text-[var(--text-primary)] text-xs md:text-sm truncate">{item.title}</h4>
                    <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-light">
                      {isEnglish ? "Size" : "المقاس"}: {item.size} | {isEnglish ? "Color" : "اللون"}: {item.color}
                    </p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => onChangeQty(idx, -1)} className="w-8 h-8 md:w-7 md:h-7 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] flex items-center justify-center text-xs active:scale-90 transition min-touch-target">
                        <i className="fas fa-minus" />
                      </button>
                      <span className="text-xs font-bold text-[var(--text-primary)] w-5 text-center font-mono">{item.quantity}</span>
                      <button onClick={() => onChangeQty(idx, 1)} className="w-8 h-8 md:w-7 md:h-7 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] flex items-center justify-center text-xs active:scale-90 transition min-touch-target">
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end h-full self-stretch shrink-0">
                    <button onClick={() => onRemoveItem(idx)} className="text-[var(--text-dim)] hover:text-red-400 transition text-sm active:scale-90" title={isEnglish ? "Remove" : "حذف"}>
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

          {cart.length > 0 && (
            <div className="border-t border-[var(--border-subtle)] p-6 bg-[var(--bg-subtle)] space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={isEnglish ? "Discount code (e.g. SK10)" : "رمز الخصم (مثال: SK10)"}
                  value={promoInput}
                  onChange={(e) => onSetPromoInput(e.target.value)}
                  className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl px-4 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:border-gold/30"
                />
                <button onClick={onApplyPromo} className="px-5 py-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-primary)] border border-[var(--border-light)] rounded-xl text-xs font-semibold transition active:scale-90 min-touch-target">
                  {isEnglish ? "Apply" : "تطبيق"}
                </button>
              </div>

              <div className="space-y-2 text-xs text-[var(--text-muted)]">
                <div className="flex justify-between">
                  <span>{isEnglish ? "Subtotal:" : "المجموع الفرعي:"}</span>
                  <span className="font-bold text-[var(--text-primary)] font-mono">{cartSubtotal.toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                </div>

                {promoCode && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{isEnglish ? "Discount:" : "الخصم:"} ({discountPct}% - {promoCode}):</span>
                    <span className="font-bold font-mono">-{cartDiscountAmount.toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                  </div>
                )}

                <div className="h-px bg-[var(--border-subtle)] my-1" />

                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-primary)] font-bold">{isEnglish ? "Total Price:" : "المجموع الإجمالي:"}</span>
                  <span className="font-extrabold text-gold font-mono">{cartTotalPrice.toFixed(2)} {isEnglish ? "JD" : "د.أ"}</span>
                </div>
              </div>

              <button
                onClick={onProceedCheckout}
                className="w-full py-4 bg-gold hover:bg-gold/90 text-black font-bold rounded-xl text-sm transition duration-300 transform active:scale-95 shadow-lg shadow-gold/10 flex items-center justify-center gap-2"
              >
                {isEnglish ? "Proceed to Checkout" : "الذهاب للدفع"} <i className="fas fa-credit-card text-xs" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
