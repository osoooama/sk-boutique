"use client";

import { useRef, useState, useCallback } from "react";

interface PinchZoomState {
  scale: number;
  x: number;
  y: number;
}

export function usePinchZoom(maxScale = 3) {
  const [state, setState] = useState<PinchZoomState>({ scale: 1, x: 0, y: 0 });
  const lastDist = useRef(0);
  const lastScale = useRef(1);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const rafId = useRef(0);
  const lastTap = useRef(0);
  const initialPinchDist = useRef(0);

  const update = useCallback(
    (scale: number, x: number, y: number) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const clamped = Math.max(1, Math.min(maxScale, scale));
        setState({ scale: clamped, x, y });
      });
    },
    [maxScale]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastDist.current = Math.sqrt(dx * dx + dy * dy);
        lastScale.current = state.scale;
        initialPinchDist.current = lastDist.current;
        return;
      }
      if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTap.current < 300) {
          if (state.scale > 1.5) {
            setState({ scale: 1, x: 0, y: 0 });
          } else {
            setState({ scale: 2, x: 0, y: 0 });
          }
        }
        lastTap.current = now;
        lastX.current = e.touches[0].clientX;
        lastY.current = e.touches[0].clientY;
      }
    },
    [state.scale]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = dist / lastDist.current;
        const newScale = Math.max(1, Math.min(maxScale, lastScale.current * ratio));
        setState((prev) => ({ ...prev, scale: newScale }));
        return;
      }
      if (e.touches.length === 1 && state.scale > 1) {
        const dx = e.touches[0].clientX - lastX.current;
        const dy = e.touches[0].clientY - lastY.current;
        lastX.current = e.touches[0].clientX;
        lastY.current = e.touches[0].clientY;
        setState((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
      }
    },
    [maxScale, state.scale]
  );

  const handleTouchEnd = useCallback(() => {
    if (state.scale < 1.1) {
      setState({ scale: 1, x: 0, y: 0 });
    }
  }, [state.scale]);

  const reset = useCallback(() => {
    setState({ scale: 1, x: 0, y: 0 });
  }, []);

  return {
    ...state,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    reset,
    isZoomed: state.scale > 1,
  };
}
