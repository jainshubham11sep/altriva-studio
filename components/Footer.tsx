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
        backgroundColor: subscribed
          ? "oklch(0.85 0.0581 148.13)"
          : "#f2f2eb",
      }}
    >
      {/* Large footer logo — same as JWA */}
      <div
        style={{
          width: "100%",
          paddingBottom: "2rem",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          marginBottom: "2rem",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="Altriva Studio"
          style={{ width: "100%", height: "auto", maxHeight: "120px", objectFit: "contain", objectPosition: "left" }}
        />
      </div>

      <div
        className="w-full max-w-none grid gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        }}
      >
        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, items]) => (
          <div key={heading} className="flex flex-col gap-1">
            <span className="text-body font-medium mb-2">{heading}</span>
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-caption py-2 hover:italic transition-all block"
                style={{ color: "rgba(0,0,0,0.7)" }}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}

        {/* Newsletter column */}
        <div className="flex flex-col gap-3" style={{ maxWidth: "320px" }}>
          <span className="text-body font-medium">
            Newsletters that smell nice.<br />Subscribe.
          </span>

          {subscribed ? (
            <p className="text-caption" style={{ color: "rgba(0,0,0,0.7)" }}>
              You&apos;re on the list!<br />Cheers. You will not regret it.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative border-b border-black/30 pb-1">
                <label
                  htmlFor="newsletter-email"
                  className="text-caption block mb-1"
                  style={{ fontSize: "0.625rem", opacity: email ? 1 : 0.5 }}
                >
                  Your email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-caption focus:outline-none"
                  style={{ fontSize: "0.75rem" }}
                />
              </div>

              {email && (
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 w-3.5 h-3.5 cursor-pointer appearance-none border border-black/30 checked:bg-black checked:border-black focus:outline-none"
                  />
                  <span className="text-caption" style={{ fontSize: "0.625rem", opacity: 0.7 }}>
                    I agree to receive the marketing communications from JWA and accept the{" "}
                    <a href="#" className="underline">Terms of Use</a> and{" "}
                    <a href="#" className="underline">Privacy Policy</a>.
                  </span>
                </label>
              )}

              <button
                type="submit"
                className="nav-link text-left hover:opacity-50 transition-opacity"
                style={{ color: "#000" }}
              >
                Subscribe →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-auto pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "2rem", marginTop: "4rem" }}
      >
        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/jw_anderson"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center gap-2"
          >
            Follow us on Instagram
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        <p className="text-caption" style={{ opacity: 0.5, fontSize: "0.625rem" }}>
          © 2025 ALTRIVA STUDIO
        </p>

        <button
          className="text-caption flex items-center gap-1 hover:opacity-50 transition-opacity"
          style={{ fontSize: "0.625rem" }}
        >
          India (₹)
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3 h-3">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
