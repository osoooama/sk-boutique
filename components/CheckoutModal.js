"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatCardNumber, formatCardExpiry, detectCardType, generateOrderId } from "@/lib/utils";
import { CITIES_AR, CITIES_EN } from "@/data/products";

export default function CheckoutModal({
  isOpen,
  isEnglish,
  cartTotalPrice,
  onClose,
  onOrderSuccess,
  onTriggerConfetti
}) {
  const [step, setStep] = useState(1);
  const [shippingForm, setShippingForm] = useState({ name: "", email: "", phone: "", city: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardForm, setCardForm] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [cardType, setCardType] = useState("generic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState("");
  const [successPayMethod, setSuccessPayMethod] = useState("cod");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setShippingForm({ name: "", email: "", phone: "", city: "", address: "" });
        setPaymentMethod("cod");
        setCardForm({ name: "", number: "", expiry: "", cvv: "" });
        setCardType("generic");
        setIsSubmitting(false);
        setSuccessOrderId("");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardForm((prev) => ({ ...prev, number: formatted }));
    setCardType(detectCardType(e.target.value));
  };

  const handleCardExpiryChange = (e) => {
    const formatted = formatCardExpiry(e.target.value);
    setCardForm((prev) => ({ ...prev, expiry: formatted.slice(0, 5) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (paymentMethod === "card") {
        if (!cardForm.name || !cardForm.number || !cardForm.expiry || !cardForm.cvv) {
          return;
        }
      }
      setIsSubmitting(true);
      const orderId = generateOrderId();
      setSuccessOrderId(orderId);
      setSuccessPayMethod(paymentMethod);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3);
        onOrderSuccess(orderId, paymentMethod);
        onTriggerConfetti();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-3xl overflow-hidden shadow-2xl animate-slide-up flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition z-10">
          <i className="fas fa-times" />
        </button>

        <div className="p-6 md:p-8 border-b border-[var(--border-subtle)] space-y-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)] text-center">
            {isEnglish ? "Checkout" : "إتمام عملية الشراء"}
          </h2>
          <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
            {[
              { label: isEnglish ? "Address" : "العنوان", n: 1 },
              { label: isEnglish ? "Payment" : "الدفع", n: 2 },
              { label: isEnglish ? "Confirmation" : "التأكيد", n: 3 }
            ].map((s, i, arr) => (
              <div key={s.n} className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= s.n ? "bg-gold text-black" : "bg-[var(--bg-subtle)] text-[var(--text-dim)]"}`}>
                  {s.n}
                </div>
                <span className={`text-[10px] font-bold ${step >= s.n ? "text-[var(--text-primary)]" : "text-[var(--text-dim)]"}`}>{s.label}</span>
                {i < arr.length - 1 && <div className={`h-[2px] flex-1 min-w-[20px] ${step >= arr[i + 1].n ? "bg-gold" : "bg-[var(--border-subtle)]"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                {isEnglish ? "Shipping Information" : "معلومات التوصيل"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "ship-name", label: isEnglish ? "Full Name" : "الاسم الكامل", type: "text", placeholder: isEnglish ? "John Doe" : "أحمد الحجايا", value: shippingForm.name, onChange: (v) => setShippingForm((p) => ({ ...p, name: v })) },
                  { id: "ship-email", label: isEnglish ? "Email Address" : "البريد الإلكتروني", type: "email", placeholder: "name@domain.com", value: shippingForm.email, onChange: (v) => setShippingForm((p) => ({ ...p, email: v })) },
                  { id: "ship-phone", label: isEnglish ? "Mobile Number" : "رقم الجوال", type: "tel", placeholder: "07xxxxxxxx", value: shippingForm.phone, onChange: (v) => setShippingForm((p) => ({ ...p, phone: v })) },
                ].map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label htmlFor={field.id} className="text-xs text-[var(--text-muted)] font-medium">
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:border-gold/30"
                    />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <label htmlFor="ship-city" className="text-xs text-[var(--text-muted)] font-medium">
                    {isEnglish ? "Governate" : "المحافظة"} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ship-city"
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm((p) => ({ ...p, city: e.target.value }))}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] outline-none focus:border-gold/30"
                  >
                    <option value="" disabled>{isEnglish ? "Select governate..." : "اختر المحافظة..."}</option>
                    {(isEnglish ? CITIES_EN : CITIES_AR).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="ship-address" className="text-xs text-[var(--text-muted)] font-medium">
                    {isEnglish ? "Detailed Address" : "العنوان التفصيلي"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ship-address"
                    required
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm((p) => ({ ...p, address: e.target.value }))}
                    placeholder={isEnglish ? "Street, neighborhood, near..." : "الشارع، الحي، بالقرب من..."}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:border-gold/30"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold/90 text-black font-bold rounded-xl text-xs transition duration-300 flex items-center justify-center gap-2">
                  {isEnglish ? "Next — Payment" : "التالي — الدفع"} <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-[10px]`} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {isEnglish ? "Payment Method" : "طريقة الدفع"}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { method: "cod", icon: "fa-hand-holding-dollar", label: isEnglish ? "Cash on Delivery" : "الدفع عند الاستلام" },
                  { method: "card", icon: "fa-credit-card", label: isEnglish ? "Credit Card" : "بطاقة ائتمانية" }
                ].map((opt) => (
                  <button
                    key={opt.method}
                    type="button"
                    onClick={() => setPaymentMethod(opt.method)}
                    className={`flex flex-col items-center gap-2.5 p-5 border rounded-2xl transition duration-300 ${
                      paymentMethod === opt.method ? "bg-gold/5 border-gold text-gold" : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <i className={`fas ${opt.icon} text-xl`} />
                    <span className="text-xs font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === "cod" ? (
                <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-sm mb-1">
                    <i className="fas fa-shipping-fast" />
                  </div>
                  <h4 className="font-bold text-[var(--text-primary)] text-xs">
                    {isEnglish ? "Cash on Delivery is available for free" : "الدفع عند الاستلام متاح مجاناً"}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                    {isEnglish
                      ? "Pay cash to the delivery agent upon receiving and inspecting your shipment. No extra fees."
                      : "ادفع نقداً لمندوب التوصيل فور استلام شحنتك ومعاينتها. لا توجد رسوم إضافية."}
                  </p>
                </div>
              ) : (
                <div className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="card-name" className="text-xs text-[var(--text-muted)] font-medium">
                      {isEnglish ? "Cardholder Name" : "اسم حامل البطاقة"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      required
                      value={cardForm.name}
                      onChange={(e) => setCardForm((p) => ({ ...p, name: e.target.value.toUpperCase() }))}
                      placeholder="AHMAD AL-NASHMI"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:border-gold/30 font-mono uppercase"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="card-number" className="text-xs text-[var(--text-muted)] font-medium">
                      {isEnglish ? "Card Number" : "رقم البطاقة"} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        id="card-number"
                        required
                        value={cardForm.number}
                        onChange={handleCardNumberChange}
                        placeholder="4000 1234 5678 9010"
                        maxLength="19"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl pl-12 pr-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:border-gold/30 font-mono"
                      />
                      <div className="absolute left-4 text-[var(--text-muted)] text-base flex items-center">
                        {cardType === "visa" && <i className="fab fa-cc-visa text-[#3777bc]" />}
                        {cardType === "mastercard" && <i className="fab fa-cc-mastercard text-[#ff5f00]" />}
                        {cardType === "generic" && <i className="far fa-credit-card" />}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="card-expiry" className="text-xs text-[var(--text-muted)] font-medium">
                        {isEnglish ? "Expiry Date" : "تاريخ الانتهاء"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="card-expiry"
                        required
                        value={cardForm.expiry}
                        onChange={handleCardExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:border-gold/30 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="card-cvv" className="text-xs text-[var(--text-muted)] font-medium">
                        {isEnglish ? "CVV" : "الرمز السري (CVV)"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="card-cvv"
                        required
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                        placeholder="***"
                        maxLength="3"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:border-gold/30 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-primary)] rounded-xl text-xs font-semibold border border-[var(--border-light)] transition duration-300 flex items-center justify-center gap-2">
                  <i className={`fas ${isEnglish ? "fa-arrow-left" : "fa-arrow-right"} text-[10px]`} /> {isEnglish ? "Back" : "الرجوع"}
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3.5 bg-gold hover:bg-gold/90 text-black font-bold rounded-xl text-xs transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin" /> {isEnglish ? "Placing your order..." : "جاري تسجيل طلبك..."}</>
                  ) : (
                    <>{isEnglish ? "Confirm Order & Pay" : "تأكيد الطلب ودفع"} {cartTotalPrice.toFixed(2)} {isEnglish ? "JD" : "د.أ"}</>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <SuccessStep isEnglish={isEnglish} orderId={successOrderId} paymentMethod={successPayMethod} onHome={() => { onClose(); setStep(1); }} />
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessStep({ isEnglish, orderId, paymentMethod, onHome }) {

  return (
    <div className="text-center py-6 space-y-6 animate-fade-in">
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-gold/10 rounded-full scale-125 animate-ping opacity-40" />
        <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-black text-xl shadow-lg shadow-gold/20">
          <i className="fas fa-check" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-[var(--text-primary)] font-cairo">
          {isEnglish ? "Order Submitted Successfully!" : "تم إرسال طلبك بنجاح!"}
        </h3>
        <p className="text-xs text-[var(--text-muted)] font-light max-w-sm mx-auto">
          {isEnglish ? (
            <>Thank you for your trust in <Brand />. We are preparing your luxury package for express delivery.</>
          ) : (
            <>شكراً لثقتك في متجر <Brand />. جاري تجهيز شحنتك الفاخرة للتوصيل بأسرع وقت.</>
          )}
        </p>
      </div>

      <div className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl p-5 max-w-md mx-auto text-start space-y-3">
        <h4 className="text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border-light)] pb-2 flex items-center justify-between">
          <span>{isEnglish ? "Order Details:" : "تفاصيل الطلب:"}</span>
          <span className="text-gold font-mono font-bold text-[10px]">{orderId}</span>
        </h4>
        <ul className="text-xs text-[var(--text-muted)] space-y-2">
          <li className="flex justify-between">
            <span>{isEnglish ? "Order Number:" : "رقم الطلب:"}</span>
            <strong className="text-[var(--text-primary)] font-mono">{orderId}</strong>
          </li>
          <li className="flex justify-between">
            <span>{isEnglish ? "Expected Delivery:" : "التوصيل المتوقع:"}</span>
            <strong className="text-[var(--text-primary)]">{isEnglish ? "Within 24-48 working hours" : "خلال 24-48 ساعة عمل"}</strong>
          </li>
          <li className="flex justify-between">
            <span>{isEnglish ? "Payment Method:" : "طريقة الدفع:"}</span>
            <strong className="text-[var(--text-primary)]">
              {paymentMethod === "cod"
                ? (isEnglish ? "Cash on Delivery (COD)" : "الدفع عند الاستلام (COD)")
                : (isEnglish ? "Credit Card (Visa / Master)" : "بطاقة ائتمانية (فيزا / ماستر)")}
            </strong>
          </li>
        </ul>
      </div>

      <button onClick={onHome} className="w-full max-w-xs py-3.5 bg-gold hover:bg-gold/90 text-black font-bold rounded-xl text-xs transition duration-300">
        {isEnglish ? "Back to Home" : "العودة للرئيسية"}
      </button>
    </div>
  );
}

function Brand() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <Image src="/assets/logo_gold.png" alt="SK Logo" width={16} height={16} className="w-4 h-4 object-contain inline" />
      <span className="text-gold font-bold font-cinzel text-xs">BOUTIQUE</span>
    </span>
  );
}
