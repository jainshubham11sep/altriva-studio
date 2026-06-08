"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  index: number;
}

const BADGE_COLORS: Record<string, string> = {
  "New":        "#000",
  "Coming soon":"#000",
  "Exclusive":  "#000",
  "Sold out":   "#000",
};

export default function ProductCard({ product, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card flex flex-col"
      style={{ animationDelay: `${index * 0.04}s`, textDecoration: "none", color: "inherit", gap: "0.5rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#f5f4f2",
          aspectRatio: product.aspect === "portrait" ? "4/5" : "1/1",
        }}
      >
        <Image
          src={product.image}
          alt={product.displayName}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: hovered && product.hoverImage ? 0 : 1 }}
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          loading={index < 8 ? "eager" : "lazy"}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt=""
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            loading="lazy"
          />
        )}

        {/* Badge — JWA-style: top-left corner, minimal */}
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: "0.5rem",
              left: "0.5rem",
              zIndex: 20,
              background: BADGE_COLORS[product.badge] ?? "#000",
              color: "#fff",
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.2rem 0.375rem",
              lineHeight: 1.4,
              pointerEvents: "none",
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info area */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", paddingBottom: "0.125rem", minHeight: "3rem" }}>
        <h2 className="product-name">{product.displayName}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.6875rem", letterSpacing: "0.01em" }}>
          <span>Rs.&nbsp;{product.priceInr.toLocaleString("en-IN")}</span>
          {product.colors && product.colors > 1 && (
            <>
              <span style={{ opacity: 0.25 }}>·</span>
              <span style={{ fontStyle: "italic", opacity: 0.55 }}>
                {product.colors} colours
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
