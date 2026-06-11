"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import { JORDAN_CITIES, getDeliveryFee } from "@/lib/jordan-cities";
import { phoneErrorMessage } from "@/lib/phone-validation";

export default function CheckoutPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { items, subtotal, discountCode, discountPercent, discountedSubtotal, clearCart } = useCart();
  const { addToast } = useToast();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [backupPhone, setBackupPhone] = useState("");
  const [backupPhoneError, setBackupPhoneError] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "submitting">("form");
  const [submitting, setSubmitting] = useState(false);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setDeliveryFee(getDeliveryFee(cityName));
  };

  const handlePhoneBlur = () => {
    setPhoneError(phoneErrorMessage(phone));
  };

  const handleBackupPhoneBlur = () => {
    if (backupPhone.trim() === "") {
      setBackupPhoneError(null);
      return;
    }
    setBackupPhoneError(phoneErrorMessage(backupPhone));
  };

  const total = discountedSubtotal + deliveryFee;

  const validateForm = (): boolean => {
    let valid = true;

    if (!name.trim()) valid = false;
    if (!address.trim()) valid = false;
    if (!selectedCity) valid = false;

    const pErr = phoneErrorMessage(phone);
    if (pErr) {
      setPhoneError(pErr);
      valid = false;
    }

    if (backupPhone.trim() !== "") {
      const bErr = phoneErrorMessage(backupPhone);
      if (bErr) {
        setBackupPhoneError(bErr);
        valid = false;
      }
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      addToast("error", isEnglish ? "Please fill all required fields" : "يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setSubmitting(true);
    setStep("submitting");

    const orderLines = items
      .map(
        (i) =>
          `• ${isEnglish ? i.englishTitle : i.title} (${i.color} / ${i.size}) × ${i.quantity} = ${i.price * i.quantity} JD`
      )
      .join("\n");

    const msg = `🛍️ طلب جديد — SK BOUTIQUE

👤 الاسم: ${name}
📍 المدينة: ${selectedCity}
📞 الهاتف: ${phone}${backupPhone ? `\n📞 رقم احتياطي: ${backupPhone}` : ""}
🏠 العنوان: ${address}
📝 ملاحظات: ${notes || "—"}

🧾 الطلبات:
${orderLines}

💰 المجموع الفرعي: ${subtotal.toFixed(2)} د.أ
${discountPercent > 0 ? `🏷️ خصم (${discountPercent}%): -${(subtotal - discountedSubtotal).toFixed(2)} د.أ` : ""}
🚚 التوصيل (${deliveryFee === 2 ? "داخل عمّان والزرقاء" : "خارج العاصمة"}): ${deliveryFee} د.أ
✅ الإجمالي: ${total.toFixed(2)} د.أ

💳 الدفع عند الاستلام`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/962798921123?text=${encoded}`;

    try {
      await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, backupPhone, address, city: selectedCity, notes, items, subtotal, deliveryFee, total }),
      }).catch(() => {});
    } catch { /* ignore */ }

    clearCart();
    window.open(waUrl, "_blank");
    router.push("/order-confirmation");
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 ${
      hasError
        ? "border-red-400 bg-red-50 dark:bg-red-900/10"
        : "border-[#C9A84C]/20 bg-white dark:bg-zinc-900 text-luxury-white"
    }`;

  return (
    <div
      className={`min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] ${isEnglish ? "font-inter" : "font-alexandria"}`}
      dir={isEnglish ? "ltr" : "rtl"}
    >
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

      <main className="pt-28 pb-20 section-padding max-w-2xl mx-auto">
        <Breadcrumbs
          items={[
            { label: isEnglish ? "Home" : "الرئيسية", href: "/" },
            { label: isEnglish ? "Cart" : "سلة التسوق", href: "/cart" },
            { label: isEnglish ? "Checkout" : "إتمام الطلب" },
          ]}
          isEnglish={isEnglish}
        />

        <h1 className={`text-2xl font-bold mb-8 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
          {isEnglish ? "Checkout" : "إتمام الطلب"}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-luxury-gold/40">{isEnglish ? "Your cart is empty" : "سلتك فارغة"}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] border border-white/5 space-y-4">
              <h3 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Shipping Information" : "معلومات الشحن"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 h-10 focus-within:border-[#C9A84C]/30 transition-all bg-white/[0.03]">
                    <i className="fas fa-user text-luxury-gold/30 text-[10px]" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Full Name" : "الاسم الكامل"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs text-luxury-white flex-1 placeholder:text-luxury-gold/30"
                    />
                  </div>
                </div>

                {/* City Select */}
                <div>
                  <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 h-10 focus-within:border-[#C9A84C]/30 transition-all bg-white/[0.03]">
                    <i className="fas fa-building text-luxury-gold/30 text-[10px]" />
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs text-luxury-gold flex-1 appearance-none cursor-pointer"
                      style={{ direction: isEnglish ? "ltr" : "rtl" }}
                    >
                      <option value="" disabled>
                        {isEnglish ? "— Select City —" : "— اختر مدينتك —"}
                      </option>
                      {JORDAN_CITIES.map((city) => (
                        <option key={city.name} value={city.name} className="bg-luxury-black">
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address (full width) */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 h-10 focus-within:border-[#C9A84C]/30 transition-all bg-white/[0.03]">
                    <i className="fas fa-location-dot text-luxury-gold/30 text-[10px]" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Full Address" : "العنوان الكامل"}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs text-luxury-white flex-1 placeholder:text-luxury-gold/30"
                    />
                  </div>
                </div>

                {/* Primary Phone */}
                <div>
                  <div
                    className={`flex items-center gap-2 border rounded-xl px-3 h-10 focus-within:border-[#C9A84C]/30 transition-all bg-white/[0.03] ${
                      phoneError ? "border-red-500/30" : "border-white/10"
                    }`}
                  >
                    <i className="fas fa-phone text-luxury-gold/30 text-[10px]" />
                    <input
                      type="tel"
                      placeholder={isEnglish ? "Phone Number" : "رقم الهاتف"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={handlePhoneBlur}
                      dir="ltr"
                      className="bg-transparent border-none outline-none text-xs text-luxury-white flex-1 placeholder:text-luxury-gold/30 text-left"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-[10px] text-red-400/60 mt-1 mr-2">{phoneError}</p>
                  )}
                  <p className="text-[9px] text-luxury-gold/30 mt-1 mr-2">
                    {isEnglish ? "Accepted: 077 / 078 / 079" : "أرقام مقبولة: 077 / 078 / 079"}
                  </p>
                </div>

                {/* Backup Phone */}
                <div>
                  <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 h-10 focus-within:border-[#C9A84C]/30 transition-all bg-white/[0.03]">
                    <i className="fas fa-phone-volume text-luxury-gold/30 text-[10px]" />
                    <input
                      type="tel"
                      placeholder={isEnglish ? "Backup Phone (optional)" : "رقم احتياطي (اختياري)"}
                      value={backupPhone}
                      onChange={(e) => setBackupPhone(e.target.value)}
                      onBlur={handleBackupPhoneBlur}
                      dir="ltr"
                      className="bg-transparent border-none outline-none text-xs text-luxury-white flex-1 placeholder:text-luxury-gold/30 text-left"
                    />
                  </div>
                  {backupPhoneError && (
                    <p className="text-[10px] text-red-400/60 mt-1 mr-2">{backupPhoneError}</p>
                  )}
                  <p className="text-[9px] text-luxury-gold/30 mt-1 mr-2">
                    {isEnglish ? "Optional" : "اختياري"}
                  </p>
                </div>

                {/* Notes (full width) */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 h-10 focus-within:border-[#C9A84C]/30 transition-all bg-white/[0.03]">
                    <i className="fas fa-pen text-luxury-gold/30 text-[10px]" />
                    <input
                      type="text"
                      placeholder={isEnglish ? "Order Notes (optional)" : "ملاحظات (اختياري)"}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs text-luxury-white flex-1 placeholder:text-luxury-gold/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Fee Badge */}
            {selectedCity && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-[#C9A84C]/30 px-4 py-3 text-sm"
                style={{
                  background: "rgba(201,168,76,0.08)",
                }}
              >
                <span>🚚</span>
                <span className="font-semibold text-[#C9A84C]">
                  {isEnglish ? "Delivery to " : "رسوم التوصيل إلى "}
                  {selectedCity}:
                </span>
                <span className="font-bold text-[#C9A84C] text-base">{deliveryFee} {isEnglish ? "JD" : "د.أ"}</span>
                {deliveryFee === 2 && (
                  <span className="mr-auto text-xs bg-[#C9A84C] text-luxury-black rounded-full px-2 py-0.5 font-bold">
                    {isEnglish ? "Inside Capital ✓" : "داخل العاصمة ✓"}
                  </span>
                )}
              </motion.div>
            )}

            {/* Order Summary */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <h3 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Order Summary" : "ملخص الطلب"}
              </h3>

              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex items-center gap-3 text-xs text-luxury-gold/60"
                >
                  <span className="font-bold text-luxury-white">{item.quantity}×</span>
                  <span className="flex-1 truncate">{isEnglish ? item.englishTitle : item.title}</span>
                  <span>
                    {item.price * item.quantity} {isEnglish ? "JD" : "د.أ"}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/10 pt-3 space-y-1">
                <div className="flex items-center justify-between text-xs text-luxury-gold/60">
                  <span>{isEnglish ? "Subtotal" : "المجموع الفرعي"}</span>
                  <span>
                    {subtotal.toFixed(2)} {isEnglish ? "JD" : "د.أ"}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-xs text-green-400/80">
                    <span>{isEnglish ? `Discount (${discountPercent}%)` : `الخصم (${discountPercent}%)`}</span>
                    <span className="font-bold text-green-400">
                      -{(subtotal - discountedSubtotal).toFixed(2)} {isEnglish ? "JD" : "د.أ"}
                    </span>
                  </div>
                )}

                {selectedCity && (
                  <div className="flex items-center justify-between text-xs text-luxury-gold/60">
                    <span>
                      {isEnglish ? `Delivery (${deliveryFee === 2 ? "Inside Capital" : "Outside Capital"})` : `التوصيل (${deliveryFee === 2 ? "داخل العاصمة" : "خارج العاصمة"})`}
                    </span>
                    <span>
                      +{deliveryFee}.00 {isEnglish ? "JD" : "د.أ"}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-white/10">
                  <span>{isEnglish ? "Total" : "الإجمالي"}</span>
                  <span className="text-[#C9A84C]">
                    {total.toFixed(2)} {isEnglish ? "JD" : "د.أ"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={submitting}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-bold text-xs tracking-wide transition-all disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E8C96B)",
                color: "#1A1208",
              }}
            >
              {submitting
                ? isEnglish
                  ? "Processing..."
                  : "جاري المعالجة..."
                : isEnglish
                  ? "Place Order via WhatsApp"
                  : "تأكيد الطلب عبر واتساب"}
            </motion.button>

            <p className={`text-[10px] text-luxury-gold/30 text-center ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              <i className="fas fa-shield-alt mr-1" />
              {isEnglish
                ? "You will be redirected to WhatsApp to confirm your order. We accept cash on delivery."
                : "سيتم تحويلك إلى واتساب لتأكيد الطلب. الدفع عند الاستلام."}
            </p>
          </div>
        )}
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
