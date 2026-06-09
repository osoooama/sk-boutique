"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

interface WishlistContextType {
  ids: string[];
  favorites: string[]; // alias for backward compat
  count: number;
  toggle: (id: string) => boolean;
  toggleFavorite: (id: string) => void; // alias for backward compat
  has: (id: string) => boolean;
  isFavorite: (id: string) => boolean; // alias for backward compat
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}

export default function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("sk_wishlist") || localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  const toggle = useCallback((id: string) => {
    let added = false;
    setIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      added = !exists;
      localStorage.setItem("sk_wishlist", JSON.stringify(next));
      return next;
    });
    return added;
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const count = ids.length;

  const value = useMemo(() => ({ ids, favorites: ids, count, toggle, toggleFavorite: toggle, has, isFavorite: has }), [ids, count, toggle, has]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
