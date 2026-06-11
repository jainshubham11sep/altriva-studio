"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CurrencyCode = "INR" | "USD" | "GBP";

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rate: number; // multiplier from INR
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "INR", symbol: "₹",  label: "IN / ₹", rate: 1       },
  { code: "USD", symbol: "$",  label: "US / $",  rate: 1 / 84  },
  { code: "GBP", symbol: "£",  label: "UK / £",  rate: 1 / 107 },
];

interface CurrencyContextType {
  currency: CurrencyOption;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (inrPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState<CurrencyCode>("INR");

  useEffect(() => {
    const saved = localStorage.getItem("altriva_currency") as CurrencyCode | null;
    if (saved && CURRENCIES.find(c => c.code === saved)) setCode(saved);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCode(c);
    localStorage.setItem("altriva_currency", c);
  }, []);

  const currency = CURRENCIES.find(c => c.code === code)!;

  const formatPrice = useCallback((inrPrice: number): string => {
    const converted = inrPrice * currency.rate;
    if (code === "INR") return `₹ ${Math.round(converted).toLocaleString("en-IN")}`;
    if (code === "USD") return `$ ${Math.round(converted).toLocaleString("en-US")}`;
    return `£ ${Math.round(converted).toLocaleString("en-GB")}`;
  }, [code, currency.rate]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
