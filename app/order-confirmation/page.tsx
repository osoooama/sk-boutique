"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import { useTheme } from "@/hooks/useTheme";

export default function OrderConfirmationPage() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

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
      <BackToTop />

      <main className="pt-28 pb-20 section-padding max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
            <i className="fas fa-check text-2xl text-green-400" />
          </div>

          <h1 className={`text-2xl font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}>
            {isEnglish ? "Order Placed Successfully!" : "تم تأكيد الطلب بنجاح!"}
          </h1>

          <p className="text-sm text-luxury-gold/60 leading-relaxed">
            {isEnglish
              ? "Thank you! Your order has been received. You will be redirected to WhatsApp to confirm your order details. We will contact you within 24 hours to arrange delivery."
              : "شكراً لك! تم استلام طلبك. سيتم تحويلك إلى واتساب لتأكيد تفاصيل الطلب. سنتواصل معك خلال 24 ساعة لترتيب التوصيل."}
          </p>

          <div className="text-xs text-luxury-gold/40 space-y-1">
            <p><i className="fas fa-truck mr-1" /> {isEnglish ? "Delivery within 2-5 business days" : "التوصيل خلال 2-5 أيام عمل"}</p>
            <p><i className="fas fa-phone mr-1" /> {isEnglish ? "Call us: +962 7 9892 1123" : "اتصل بنا: +962 7 9892 1123"}</p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Link href="/shop" className="btn-primary text-xs px-6 py-3">
              {isEnglish ? "Continue Shopping" : "متابعة التسوق"}
            </Link>
            <Link href="/" className="btn-secondary text-xs px-6 py-3">
              {isEnglish ? "Home" : "الرئيسية"}
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer isEnglish={isEnglish} />
    </div>
  );
}
