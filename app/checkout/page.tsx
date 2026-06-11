"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import ToastContainer from "@/components/ui/ToastContainer";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function CheckoutPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { items, subtotal, clearCart } = useCart();
  const { addToast } = useToast();

  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });
  const [step, setStep] = useState<"form" | "review" | "submitting">("form");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = isEnglish ? "Required" : "مطلوب";
    if (!form.phone.trim()) errs.phone = isEnglish ? "Required" : "مطلوب";
    if (!form.address.trim()) errs.address = isEnglish ? "Required" : "مطلوب";
    if (!form.city.trim()) errs.city = isEnglish ? "Required" : "مطلوب";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStep("submitting");

    const msg = `🛒 *طلب جديد من SK BOUTIQUE*\n\n${items
      .map((i) => `• ${isEnglish ? i.englishTitle : i.title} (${i.color} / ${i.size}) × ${i.quantity} = ${i.price * i.quantity} JD`)
      .join("\n")}\n\n💰 المجموع: ${subtotal} د.أ\n👤 الاسم: ${form.name}\n📱 الهاتف: ${form.phone}\n📍 العنوان: ${form.address}\n🏙️ المدينة: ${form.city}\n📝 ملاحظات: ${form.notes || "—"}`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/962798921123?text=${encoded}`;

    try {
      await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, subtotal }),
      }).catch(() => {});
    } catch { /* ignore */ }

    clearCart();
    window.open(waUrl, "_blank");
    router.push("/order-confirmation");
  };

  return (
    <div className={`min-h-screen bg-luxury-black text-luxury-white ${isEnglish ? "font-inter" : "font-alexandria"}`} dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar
        isEnglish={isEnglish}
        isDark={isDark}
        onToggleLang={() => setIsEnglish((p) => !p)}
        onToggleTheme={() => setIsDark((p) => !p)}
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
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
              <h3 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Shipping Information" : "معلومات الشحن"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InputField isEnglish={isEnglish} label={isEnglish ? "Full Name" : "الاسم الكامل"} value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} error={errors.name} icon="fa-user" />
                <InputField isEnglish={isEnglish} label={isEnglish ? "Phone Number" : "رقم الهاتف"} value={form.phone} onChange={(v) => setForm((p) => ({ ...p, phone: v }))} error={errors.phone} icon="fa-phone" type="tel" />
                <div className="md:col-span-2">
                  <InputField isEnglish={isEnglish} label={isEnglish ? "Full Address" : "العنوان الكامل"} value={form.address} onChange={(v) => setForm((p) => ({ ...p, address: v }))} error={errors.address} icon="fa-location-dot" />
                </div>
                <InputField isEnglish={isEnglish} label={isEnglish ? "City" : "المدينة"} value={form.city} onChange={(v) => setForm((p) => ({ ...p, city: v }))} error={errors.city} icon="fa-building" />
                <InputField isEnglish={isEnglish} label={isEnglish ? "Order Notes (optional)" : "ملاحظات (اختياري)"} value={form.notes} onChange={(v) => setForm((p) => ({ ...p, notes: v }))} icon="fa-pen" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <h3 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Order Summary" : "ملخص الطلب"}
              </h3>
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-3 text-xs text-luxury-gold/60">
                  <span className="font-bold text-luxury-white">{item.quantity}×</span>
                  <span className="flex-1 truncate">{isEnglish ? item.englishTitle : item.title}</span>
                  <span>{item.price * item.quantity} JD</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between text-sm font-bold">
                <span>{isEnglish ? "Total" : "المجموع"}</span>
                <span className="text-luxury-gold">{subtotal} {isEnglish ? "JD" : "د.أ"}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={step === "submitting"}
              className="w-full py-4 rounded-xl bg-luxury-gold text-luxury-black font-bold text-xs tracking-wide hover:bg-luxury-gold-light transition-all disabled:opacity-40"
            >
              {step === "submitting"
                ? isEnglish ? "Processing..." : "جاري المعالجة..."
                : isEnglish ? "Place Order via WhatsApp" : "تأكيد الطلب عبر واتساب"}
            </button>

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

function InputField({
  label, value, onChange, error, icon, type, isEnglish,
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; icon?: string; type?: string; isEnglish: boolean;
}) {
  return (
    <div>
      <div className={`flex items-center gap-2 bg-white/[0.03] border ${error ? "border-red-500/30" : "border-white/10"} rounded-xl px-3 h-10 focus-within:border-luxury-gold/30 transition-all`}>
        {icon && <i className={`fas ${icon} text-luxury-gold/30 text-[10px]`} />}
        <input
          type={type || "text"}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none text-xs text-luxury-white flex-1 placeholder:text-luxury-gold/30"
        />
      </div>
      {error && <p className="text-[10px] text-red-400/60 mt-1 mr-2">{error}</p>}
    </div>
  );
}
