"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div style={{ paddingBottom: "5rem" }}>
      <div style={{ padding: "2.5rem var(--page-margin) 0" }}>
        <p style={{ fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: "0.5rem" }}>
          Altriva Studio
        </p>
        <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 400, letterSpacing: "0.01em", marginBottom: "0.375rem" }}>
          Wishlist
        </h1>
        {items.length > 0 && (
          <p style={{ fontSize: "0.6875rem", opacity: 0.45, letterSpacing: "0.02em" }}>
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "4rem var(--page-margin)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ width: "2.5rem", height: "2.5rem", opacity: 0.2 }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 400, opacity: 0.55 }}>
            Your wishlist is empty.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#000",
              color: "#fff",
              padding: "0.875rem 2rem",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div style={{ padding: "2rem var(--page-margin) 0" }}>
          <style>{`
            .wishlist-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 0.375rem;
              row-gap: 2.5rem;
            }
            @media (min-width: 768px) {
              .wishlist-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 0.75rem;
                row-gap: 3rem;
              }
            }
          `}</style>
          <div className="wishlist-grid">
            {items.map((product) => (
              <div key={product.id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative" }}>
                <Link href={`/products/${product.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div
                    style={{
                      backgroundColor: "#f5f4f2",
                      aspectRatio: product.aspect === "portrait" ? "4/5" : "1/1",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.displayName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 50vw, 25vw"
                    />
                    {product.badge && (
                      <span style={{ position: "absolute", top: "0.5rem", left: "0.5rem", background: "#000", color: "#fff", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.2rem 0.375rem", lineHeight: 1.4 }}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <p style={{ fontSize: "0.6875rem", letterSpacing: "0.02em", textTransform: "capitalize" }}>{product.displayName}</p>
                    <p style={{ fontSize: "0.6875rem", opacity: 0.55 }}>{formatPrice(product.priceInr)}</p>
                  </div>
                </Link>

                <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.25rem" }}>
                  <button
                    onClick={() => addItem(product, "O/S")}
                    style={{
                      flex: 1,
                      background: "#000",
                      color: "#fff",
                      border: "none",
                      padding: "0.625rem 0.75rem",
                      fontSize: "0.5625rem",
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => toggle(product)}
                    aria-label="Remove from wishlist"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(0,0,0,0.15)",
                      padding: "0.625rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "0.875rem", height: "0.875rem", opacity: 0.4 }}>
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
