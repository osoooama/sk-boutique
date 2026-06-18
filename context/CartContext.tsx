"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface CartItem {
  productId: string;
  title: string;
  englishTitle: string;
  price: number;
  size: string;
  color: string;
  colorHex: string;
  image: string;
  quantity: number;
  inStock?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => boolean;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  discountCode: string;
  discountPercent: number;
  discountedSubtotal: number;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "sk_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(Array.isArray(parsed) ? parsed : []);
      }
      const code = localStorage.getItem("sk_discount_code");
      if (code) {
        setDiscountCode(code);
        setDiscountPercent(code === "SK30" ? 20 : 0);
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
      catch { /* ignore */ }
    }
  }, [items, loaded]);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">): boolean => {
    if (newItem.inStock === false) return false;
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === newItem.productId && i.size === newItem.size && i.color === newItem.color
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === newItem.productId && i.size === newItem.size && i.color === newItem.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    return true;
  }, []);

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, color: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, quantity: Math.max(1, i.quantity + delta) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountCode("");
    setDiscountPercent(0);
    try { localStorage.removeItem("sk_discount_code"); } catch { /* ignore */ }
  }, []);

  const applyDiscount = useCallback((code: string): boolean => {
    const valid = code.trim().toUpperCase() === "SK30";
    if (valid) {
      setDiscountCode("SK30");
      setDiscountPercent(20);
      try { localStorage.setItem("sk_discount_code", "SK30"); } catch { /* ignore */ }
    } else {
      setDiscountCode("");
      setDiscountPercent(0);
      try { localStorage.removeItem("sk_discount_code"); } catch { /* ignore */ }
    }
    return valid;
  }, []);

  const removeDiscount = useCallback(() => {
    setDiscountCode("");
    setDiscountPercent(0);
    try { localStorage.removeItem("sk_discount_code"); } catch { /* ignore */ }
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountedSubtotal = discountPercent > 0 ? subtotal * (1 - discountPercent / 100) : subtotal;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, subtotal, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
      discountCode, discountPercent, discountedSubtotal, applyDiscount, removeDiscount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
