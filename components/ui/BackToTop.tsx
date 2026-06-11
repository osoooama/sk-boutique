"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold/20 backdrop-blur-xl transition-all flex items-center justify-center shadow-xl shadow-black/30"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up text-xs" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
