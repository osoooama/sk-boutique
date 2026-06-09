"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export default function useMouseTracking() {
  const [pos, setPos] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const raf = useRef<number>(0);

  const handler = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(raf.current);
    };
  }, [handler]);

  return pos;
}
