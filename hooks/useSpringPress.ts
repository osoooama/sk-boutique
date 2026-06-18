"use client";

import { useReducedMotion } from "framer-motion";
import { springs } from "@/lib/springs";

export function useSpringPress() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return {
      whileTap: { scale: 1 },
      transition: { duration: 0 },
    };
  }

  return {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.02 },
    transition: springs.snappy,
  };
}
