"use client";

import { useState, useMemo } from "react";
import { mainNavLinks, type Product } from "@/lib/products";
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

interface Props {
  items: Product[];
}

export default function CollectionContent({ items }: Props) {
  const [activeSort, setActiveSort] = useState<SortKey>("fresh");
  const [sortOpen, setSortOpen] = useState(false);

  const displayed = useMemo(() => applySort(items, activeSort), [items, activeSort]);
  const activeLabel = SORTS.find(s => s.key === activeSort)?.label ?? "Fresh";

  return (
    <>
      {/* Sub-nav row with Sort By on the right */}
      <nav className="sub-nav" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {mainNavLinks.map((link) => (
            <a key={link.label} href={link.href} style={{ flexShrink: 0 }}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Sort By dropdown */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setSortOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: 0,
            }}
          >
            <span style={{ opacity: 0.5 }}>Sort:</span>
            <span>{activeLabel}</span>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.5rem", height: "0.5rem", transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
              <path d="M2 4l3 3 3-3" />
            </svg>
          </button>

          {sortOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 0.5rem)",
                right: 0,
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.12)",
                zIndex: 50,
                minWidth: "160px",
              }}
            >
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => { setActiveSort(s.key); setSortOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.625rem 1rem",
                    background: activeSort === s.key ? "rgba(0,0,0,0.05)" : "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.625rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "inherit",
                    fontWeight: activeSort === s.key ? 500 : 400,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <ProductGrid items={displayed} />
      <MoreFeatured />
    </>
  );
}
