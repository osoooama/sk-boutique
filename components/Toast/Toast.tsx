"use client";
import { motion, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/springs";

export default function Toast({ message, type, isVisible, icon }: { message: string, type: 'success' | 'error' | 'info' | 'warning', isVisible: boolean, icon?: string }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={springs.bouncy}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full backdrop-blur-xl border border-accent-gold/30 bg-white/10 text-accent-gold shadow-2xl flex items-center gap-3"
        >
          {icon && <i className={`fas ${icon}`} />}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
