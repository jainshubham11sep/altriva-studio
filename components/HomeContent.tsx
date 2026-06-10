"use client";

import { useState, useMemo } from "react";
import { products, mainNavLinks, type Product } from "@/lib/products";
import ProductGrid from "./ProductGrid";
import CorsetSection from "./CorsetSection";
import MoreFeatured from "./MoreFeatured";

type SortKey = "fresh" | "price-asc" | "price-desc" | "trending" | "top-rated" | "discounted";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "fresh",      label: "Fresh"            },
  { key: "trending",   label: "Trending"         },
  { key: "price-asc",  label: "Price: Low → High"},
  { key: "price-desc", label: "Price: High → Low"},
  { key: "top-rated",  label: "Top Rated"        },
  { key: "discounted", label: "Discounted"       },
];

function applySort(items: Product[], key: SortKey): Product[] {
  const arr = [...items];
  switch (key) {
    case "fresh":      return arr;
    case "trending":   return arr.sort((a, b) => (parseInt(b.id) % 3) - (parseInt(a.id) % 3));
    case "price-asc":  return arr.sort((a, b) => a.priceInr - b.priceInr);
    case "price-desc": return arr.sort((a, b) => b.priceInr - a.priceInr);
    case "top-rated":  return arr.sort((a, b) => {
      const score = (p: Product) => p.badge === "Exclusive" ? 2 : p.badge === "New" ? 1 : 0;
      return score(b) - score(a);
    });
    case "discounted": return arr.sort((a, b) => {
      if (a.badge === "Sold out" && b.badge !== "Sold out") return 1;
      if (b.badge === "Sold out" && a.badge !== "Sold out") return -1;
      return b.priceInr - a.priceInr;
    });
  }
}

export default function HomeContent() {
  const [activeSort, setActiveSort] = useState<SortKey>("fresh");

  const nonCorsets = useMemo(
    () => products.filter((p) => p.slug === "corset" || !p.displayName.toLowerCase().includes("corset")),
    []
  );
  const displayed = useMemo(() => applySort(nonCorsets, activeSort), [activeSort, nonCorsets]);

  return (
    <>
      {/* Sub-nav row: category links only on home */}
      <nav className="sub-nav">
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {mainNavLinks.map((link) => (
            <a key={link.label} href={link.href} style={{ flexShrink: 0 }}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <CorsetSection />
      <ProductGrid items={displayed} />
      <MoreFeatured />
    </>
  );
}
