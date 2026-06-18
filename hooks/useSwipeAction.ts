"use client";

import { useRef, useState, useCallback } from "react";
import { springs } from "@/lib/springs";
import { hapticMedium, hapticLight } from "@/lib/haptics";

type SwipeState =
  | { phase: "idle" }
  | { phase: "dragging"; dx: number; velocity: number }
  | { phase: "preview"; direction: "left" | "right"; dx: number }
  | { phase: "confirmed"; direction: "left" | "right" };

interface UseSwipeOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const IS_MOBILE =
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export function useSwipeAction({
  threshold = 60,
  onSwipeLeft,
  onSwipeRight,
}: UseSwipeOptions = {}) {
  const [state, setState] = useState<SwipeState>({ phase: "idle" });
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!IS_MOBILE) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    startTime.current = Date.now();
    setState({ phase: "idle" });
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!IS_MOBILE || state.phase === "confirmed") return;
      const dx = e.touches[0].clientX - startX.current;
      const dy = e.touches[0].clientY - startY.current;
      if (Math.abs(dy) > Math.abs(dx)) {
        if (state.phase === "dragging" || state.phase === "preview") {
          setState({ phase: "idle" });
        }
        return;
      }
      const elapsed = Date.now() - startTime.current;
      const velocity = Math.abs(dx) / Math.max(elapsed, 1);
      if (Math.abs(dx) > threshold && velocity > 0.5) {
        const direction = dx < 0 ? "left" : "right";
        setState({ phase: "confirmed", direction });
        if (direction === "left") {
          hapticMedium();
          onSwipeLeft?.();
        } else {
          hapticLight();
          onSwipeRight?.();
        }
        return;
      }
      if (Math.abs(dx) > threshold * 0.7 && velocity > 0.2) {
        const direction = dx < 0 ? "left" : "right";
        setState({ phase: "preview", direction, dx });
        return;
      }
      setState({ phase: "dragging", dx, velocity });
    },
    [threshold, state.phase, onSwipeLeft, onSwipeRight]
  );

  const handleTouchEnd = useCallback(() => {
    if (!IS_MOBILE) return;
    if (state.phase === "confirmed") return;
    if (state.phase === "preview") {
      const direction = state.direction;
      setState({ phase: "confirmed", direction });
      if (direction === "left") {
        hapticMedium();
        onSwipeLeft?.();
      } else {
        hapticLight();
        onSwipeRight?.();
      }
      setTimeout(() => setState({ phase: "idle" }), 400);
      return;
    }
    setState({ phase: "idle" });
  }, [state, onSwipeLeft, onSwipeRight]);

  const x =
    state.phase === "idle"
      ? 0
      : state.phase === "confirmed"
      ? (state.direction === "left" ? -threshold : threshold) * 1.2
      : state.phase === "preview"
      ? state.dx
      : state.dx;

  const transition =
    state.phase === "confirmed"
      ? springs.bouncy
      : state.phase === "idle" && x === 0
      ? springs.bouncy
      : undefined;

  const overlay =
    state.phase === "confirmed"
      ? state.direction
      : state.phase === "preview"
      ? state.direction
      : null;

  const reset = useCallback(() => setState({ phase: "idle" }), []);

  return {
    x,
    transition,
    overlay,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging: state.phase !== "idle" && state.phase !== "confirmed",
    reset,
  };
}
