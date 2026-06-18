"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/springs";

export default function GlassSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="glass-splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2.8, ...springs.gentle }}
            style={{
              width: "60vmin",
              height: "60vmin",
              borderRadius: "50%",
              background: "rgba(201,168,76,0.03)",
              backdropFilter: "blur(60px) saturate(150%)",
              WebkitBackdropFilter: "blur(60px) saturate(150%)",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "inset 0 0 80px rgba(201,168,76,0.08), 0 0 120px rgba(201,168,76,0.04)",
              willChange: "transform, opacity",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, rgba(201,168,76,0.06) 25%, transparent 50%, rgba(201,168,76,0.06) 75%, transparent 100%)",
                animation: "logo-shimmer 4s linear infinite",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
