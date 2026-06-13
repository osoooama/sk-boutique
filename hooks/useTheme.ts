"use client";

import { useState, useCallback } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("sk_theme") !== "light";
  });

  const applyTheme = useCallback((next: boolean) => {
    const theme = next ? "dark" : "light";
    localStorage.setItem("sk_theme", theme);
    document.documentElement.classList.toggle("light", !next);
    setIsDark(next);
  }, []);

  const toggleTheme = useCallback((x?: number, y?: number) => {
    const next = document.documentElement.classList.contains("light");

    if (x !== undefined && y !== undefined) {
      document.documentElement.style.setProperty("--ripple-x", `${x}px`);
      document.documentElement.style.setProperty("--ripple-y", `${y}px`);
    }

    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }, [applyTheme]);

  return { isDark, toggleTheme };
}
