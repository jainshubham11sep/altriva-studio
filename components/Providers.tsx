"use client";

import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import BagDrawer from "@/components/BagDrawer";
import DiscountPopup from "@/components/DiscountPopup";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <BagDrawer />
          <DiscountPopup />
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
