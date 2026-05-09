"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function BagDrawer() {
  const { drawerOpen, closeDrawer, lastAdded, items, subtotal, totalItems } = useCart();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeDrawer]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)",
          zIndex: 300, backdropFilter: "blur(2px)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 301,
          width: "min(420px, 100vw)",
          background: "#fff",
          display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
          animation: "slideInRight 0.25s ease",
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <span style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Your Bag{totalItems > 0 && <span style={{ opacity: 0.4, marginLeft: "0.375rem" }}>[{totalItems}]</span>}
          </span>
          <button
            onClick={closeDrawer}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", lineHeight: 1 }}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.2929 12L5.14642 5.85359L5.85353 5.14648L12 11.2929L18.1464 5.14648L18.8535 5.85359L12.7071 12L18.8535 18.1465L18.1464 18.8536L12 12.7071L5.85353 18.8536L5.14642 18.1465L11.2929 12Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Just added banner */}
        {lastAdded && (
          <div style={{ background: "#f5f5f3", padding: "0.75rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "14px", height: "14px", flexShrink: 0 }}>
              <path d="M2 8l4 4 8-8" />
            </svg>
            <span style={{ fontSize: "0.625rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Added to bag</span>
          </div>
        )}

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 1.25rem" }}>
          {items.length === 0 ? (
            <div style={{ padding: "2rem 0", textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem", opacity: 0.5 }}>Your bag is empty.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  style={{
                    display: "flex", gap: "0.875rem", padding: "1rem 0",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    alignItems: "flex-start",
                    background: lastAdded?.product.id === item.product.id && lastAdded?.size === item.size ? "rgba(0,0,0,0.02)" : "transparent",
                    transition: "background 0.3s",
                  }}
                >
                  <Link href={`/products/${item.product.slug}`} onClick={closeDrawer}>
                    <div style={{ position: "relative", width: "72px", aspectRatio: "4/5", backgroundColor: "#f5f5f3", flexShrink: 0 }}>
                      <Image src={item.product.image} alt={item.product.displayName} fill className="object-cover" sizes="72px" />
                    </div>
                  </Link>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <Link href={`/products/${item.product.slug}`} onClick={closeDrawer} style={{ textDecoration: "none", color: "inherit" }}>
                      <p style={{ fontSize: "0.6875rem", textTransform: "capitalize", lineHeight: 1.3 }}>
                        {item.product.displayName}
                      </p>
                    </Link>
                    {item.size !== "O/S" && (
                      <p style={{ fontSize: "0.625rem", opacity: 0.5 }}>Size: {item.size}</p>
                    )}
                    <p style={{ fontSize: "0.6875rem", marginTop: "0.25rem" }}>
                      Rs.&nbsp;{item.product.priceInr.toLocaleString("en-IN")}
                    </p>
                    <p style={{ fontSize: "0.625rem", opacity: 0.45, marginTop: "0.125rem" }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — subtotal + CTAs */}
        {items.length > 0 && (
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Subtotal</span>
              <span style={{ fontSize: "0.875rem" }}>Rs.&nbsp;{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <p style={{ fontSize: "0.5625rem", opacity: 0.4 }}>Duties &amp; taxes included. Shipping calculated at checkout.</p>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              style={{
                display: "block", textAlign: "center",
                background: "#000", color: "#fff",
                padding: "0.9375rem", fontSize: "0.6875rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              style={{
                display: "block", textAlign: "center",
                background: "transparent", color: "inherit",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "0.9375rem", fontSize: "0.6875rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              View Bag
            </Link>
            <button
              onClick={closeDrawer}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.625rem", opacity: 0.45, letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
