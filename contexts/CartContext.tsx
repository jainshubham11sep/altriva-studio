"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, qty?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  drawerOpen: boolean;
  lastAdded: CartItem | null;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("altriva_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("altriva_cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, size: string, qty = 1) => {
    const newItem: CartItem = { product, size, quantity: qty };
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, newItem];
    });
    setLastAdded(newItem);
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  }, []);

  const updateQty = useCallback((productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.priceInr * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, drawerOpen, lastAdded, closeDrawer }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
