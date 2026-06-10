"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "@/lib/products";

interface WishlistContextType {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("altriva_wishlist");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("altriva_wishlist", JSON.stringify(items));
  }, [items]);

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback((id: string) => items.some((p) => p.id === id), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
