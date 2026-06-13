"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import SearchOverlay from "@/components/ui/SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";
import { useTheme } from "@/hooks/useTheme";

const circleLength = 251; /* 2 * PI * 40 */

export default function OrderConfirmationPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1000);
    const t3 = setTimeout(() => setStep(3), 1300);
    const t4 = setTimeout(() => setStep(4), 1600);
    const t5 = setTimeout(() => setStep(5), 2000);
    const t6 = setTimeout(() => setShowModal(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
  }, []);

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
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="space-y-6"
        >
          {/* Step 0: Animated SVG checkmark */}
          <div className="w-24 h-24 mx-auto relative">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="rgba(34, 197, 94, 0.2)"
                strokeWidth="6"
              />
              <motion.circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="#4ade80"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ strokeDasharray: circleLength, strokeDashoffset: circleLength }}
                animate={step >= 1 ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.path
                d="M35 50 L47 62 L65 38"
                fill="none"
                stroke="#4ade80"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                animate={step >= 2 ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            {step >= 3 && (
              <motion.h1
                key="header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`text-2xl font-bold ${isEnglish ? "font-inter" : "font-alexandria"}`}
              >
                {isEnglish ? "Order Placed Successfully!" : "تم استلام طلبك بنجاح"}
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step >= 4 && (
              <motion.div
                key="order-number"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-block px-5 py-2 rounded-xl bg-accent-gold-muted border border-accent-gold-muted"
              >
                <span className="text-xs text-accent-gold/60">{isEnglish ? "Order #" : "رقم الطلب #"}</span>
                <span className="text-sm font-bold text-accent-gold gold-glow mr-1">
                  SK-{Date.now().toString(36).toUpperCase().slice(-6)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {[
                { icon: "fa-check-circle", text: isEnglish ? "Order received" : "تم استلام الطلب" },
                { icon: "fa-phone", text: isEnglish ? "We'll call you within 24h" : "سنتصل بك خلال 24 ساعة" },
                { icon: "fa-truck", text: isEnglish ? "Delivery 2-5 business days" : "التوصيل خلال 2-5 أيام عمل" },
              ].map((item, i) => (
                <motion.div
                  key={item.icon}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-gold-muted border border-border"
                  style={{ justifyContent: isEnglish ? "flex-start" : "flex-end" }}
                >
                  <i className={`fas ${item.icon} text-accent-gold text-xs`} />
                  <span className="text-xs text-accent-gold/80">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-3 pt-2"
            >
              <Link href="/shop" className="btn-primary text-xs px-6 py-3">
                {isEnglish ? "Continue Shopping" : "متابعة التسوق"}
              </Link>
              <Link href="/" className="btn-secondary text-xs px-6 py-3">
                {isEnglish ? "Home" : "الرئيسية"}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer isEnglish={isEnglish} />

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="max-w-sm w-full bg-surface-primary border border-border rounded-2xl p-6 space-y-4 text-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                  <i className="fas fa-check text-xl text-green-400" />
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-bold"
              >
                {isEnglish ? "Order confirmed via WhatsApp!" : "تم تأكيد الطلب عبر واتساب!"}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xs text-accent-gold/60"
              >
                {isEnglish ? "You will be redirected shortly." : "سيتم تحويلك قريباً."}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-xl bg-accent-gold text-content-on-accent text-xs font-bold"
              >
                {isEnglish ? "OK" : "حسناً"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
