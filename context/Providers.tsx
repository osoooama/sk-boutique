"use client";

import { type ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "@/components/Toast/ToastContext";
import { WishlistProvider } from "./WishlistContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
