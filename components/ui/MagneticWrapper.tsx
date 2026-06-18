"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { springs } from "@/lib/springs";

const IS_MOBILE =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  maxDistance?: number;
}

export default function MagneticWrapper({
  children,
  className,
  maxDistance = 8,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (IS_MOBILE || !ref.current) {
        if (offset.x !== 0 || offset.y !== 0) setOffset({ x: 0, y: 0 });
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 60) {
        if (offset.x !== 0 || offset.y !== 0) setOffset({ x: 0, y: 0 });
        return;
      }

      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * maxDistance * (1 - dist / 60);
      const moveY = Math.sin(angle) * maxDistance * (1 - dist / 60);
      setOffset({ x: moveX, y: moveY });
    },
    [maxDistance, offset]
  );

  const handleMouseLeave = useCallback(() => {
    if (IS_MOBILE) return;
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <motion.div
        animate={{ x: offset.x, y: offset.y }}
        transition={springs.bouncy}
      >
        {children}
      </motion.div>
    </div>
  );
}
