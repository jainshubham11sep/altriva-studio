"use client";

import { useState } from "react";
import { footerLinks } from "@/lib/products";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) setSubscribed(true);
  };

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: subscribed ? "oklch(0.85 0.0581 148.13)" : "#f2f2eb",
        padding: 0,
        gap: 0,
      }}
    >
      {/* ── Large wordmark — exact JWA style ── */}
      <div
        style={{
          padding: "2rem var(--page-margin) 0",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          paddingBottom: "1.5rem",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="Altriva Studio"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            objectFit: "contain",
            objectPosition: "left center",
          }}
        />
      </div>

      {/* ── Main content grid ── */}
      <div
        style={{
          padding: "2rem var(--page-margin)",
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "1fr",
        }}
        className="footer-grid"
      >
        <style>{`
          @media (min-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr 1fr 1.6fr;
              gap: 1.5rem;
              align-items: start;
            }
          }
        `}</style>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, items]) => (
          <div key={heading} className="flex flex-col">
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.45,
                marginBottom: "1rem",
                display: "block",
              }}
            >
              {heading}
            </span>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
              {items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.02em",
                      color: "inherit",
                      textDecoration: "none",
                      display: "block",
                      padding: "0.375rem 0",
                      transition: "font-style 0.1s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "italic")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "normal")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Empty spacer column on desktop (shows in 4-col grid) */}
        <div className="hidden md:block" />

        {/* Newsletter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "1.125rem",
              lineHeight: 1.4,
              letterSpacing: "0.01em",
            }}
          >
            Newsletters that smell nice.<br />Subscribe.
          </p>

          {subscribed ? (
            <p style={{ fontSize: "0.6875rem", opacity: 0.7, lineHeight: 1.5 }}>
              You&apos;re on the list!<br />Cheers. You will not regret it.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ borderBottom: "1px solid rgba(0,0,0,0.3)", paddingBottom: "0.375rem" }}>
                <label
                  htmlFor="footer-email"
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
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "0.75rem",
                    letterSpacing: "0.02em",
                    color: "inherit",
                  }}
                />
              </div>

              {email && (
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    style={{
                      marginTop: "0.125rem",
                      width: "0.875rem",
                      height: "0.875rem",
                      flexShrink: 0,
                      cursor: "pointer",
                      accentColor: "#000",
                    }}
                  />
                  <span style={{ fontSize: "0.625rem", opacity: 0.65, lineHeight: 1.5 }}>
                    I agree to receive the marketing communications from JWA and accept the{" "}
                    <a href="/pages/terms-conditions" style={{ textDecoration: "underline", color: "inherit" }}>Terms of Use</a>{" "}
                    and{" "}
                    <a href="/pages/privacy-policy" style={{ textDecoration: "underline", color: "inherit" }}>Privacy Policy</a>.
                  </span>
                </label>
              )}

              <button
                type="submit"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "inherit",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Subscribe →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          padding: "1.25rem var(--page-margin)",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        {/* Instagram */}
        <a
          href="https://www.instagram.com/altrivastudio"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.6875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "inherit",
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Follow us on Instagram
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "0.875rem", height: "0.875rem" }} aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>

        {/* Copyright */}
        <p style={{ fontSize: "0.625rem", letterSpacing: "0.05em", opacity: 0.45 }}>
          © 2025 ALTRIVA STUDIO
        </p>

        {/* Currency */}
        <button
          style={{
            background: "none",
            border: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.625rem",
            letterSpacing: "0.05em",
            cursor: "pointer",
            color: "inherit",
            opacity: 0.7,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
        >
          India (₹)
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.75rem", height: "0.75rem" }} aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
