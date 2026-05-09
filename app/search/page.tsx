"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

const FEATURED = [
  { count: 83, label: "Summer Series",  href: "/collections/summer-series" },
  { count: 56, label: "Men's New In",   href: "/collections/mens-new-in" },
  { count: 79, label: "Women's New In", href: "/collections/womens-new-in" },
  { count: 24, label: "All Bags",       href: "/collections/all-bags" },
];

const BROWSE = [
  { label: "Bags",        items: ["All Bags", "Totes", "Shoulder Bags", "Clutches", "Mini Bags"] },
  { label: "Mens",        items: ["Men's New In", "Knitwear", "Shirts", "Trousers", "Outerwear"] },
  { label: "Womens",      items: ["Women's New In", "Dresses", "Tops", "Knitwear", "Outerwear"] },
  { label: "Accessories", items: ["Jewellery", "Sunglasses", "Hats", "Scarves", "Belts"] },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.displayName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div style={{ padding: "1.5rem var(--page-margin) 4rem" }}>
      {/* Search input */}
      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.15)", paddingBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
        <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: "1rem", height: "1rem", opacity: 0.4, flexShrink: 0 }}>
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for…"
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "1rem", letterSpacing: "0.02em", color: "inherit" }}
        />
        {query && (
          <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4, padding: 0, fontSize: "1.25rem", lineHeight: 1 }}>×</button>
        )}
      </div>

      {/* Results */}
      {query && (
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.45, marginBottom: "1.5rem" }}>
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          {results.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {results.slice(0, 20).map((p, i) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  style={{ width: "calc(50% - 0.1875rem)", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "0.5rem" }}
                >
                  <div style={{ position: "relative", aspectRatio: "4/5", backgroundColor: "#f5f5f3" }}>
                    <Image src={p.image} alt={p.displayName} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" loading={i < 4 ? "eager" : "lazy"} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.6875rem", textTransform: "capitalize", lineHeight: 1.3 }}>{p.displayName}</p>
                    <p style={{ fontSize: "0.6875rem", opacity: 0.55, marginTop: "0.2rem" }}>Rs.&nbsp;{p.priceInr.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "0.875rem", opacity: 0.5 }}>No results found. Try a different search term.</p>
          )}
        </div>
      )}

      {/* Default state — no query */}
      {!query && (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {/* Featured collections */}
          <div>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.45, marginBottom: "1rem" }}>
              Featured Collections
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {FEATURED.map((f) => (
                <Link
                  key={f.label}
                  href={f.href}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(0,0,0,0.08)", textDecoration: "none", color: "inherit" }}
                >
                  <span style={{ fontSize: "0.6875rem", opacity: 0.4 }}>[{f.count}]</span>
                  <span style={{ fontSize: "0.875rem" }}>{f.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Browse sections */}
          <div>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.45, marginBottom: "1.5rem" }}>
              Browse
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "2rem" }}>
              {BROWSE.map((section) => (
                <div key={section.label}>
                  <p style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem", opacity: 0.45 }}>
                    {section.label}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {section.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/collections/${item.toLowerCase().replace(/['']/g, "").replace(/\s+/g, "-")}`}
                          style={{ fontSize: "0.875rem", color: "inherit", textDecoration: "none", display: "block", padding: "0.25rem 0", transition: "font-style 0.1s" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "italic")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "normal")}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem var(--page-margin)", opacity: 0.4, fontSize: "0.875rem" }}>Loading…</div>}>
      <SearchContent />
    </Suspense>
  );
}
