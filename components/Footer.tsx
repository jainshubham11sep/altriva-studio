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
    <footer style={{ backgroundColor: subscribed ? "oklch(0.85 0.0581 148.13)" : "#f2f2eb", position: "relative", overflow: "hidden" }}>
      <style>{`
        /* ── Grid ── */
        /* Mobile: About | Assistance (2-col), then Newsletter full-width below */
        .footer-grid {
          padding: 3rem var(--page-margin) 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "about      assistance"
            "newsletter newsletter";
          gap: 3rem 2rem;
          align-items: start;
        }
        /* Desktop: About | Assistance | Newsletter side by side */
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1.6fr;
            grid-template-areas: "about assistance newsletter";
            padding-right: calc(var(--page-margin) + 140px);
          }
        }
        .footer-about      { grid-area: about; }
        .footer-assistance { grid-area: assistance; }
        .footer-newsletter { grid-area: newsletter; display: flex; flex-direction: column; gap: 1.5rem; }

        /* ── Column headings ── */
        .footer-col-heading {
          display: block;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.0625rem;
          font-weight: 400;
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
        }

        /* ── Links ── */
        .footer-link {
          display: block;
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: inherit;
          text-decoration: none;
          padding: 0.5rem 0;
          transition: font-style 0.1s;
        }
        .footer-link:hover { font-style: italic; }

        /* ── Instagram link ── */
        .footer-ig {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: inherit;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .footer-ig:hover { opacity: 0.5; }

        /* ── Vertical brand text ── */
        .footer-brand-mobile {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 3rem 0 2rem;
          overflow: hidden;
        }
        .footer-brand-desktop { display: none; }

        @media (min-width: 768px) {
          .footer-brand-mobile { display: none; }
          .footer-brand-desktop {
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 140px;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            overflow: hidden;
          }
        }
      `}</style>

      {/* ── Main grid ── */}
      <div className="footer-grid">

        {/* About */}
        <div className="footer-about">
          <span className="footer-col-heading">{Object.keys(footerLinks)[0]}</span>
          {footerLinks[Object.keys(footerLinks)[0] as keyof typeof footerLinks].map((item) => (
            <a key={item.label} href={item.href} className="footer-link">{item.label}</a>
          ))}
        </div>

        {/* Assistance */}
        <div className="footer-assistance">
          <span className="footer-col-heading">{Object.keys(footerLinks)[1]}</span>
          {footerLinks[Object.keys(footerLinks)[1] as keyof typeof footerLinks].map((item) => (
            <a key={item.label} href={item.href} className="footer-link">{item.label}</a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.0625rem", lineHeight: 1.5, letterSpacing: "0.01em" }}>
            Newsletters that smell nice.<br />Subscribe.
          </p>

          {subscribed ? (
            <p style={{ fontSize: "0.6875rem", opacity: 0.7, lineHeight: 1.6 }}>
              You&apos;re on the list!<br />Cheers.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ borderBottom: "1px solid rgba(0,0,0,0.25)", paddingBottom: "0.5rem" }}>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "0.875rem", letterSpacing: "0.02em", color: "inherit" }}
                />
              </div>

              {email && (
                <>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      style={{ marginTop: "0.125rem", width: "0.8125rem", height: "0.8125rem", flexShrink: 0, cursor: "pointer", accentColor: "#000" }}
                    />
                    <span style={{ fontSize: "0.5625rem", opacity: 0.6, lineHeight: 1.6, letterSpacing: "0.01em" }}>
                      I agree to receive marketing emails from Altriva Studio and accept the{" "}
                      <a href="/pages/terms-conditions" style={{ textDecoration: "underline", color: "inherit" }}>Terms of Use</a>{" "}
                      and{" "}
                      <a href="/pages/privacy-policy" style={{ textDecoration: "underline", color: "inherit" }}>Privacy Policy</a>.
                    </span>
                  </label>
                  <button
                    type="submit"
                    style={{ background: "none", border: "none", padding: 0, fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", textAlign: "left", color: "inherit" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.4")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    Subscribe →
                  </button>
                </>
              )}
            </form>
          )}

          {/* Instagram — in newsletter column, matches JWA layout */}
          <a
            href="https://www.instagram.com/altrivastudio"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ig"
          >
            Follow us on Instagram
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: "1.125rem", height: "1.125rem", flexShrink: 0 }} aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Brand text: in-flow on mobile, absolute on desktop ── */}
      <div className="footer-brand-mobile" aria-hidden="true">
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "clamp(4rem, 20vw, 8rem)",
          fontWeight: 400,
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          lineHeight: 1,
          whiteSpace: "nowrap",
          letterSpacing: "0.02em",
        }}>
          ALTRIVA STUDIO
        </span>
      </div>

      <div className="footer-brand-desktop" aria-hidden="true">
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "5rem",
          fontWeight: 400,
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          lineHeight: 1,
          whiteSpace: "nowrap",
          letterSpacing: "0.02em",
        }}>
          ALTRIVA STUDIO
        </span>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          padding: "1.25rem var(--page-margin)",
          borderTop: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5 }}>
          © 2025 ALTRIVA STUDIO
        </p>
      </div>
    </footer>
  );
}
