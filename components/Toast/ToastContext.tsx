"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";

const ToastContext = createContext({
  show: (type: 'success' | 'error' | 'info' | 'warning', message: string, icon?: string) => {}
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState({ message: '', type: 'info' as any, isVisible: false, icon: '' });

  const show = useCallback((type: 'success' | 'error' | 'info' | 'warning', message: string, icon?: string) => {
    setToast({ message, type, isVisible: true, icon: icon || '' });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast {...toast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
