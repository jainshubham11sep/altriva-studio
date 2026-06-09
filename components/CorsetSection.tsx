"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

const corsets = products.filter((p) =>
  p.displayName.toLowerCase().includes("corset")
);

export default function CorsetSection() {
  if (corsets.length === 0) return null;

  return (
    <section
      style={{
        padding: "2.5rem 0 4rem",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        marginBottom: "4rem",
      }}
    >
      <style>{`
        .corset-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 0 var(--page-margin);
          margin-bottom: 1.75rem;
        }
        .corset-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.375rem;
          row-gap: 2.5rem;
        }
        .corset-card-main {
          grid-column: span 2;
        }
        @media (min-width: 768px) {
          .corset-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            row-gap: 3rem;
            padding: 0 var(--page-margin);
          }
          .corset-card-main {
            grid-column: span 1;
          }
        }
        @media (min-width: 1024px) {
          .corset-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 0.75rem;
            row-gap: 3rem;
          }
          .corset-card-main {
            grid-column: span 1;
          }
        }
      `}</style>

      {/* Section heading */}
      <div className="corset-header">
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "1.125rem",
            letterSpacing: "0.01em",
            fontWeight: 400,
          }}>
            The Corset Edit
          </span>
          <span style={{ fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4 }}>
            {corsets.length} styles
          </span>
        </div>
        <Link
          href="/collections/womens-new-in"
          style={{
            fontSize: "0.5625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "inherit",
            textDecoration: "none",
            opacity: 0.5,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.5")}
        >
          View all →
        </Link>
      </div>

      {/* Corset grid */}
      <div className="corset-grid">
        {corsets.map((product, i) => (
          <CorsetCard key={product.id} product={product} index={i} isMain={i === 0} />
        ))}
      </div>
    </section>
  );
}

function CorsetCard({ product, index, isMain }: { product: ReturnType<typeof products.filter>[0]; index: number; isMain: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-card flex flex-col${isMain ? " corset-card-main" : ""}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        gap: "0.75rem",
        animationDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: isMain ? "2/3" : "4/5",
          backgroundColor: "#f5f4f2",
          overflow: "hidden",
        }}
      >
        <Image
          src={product.image}
          alt={product.displayName}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: hovered && product.hoverImage ? 0 : 1 }}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 16vw"
          loading={index === 0 ? "eager" : "lazy"}
          priority={index === 0}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt=""
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 16vw"
            loading="lazy"
          />
        )}
        {product.badge && (
          <span style={{
            position: "absolute", top: "0.5rem", left: "0.5rem", zIndex: 20,
            background: "#000", color: "#fff", fontSize: "0.5rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0.2rem 0.375rem", lineHeight: 1.4, pointerEvents: "none",
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "0 var(--page-margin)", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <p style={{
          fontSize: "0.6875rem", letterSpacing: "0.01em",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          transition: "font-style 0.1s",
        }}
          className="product-name"
        >
          {product.displayName}
        </p>
        <p style={{ fontSize: "0.6875rem", letterSpacing: "0.01em", opacity: 0.65 }}>
          Rs.&nbsp;{product.priceInr.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}
