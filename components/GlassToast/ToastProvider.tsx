"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import GlassToast from "./GlassToast";

interface ToastContextType {
  show: (type: "success" | "error" | "info" | "warning", message: string, icon?: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  show: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
    icon?: string;
  }>({ message: "", type: "info", isVisible: false });

  const show = useCallback(
    (type: "success" | "error" | "info" | "warning", message: string, icon?: string) => {
      setToast({ message, type, isVisible: true, icon });
      setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 2500);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <GlassToast {...toast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
