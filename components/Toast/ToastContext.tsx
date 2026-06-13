"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  icon?: string;
  progress: number;
}

interface ToastContextType {
  toast: Toast | null;
  addToast: (type: ToastType, message: string, icon?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingRef = useRef<number>(3000);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timerRef.current = null;
    timeoutRef.current = null;
  }, []);

  const removeToast = useCallback((id: string) => {
    clearTimers();
    setToast((prev) => (prev?.id === id ? null : prev));
  }, [clearTimers]);

  const addToast = useCallback((type: ToastType, message: string, icon?: string) => {
    clearTimers();
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    remainingRef.current = 3000;
    startTimeRef.current = Date.now();

    setToast({ id, type, message, icon, progress: 100 });

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, remainingRef.current - elapsed);
      const pct = (remaining / 3000) * 100;
      setToast((prev) => (prev?.id === id ? { ...prev, progress: pct } : prev));
      if (remaining <= 0) {
        clearTimers();
        setToast((prev) => (prev?.id === id ? null : prev));
      }
    }, 16);

    timeoutRef.current = setTimeout(() => {
      clearTimers();
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  }, [clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
