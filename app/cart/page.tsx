"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, totalItems } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div style={{ padding: "2rem var(--page-margin) 4rem", minHeight: "60vh" }}>
      <h1
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        Your Shopping Bag{totalItems > 0 && <span style={{ opacity: 0.4, marginLeft: "0.5rem" }}>[{totalItems}]</span>}
      </h1>

      {items.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "400px" }}>
          <p style={{ fontSize: "0.875rem", opacity: 0.6 }}>No items in your bag.</p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "inherit",
              textDecoration: "none",
              borderBottom: "1px solid currentColor",
              paddingBottom: "0.125rem",
            }}
          >
            See what&apos;s new →
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0", maxWidth: "900px" }}>
          {/* Items */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  alignItems: "flex-start",
                }}
              >
                {/* Image */}
                <Link href={`/products/${item.product.slug}`}>
                  <div
                    style={{
                      position: "relative",
                      width: "100px",
                      aspectRatio: "4/5",
                      backgroundColor: "#f5f5f3",
                      flexShrink: 0,
                    }}
                  >
                    <Image src={item.product.image} alt={item.product.displayName} fill className="object-cover" sizes="100px" />
                  </div>
                </Link>

                {/* Details */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <Link
                    href={`/products/${item.product.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p style={{ fontSize: "0.6875rem", letterSpacing: "0.02em", textTransform: "capitalize" }}>
                      {item.product.displayName}
                    </p>
                  </Link>
                  <p style={{ fontSize: "0.6875rem", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {item.product.category}
                  </p>
                  {item.size !== "O/S" && (
                    <p style={{ fontSize: "0.6875rem", opacity: 0.6 }}>Size: {item.size}</p>
                  )}
                  <p style={{ fontSize: "0.6875rem", marginTop: "0.25rem" }}>
                    {formatPrice(item.product.priceInr)}
                  </p>

                  {/* Quantity + Remove */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: "0 0.25rem" }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: "0.6875rem", minWidth: "1.5rem", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: "0 0.25rem" }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.625rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        opacity: 0.45,
                        padding: 0,
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <p style={{ fontSize: "0.6875rem", flexShrink: 0, paddingTop: "0.125rem" }}>
                  {formatPrice(item.product.priceInr * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: "360px",
              marginLeft: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "1rem" }}>
              <span style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Subtotal</span>
              <span style={{ fontSize: "0.6875rem" }}>{formatPrice(subtotal)}</span>
            </div>
            <p style={{ fontSize: "0.625rem", opacity: 0.5 }}>
              Duties and taxes included. Shipping calculated at checkout.
            </p>
            <Link
              href="/checkout"
              style={{
                display: "block",
                background: "#000",
                color: "#fff",
                padding: "0.875rem 1.5rem",
                textAlign: "center",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/"
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "0.6875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "inherit",
                textDecoration: "none",
                opacity: 0.5,
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
