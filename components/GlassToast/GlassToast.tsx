"use client";
import { motion, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/springs";

const ICONS: Record<string, string> = {
  success: "fa-check-circle",
  error: "fa-times-circle",
  info: "fa-info-circle",
  warning: "fa-exclamation-triangle",
};

export default function GlassToast({
  message,
  type,
  isVisible,
  icon,
}: {
  message: string;
  type: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  icon?: string;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -10 }}
          transition={springs.bouncy}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full backdrop-blur-xl border border-accent-gold/30 bg-white/10 shadow-2xl flex items-center gap-3 pointer-events-auto"
          style={{
            background: "rgba(255,255,255,0.08)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
          }}
        >
          <i className={`fas ${icon || ICONS[type]} text-accent-gold text-xs`} />
          <span className="text-xs font-medium whitespace-nowrap text-accent-gold">
            {message}
          </span>
          <motion.div
            className="h-0.5 rounded-full absolute bottom-1 left-4 right-4"
            style={{ background: "var(--accent-gold)" }}
            initial={{ scaleX: 1, transformOrigin: "left" }}
            animate={{ scaleX: 0, transformOrigin: "left" }}
            transition={{ duration: 2.5, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
