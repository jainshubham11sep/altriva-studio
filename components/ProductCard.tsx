"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useWishlist } from "@/contexts/WishlistContext";

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
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="product-card flex flex-col"
      style={{ animationDelay: `${index * 0.04}s`, gap: "0.5rem", position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/products/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
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

      {/* Wishlist heart — absolute over top-right of image */}
      <button
        onClick={(e) => { e.stopPropagation(); toggle(product); }}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          zIndex: 20,
          background: "rgba(255,255,255,0.85)",
          border: "none",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          opacity: wishlisted ? 1 : hovered ? 0.85 : 0,
          transition: "opacity 0.15s",
        }}
      >
        <svg viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" style={{ width: "0.875rem", height: "0.875rem", color: wishlisted ? "#c00" : "#000" }}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
}
