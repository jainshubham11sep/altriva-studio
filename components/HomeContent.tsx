"use client";

import { useState, useMemo } from "react";
import { products, mainNavLinks, type Product } from "@/lib/products";
import ProductGrid from "./ProductGrid";
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

  const displayed = useMemo(() => applySort(products, activeSort), [activeSort]);

  return (
    <>
      {/* Sub-nav row: category links left, sort dropdown right */}
      <nav className="sub-nav" style={{ justifyContent: "space-between" }}>
        {/* Category links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", overflowX: "auto", scrollbarWidth: "none" }}>
          {mainNavLinks.map((link) => (
            <a key={link.label} href={link.href} style={{ flexShrink: 0 }}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Sort by dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0, marginLeft: "1.5rem" }}>
          <span style={{ fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.4, whiteSpace: "nowrap" }}>
            Sort by
          </span>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as SortKey)}
              aria-label="Sort products"
              style={{
                appearance: "none",
                background: "transparent",
                border: "none",
                padding: "0 1rem 0 0",
                fontSize: "0.5625rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                color: "inherit",
                fontFamily: "inherit",
                outline: "none",
              }}
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.3"
              style={{ width: "0.45rem", height: "0.45rem", position: "absolute", right: 0, pointerEvents: "none", opacity: 0.45 }}>
              <path d="M1 1l4 4 4-4" />
            </svg>
          </div>
        </div>
      </nav>

      <ProductGrid items={displayed} />
      <MoreFeatured />
    </>
  );
}
