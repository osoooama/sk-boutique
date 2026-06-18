"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/springs";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DRAG_THRESHOLD = 100;

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) setDragY(dy);
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (dragY > DRAG_THRESHOLD) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
  }, [dragY, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 inset-x-0 z-50 rounded-t-3xl overflow-hidden"
            style={{
              maxHeight: "85vh",
              background: "var(--bg-secondary)",
              borderTop: "1px solid var(--border-color)",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
              touchAction: "pan-y",
            }}
            initial={{ y: "100%" }}
            animate={{ y: dragY }}
            exit={{ y: "100%" }}
            transition={springs.gentle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div
                className="rounded-full"
                style={{ width: 40, height: 4, background: "var(--accent-gold)" }}
              />
            </div>
            <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: "calc(85vh - 40px)" }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
