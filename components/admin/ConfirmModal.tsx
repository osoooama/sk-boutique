"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmRed?: boolean;
}

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "تأكيد",
  confirmRed,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="w-full max-w-sm rounded-2xl p-6 space-y-5 text-center"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <i
                className="fas fa-exclamation-triangle text-2xl"
                style={{ color: confirmRed ? "#ff4444" : "#C9A84C" }}
              />
            </div>
            <h2 className="text-lg font-bold" style={{ color: "#F5F5F0" }}>
              {title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#A8A89A" }}>
              {message}
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={onConfirm}
                className="flex-1 h-11 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: confirmRed
                    ? "linear-gradient(135deg, #ff4444, #cc0000)"
                    : "linear-gradient(135deg, #C9A84C, #D4B87A)",
                  color: "#0A0A0A",
                }}
              >
                {confirmLabel}
              </button>
              <button
                onClick={onCancel}
                className="flex-1 h-11 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#A8A89A",
                }}
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
