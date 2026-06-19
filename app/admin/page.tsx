"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/components/GlassToast/ToastProvider";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "skadmin2024";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const { show } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      try {
        localStorage.setItem("sk_admin_auth", "true");
      } catch { /* ignore */ }
      show("success", "مرحباً بك في لوحة التحكم");
      router.push("/admin/dashboard");
    } else {
      setShake(true);
      show("error", "كلمة المرور غير صحيحة");
      setTimeout(() => setShake(false), 500);
      if (inputRef.current) {
        inputRef.current.style.borderColor = "#ff4444";
        inputRef.current.style.boxShadow = "0 0 16px rgba(255,68,68,0.3)";
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.style.borderColor = "var(--border-color)";
            inputRef.current.style.boxShadow = "none";
          }
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "transparent" }}>
      <motion.div
        className="w-full max-w-sm rounded-2xl p-8 space-y-7"
        style={{
          background: "var(--bg-card)",
          backdropFilter: "blur(24px)",
          border: "1px solid var(--border-color)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold" style={{
            background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover), var(--accent-gold))",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
          }}>
            SK BOUTIQUE
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            لوحة التحكم
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              dir="rtl"
              autoFocus
              className={`w-full h-12 rounded-xl px-4 text-sm transition-all duration-200 ${shake ? "animate__animated animate__shakeX" : ""}`}
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--input-text)",
                outline: "none",
                paddingLeft: "44px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-gold)";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(212,175,55,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--input-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <i className={`fas fa-${showPassword ? "eye-slash" : "eye"}`} />
            </button>
          </div>

          {shake && (
            <motion.div
              className="text-xs text-center"
              style={{ color: "#ef4444" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <i className="fas fa-exclamation-circle ml-1" />
              كلمة المرور غير صحيحة
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="w-full h-11 rounded-xl font-semibold text-sm cursor-pointer"
            style={{
              background: "var(--accent-gold)",
              color: "var(--text-on-accent)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            دخول
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
