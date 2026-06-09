"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { getProductPrice, getDiscountRate } from "@/lib/utils";
import PRODUCTS from "@/data/products";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  appliedPromo: string | null;
  promoInput: string;
  setPromoInput: (val: string) => void;
  addItem: (productId: string, size: string, colorName: string, image: string, quantity?: number) => void;
  changeQty: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  applyPromo: (code?: string) => boolean;
  wobble: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("sk_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem("sk_promo");
    } catch {
      return null;
    }
  });

  const [promoInput, setPromoInput] = useState("");
  const [wobble, setWobble] = useState(false);

  const persist = (next: CartItem[]) => {
    localStorage.setItem("sk_cart", JSON.stringify(next));
    setItems(next);
  };

  const addItem = useCallback((productId: string, size: string, colorName: string, image: string, quantity = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === productId && i.size === size && i.color === colorName);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        localStorage.setItem("sk_cart", JSON.stringify(updated));
        return updated;
      }
      const updated = [
        ...prev,
        {
          id: productId,
          title: product.title,
          price: getProductPrice(product, size, colorName),
          image: image || product.colors[0].image,
          size,
          color: colorName,
          quantity,
        },
      ];
      localStorage.setItem("sk_cart", JSON.stringify(updated));
      return updated;
    });

    setWobble(true);
    setTimeout(() => setWobble(false), 600);
  }, []);

  const changeQty = useCallback((index: number, delta: number) => {
    setItems((prev) => {
      const updated = [...prev];
      if (!updated[index]) return prev;
      updated[index].quantity += delta;
      if (updated[index].quantity <= 0) {
        updated.splice(index, 1);
      }
      localStorage.setItem("sk_cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => {
      const updated = [...prev];
      if (updated[index]) updated.splice(index, 1);
      localStorage.setItem("sk_cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("sk_cart");
    setAppliedPromo(null);
    localStorage.removeItem("sk_promo");
  }, []);

  const applyPromo = useCallback((code?: string): boolean => {
    const c = (code || promoInput || "").trim().toUpperCase();
    if (!c) return false;
    const rate = getDiscountRate(c);
    if (rate > 0) {
      setAppliedPromo(c);
      localStorage.setItem("sk_promo", c);
      setPromoInput("");
      return true;
    }
    return false;
  }, [promoInput]);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const discountRate = appliedPromo ? getDiscountRate(appliedPromo) : 0;
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;
  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items, count, subtotal, discountRate, discountAmount, total,
      appliedPromo, promoInput, setPromoInput,
      addItem, changeQty, removeItem, clearCart, applyPromo, wobble,
    }),
    [items, count, subtotal, discountRate, discountAmount, total, appliedPromo, promoInput, addItem, changeQty, removeItem, clearCart, applyPromo, wobble]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
