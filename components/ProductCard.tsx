"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const { toggle, isWishlisted } = useWishlist();
  const { formatPrice } = useCurrency();
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="product-card"
      style={{ animationDelay: `${index * 0.04}s`, position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/products/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: product.aspect === "portrait" ? "4/5" : "1/1",
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
                background: "#000",
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

        {/* Info — inset text to match edge-to-edge images on mobile */}
        <div style={{ padding: "0 var(--page-margin)", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <p
            className="product-name"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.01em",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.displayName}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.6875rem", letterSpacing: "0.01em", opacity: 0.65 }}>
            <span>{formatPrice(product.priceInr)}</span>
            {product.colors && product.colors > 1 && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span style={{ fontStyle: "italic", opacity: 0.85 }}>
                  {product.colors} colours
                </span>
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist heart — top-right of image */}
      <button
        onClick={() => toggle(product)}
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
