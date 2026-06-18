"use client";

import { useRef, useCallback, useState } from "react";
import { springs } from "@/lib/springs";

const IS_MOBILE =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

interface MagneticState {
  x: number;
  y: number;
  transition: typeof springs.bouncy;
}

export function useMagneticButton(maxDistance = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [magnetic, setMagnetic] = useState<MagneticState | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (IS_MOBILE || !ref.current) {
        if (magnetic) setMagnetic(null);
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 60) {
        if (magnetic) setMagnetic(null);
        return;
      }

      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * maxDistance * (1 - dist / 60);
      const moveY = Math.sin(angle) * maxDistance * (1 - dist / 60);

      setMagnetic({ x: moveX, y: moveY, transition: springs.bouncy });
    },
    [maxDistance, magnetic]
  );

  const handleMouseLeave = useCallback(() => {
    if (IS_MOBILE) return;
    setMagnetic(null);
  }, []);

  return { ref, magnetic, handleMouseMove, handleMouseLeave };
}
