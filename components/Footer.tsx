"use client";

import { useState } from "react";
import Image from "next/image";
import { footerLinks } from "@/lib/products";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [consent, setConsent] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openAssistance, setOpenAssistance] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) setSubscribed(true);
  };

  const aboutLinks = footerLinks[Object.keys(footerLinks)[0] as keyof typeof footerLinks];
  const assistanceLinks = footerLinks[Object.keys(footerLinks)[1] as keyof typeof footerLinks];

  return (
    <footer style={{ backgroundColor: subscribed ? "oklch(0.85 0.0581 148.13)" : "#f2f2eb", position: "relative", overflow: "hidden" }}>
      <style>{`
        /* ── Accordion columns ── */
        .footer-cols {
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .footer-acc {
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .footer-acc-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          padding: 1.25rem var(--page-margin);
          color: inherit;
          text-align: left;
        }
        .footer-acc-label {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.0625rem;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .footer-acc-chevron {
          flex-shrink: 0;
          opacity: 0.4;
          transition: transform 0.2s;
        }

        /* Links: hidden on mobile by default, shown when .open */
        .footer-acc-links {
          display: none;
          padding: 0 var(--page-margin) 1.5rem;
        }
        .footer-acc-links.open {
          display: block;
        }

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

        /* ── Desktop: 2-col, still accordion ── */
        @media (min-width: 768px) {
          .footer-cols {
            border-top: none;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 2rem;
            padding: 3rem var(--page-margin) 0;
            padding-right: calc(var(--page-margin) + var(--logo-panel-width));
            align-items: start;
          }
          .footer-acc {
            border-bottom: 1px solid rgba(0,0,0,0.1);
          }
          .footer-acc-btn {
            padding: 1.25rem 0;
          }
          .footer-acc-links {
            padding: 0 0 1.5rem;
          }
        }

        /* ── Newsletter ── */
        .footer-newsletter {
          padding: 2rem var(--page-margin) 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.1);
          margin-top: 2rem;
        }
        @media (min-width: 768px) {
          .footer-newsletter {
            padding-right: calc(var(--page-margin) + var(--logo-panel-width));
          }
        }

        /* ── Instagram ── */
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

        /* ── Mobile brand logo ── */
        .footer-brand-mobile {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5rem 0 4rem;
        }
        @media (min-width: 1024px) {
          .footer-brand-mobile { display: none; }
        }
      `}</style>

      {/* ── Accordion columns ── */}
      <div className="footer-cols">

        {/* About */}
        <div className="footer-acc">
          <button className="footer-acc-btn" onClick={() => setOpenAbout(o => !o)}>
            <span className="footer-acc-label">About</span>
            <svg
              className="footer-acc-chevron"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              style={{ width: "0.625rem", height: "0.625rem", transform: openAbout ? "rotate(180deg)" : "none" }}
            >
              <path d="M2 4l3 3 3-3" />
            </svg>
          </button>
          <div className={`footer-acc-links${openAbout ? " open" : ""}`}>
            {aboutLinks.map((item) => (
              <a key={item.label} href={item.href} className="footer-link">{item.label}</a>
            ))}
          </div>
        </div>

        {/* Assistance */}
        <div className="footer-acc">
          <button className="footer-acc-btn" onClick={() => setOpenAssistance(o => !o)}>
            <span className="footer-acc-label">Assistance</span>
            <svg
              className="footer-acc-chevron"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              style={{ width: "0.625rem", height: "0.625rem", transform: openAssistance ? "rotate(180deg)" : "none" }}
            >
              <path d="M2 4l3 3 3-3" />
            </svg>
          </button>
          <div className={`footer-acc-links${openAssistance ? " open" : ""}`}>
            {assistanceLinks.map((item) => (
              <a key={item.label} href={item.href} className="footer-link">{item.label}</a>
            ))}
          </div>
        </div>

      </div>

      {/* ── Newsletter ── */}
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

        <a
          href="https://www.instagram.com/altriva_?igsh=NzA5cWs1ZTB0amM2"
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

      {/* ── Brand logo (mobile only) ── */}
      <div className="footer-brand-mobile" aria-hidden="true">
        <div style={{ position: "relative", width: "22vw", height: "calc(22vw * 4.5625)" }}>
          <Image
            src="/images/altriva-logo.png"
            alt="Altriva Studio"
            width={730}
            height={160}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: "22vw",
              width: "auto",
              maxWidth: "none",
              transform: "translate(-50%, -50%) rotate(-90deg)",
            }}
          />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ padding: "1.25rem var(--page-margin)", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
        <p style={{ fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5 }}>
          © 2025 ALTRIVA STUDIO
        </p>
      </div>
    </footer>
  );
}
