"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

const mensCount = products.filter(p => p.category === "MENS NEW IN").length;
const womensCount = products.filter(p => p.category === "WOMENS NEW IN").length;

const moreFeatured = [
  { count: mensCount,   label: "Men's New In",   href: "/collections/mens-new-in" },
  { count: womensCount, label: "Women's New In",  href: "/collections/womens-new-in" },
];

export default function MoreFeatured() {
  const [open, setOpen] = useState(true);

  return (
    <section style={{ padding: "2.5rem var(--page-margin) 3.5rem" }}>
      <style>{`
        .mf-link { display: flex; align-items: baseline; justify-content: space-between; padding: 1rem 0; border-top: 1px solid rgba(0,0,0,0.1); text-decoration: none; color: inherit; }
        .mf-link:hover .mf-label { font-style: italic; }
        .mf-learn:hover { font-style: italic; }
      `}</style>

      {/* Editorial text block */}
      <div style={{ maxWidth: "520px", marginBottom: "3rem" }}>
        <p
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "1.125rem",
            lineHeight: 1.65,
            letterSpacing: "0.01em",
          }}
        >
          Iconic day-to-night silhouettes; each style reflecting the perfect
          balance of femininity and modernity. From tailored shirt dresses,
          long-line evening dresses to statement pieces straight from the runway.
        </p>
        <Link
          href="/pages/about-us"
          className="mf-learn"
          style={{
            display: "inline-block",
            marginTop: "0.875rem",
            fontSize: "0.6875rem",
            letterSpacing: "0.06em",
            opacity: 0.55,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Learn more
        </Link>
      </div>

      {/* More Featured accordion */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "1rem 0",
            color: "inherit",
          }}
        >
          <p style={{ fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
            More Featured
          </p>
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.5rem", height: "0.5rem", opacity: 0.4, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            <path d="M2 4l3 3 3-3" />
          </svg>
        </button>

        {open && moreFeatured.map((item) => (
          <Link key={item.label} href={item.href} className="mf-link">
            <span className="mf-label" style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.375rem", lineHeight: 1.2 }}>
              {item.label}
            </span>
            <span style={{ fontSize: "0.5625rem", letterSpacing: "0.06em", opacity: 0.45, fontVariantNumeric: "tabular-nums" }}>
              [ {item.count} ]
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
