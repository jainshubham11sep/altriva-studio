"use client";

import { CartProvider } from "@/contexts/CartContext";
import BagDrawer from "@/components/BagDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <BagDrawer />
    </CartProvider>
  );
}
