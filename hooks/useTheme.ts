"use client";

import { useState, useCallback } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("sk_theme") !== "light";
  });

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const theme = next ? "dark" : "light";
      localStorage.setItem("sk_theme", theme);
      document.documentElement.classList.toggle("light", !next);
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
}
