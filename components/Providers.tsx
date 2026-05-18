"use client";

import { CartProvider } from "@/contexts/CartContext";
import BagDrawer from "@/components/BagDrawer";
import DiscountPopup from "@/components/DiscountPopup";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <BagDrawer />
      <DiscountPopup />
    </CartProvider>
  );
}
