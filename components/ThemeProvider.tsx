"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: true, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sk_theme");
      const dark = saved !== "light";
      setIsDark(dark);
      document.documentElement.classList.toggle("dark-theme", dark);
      document.documentElement.classList.toggle("light-theme", !dark);
    } catch {
      document.documentElement.classList.add("dark-theme");
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("sk_theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark-theme", next);
      document.documentElement.classList.toggle("light-theme", !next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
