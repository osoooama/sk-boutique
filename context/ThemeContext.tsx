"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: (x?: number, y?: number) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("sk_theme") !== "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

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

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
