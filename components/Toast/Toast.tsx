"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToast, type ToastType } from "./ToastContext";

const STYLES: Record<ToastType, { border: string; icon: string; defaultIcon: string; progress: string }> = {
  success: { border: "border-green-500/20", icon: "text-green-400", defaultIcon: "fa-check-circle", progress: "bg-green-500" },
  error: { border: "border-red-500/20", icon: "text-red-400", defaultIcon: "fa-exclamation-circle", progress: "bg-red-500" },
  info: { border: "border-accent-gold/20", icon: "text-accent-gold", defaultIcon: "fa-info-circle", progress: "bg-accent-gold" },
  warning: { border: "border-yellow-500/20", icon: "text-yellow-400", defaultIcon: "fa-triangle-exclamation", progress: "bg-yellow-500" },
};

export default function Toast() {
  const { toast, removeToast } = useToast();

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toast && (() => {
          const style = STYLES[toast.type];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
              className="pointer-events-auto relative overflow-hidden backdrop-blur-xl border rounded-2xl shadow-xl shadow-black/30 min-w-[300px] max-w-sm"
              style={{ background: "var(--toast-bg)", borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <i className={`fas ${toast.icon || style.defaultIcon} ${style.icon} text-sm`} />
                <p className="text-xs text-content-primary flex-1 leading-relaxed">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-content-muted hover:text-content-primary transition-colors cursor-pointer"
                >
                  <i className="fas fa-times text-[10px]" />
                </button>
              </div>
              <div className="h-[3px] w-full" style={{ background: "var(--border-color)" }}>
                <motion.div
                  className={`h-full ${style.progress} rounded-full`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${toast.progress}%` }}
                  transition={{ duration: 0.016, ease: "linear" }}
                />
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
