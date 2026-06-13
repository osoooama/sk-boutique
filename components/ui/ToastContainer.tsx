"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToast, type ToastType } from "@/context/ToastContext";

const STYLES: Record<ToastType, { bg: string; border: string; icon: string; defaultIcon: string }> = {
  success: { bg: "bg-green-500/10", border: "border-green-500/20", icon: "text-green-400", defaultIcon: "fa-check-circle" },
  error: { bg: "bg-red-500/10", border: "border-red-500/20", icon: "text-red-400", defaultIcon: "fa-exclamation-circle" },
  info: { bg: "bg-accent-gold-muted", border: "border-accent-gold-muted", icon: "text-accent-gold", defaultIcon: "fa-info-circle" },
  warning: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: "text-accent-gold", defaultIcon: "fa-triangle-exclamation" },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = STYLES[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border ${style.bg} ${style.border} shadow-xl shadow-black/30 min-w-[280px] max-w-sm`}
              style={{ background: "var(--toast-bg)" }}
            >
              <i className={`fas ${toast.icon || style.defaultIcon} ${style.icon} text-sm`} />
              <p className="text-xs text-content-primary flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-accent-gold/30 hover:text-accent-gold/60 transition-colors"
              >
                <i className="fas fa-times text-[10px]" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
