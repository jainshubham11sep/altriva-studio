"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "altriva_discount_shown";
const COUPON = "ALTRIVA10";

export default function DiscountPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    // Show after 2.5 minutes of browsing
    const timer = setTimeout(() => setVisible(true), 150000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setClaimed(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(COUPON).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "rgba(0,0,0,0.35)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 301,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "#f2f2eb",
            width: "100%",
            maxWidth: "420px",
            padding: "2.5rem 2rem",
            position: "relative",
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.45,
              padding: "0.25rem",
              lineHeight: 1,
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "1rem", height: "1rem" }}>
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>

          {/* Logo text */}
          <p style={{ fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.45 }}>
            Altriva Studio
          </p>

          {!claimed ? (
            <>
              <div>
                <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.2, letterSpacing: "0.01em", marginBottom: "0.625rem" }}>
                  10% off your<br />first order.
                </h2>
                <p style={{ fontSize: "0.75rem", opacity: 0.6, lineHeight: 1.6, letterSpacing: "0.015em" }}>
                  Sign up and receive an exclusive discount on your first purchase.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ borderBottom: "1px solid rgba(0,0,0,0.3)", paddingBottom: "0.375rem" }}>
                  <label
                    htmlFor="popup-email"
                    style={{
                      display: "block",
                      fontSize: "0.625rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      opacity: email ? 1 : 0.4,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Your email
                  </label>
                  <input
                    id="popup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.8125rem",
                      letterSpacing: "0.02em",
                      color: "inherit",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    padding: "0.9375rem 1.5rem",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Claim Discount
                </button>
              </form>

              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: "0.625rem",
                  letterSpacing: "0.05em",
                  opacity: 0.45,
                  cursor: "pointer",
                  textAlign: "left",
                  textDecoration: "underline",
                }}
              >
                No thanks
              </button>
            </>
          ) : (
            <>
              <div>
                <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.2, letterSpacing: "0.01em", marginBottom: "0.625rem" }}>
                  Your code<br />is ready.
                </h2>
                <p style={{ fontSize: "0.75rem", opacity: 0.6, lineHeight: 1.6 }}>
                  Use it at checkout for 10% off your first order.
                </p>
              </div>

              <button
                onClick={handleCopy}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.15)",
                  padding: "0.875rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  letterSpacing: "0.12em",
                  fontWeight: 500,
                }}
              >
                <span>{COUPON}</span>
                <span style={{ fontSize: "0.625rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.55 }}>
                  {copied ? "Copied!" : "Tap to copy"}
                </span>
              </button>

              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: "0.625rem",
                  letterSpacing: "0.05em",
                  opacity: 0.45,
                  cursor: "pointer",
                  textAlign: "left",
                  textDecoration: "underline",
                }}
              >
                Continue shopping
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
