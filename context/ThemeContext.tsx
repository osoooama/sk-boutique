"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  isEnglish: boolean;
  toggleTheme: () => void;
  toggleLang: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  isEnglish: false,
  toggleTheme: () => {},
  toggleLang: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("sk_theme");
      const dark = savedTheme !== "light";
      setIsDark(dark);
      document.documentElement.classList.toggle("dark-theme", dark);
      document.documentElement.classList.toggle("light-theme", !dark);
    } catch {
      document.documentElement.classList.add("dark-theme");
    }

    try {
      const lang = localStorage.getItem("sk_lang") === "en";
      setIsEnglish(lang);
      document.documentElement.dir = lang ? "ltr" : "rtl";
      document.documentElement.lang = lang ? "en" : "ar";
    } catch {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("sk_theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark-theme", next);
      document.documentElement.classList.toggle("light-theme", !next);
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setIsEnglish((prev) => {
      const next = !prev;
      localStorage.setItem("sk_lang", next ? "en" : "ar");
      document.documentElement.dir = next ? "ltr" : "rtl";
      document.documentElement.lang = next ? "en" : "ar";
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, isEnglish, toggleTheme, toggleLang }}>
      {children}
    </ThemeContext.Provider>
  );
}
