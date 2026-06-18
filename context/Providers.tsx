"use client";

import { type ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "@/components/GlassToast/ToastProvider";
import { WishlistProvider } from "./WishlistContext";
import { ThemeProvider } from "./ThemeContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
