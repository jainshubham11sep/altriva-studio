"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency, CURRENCIES } from "@/contexts/CurrencyContext";
import { footerLinks } from "@/lib/products";

const menuCategories = [
  {
    label: "Menswear",
    items: [
      { label: "Men's New In", count: null, href: "/collections/mens-new-in" },
    ],
  },
  {
    label: "Womenswear",
    items: [
      { label: "Women's New In", count: null, href: "/collections/womens-new-in" },
      { label: "The Corset Edit", count: null, href: "/collections/womens-new-in" },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [menuSearch, setMenuSearch] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [menuEmail, setMenuEmail] = useState("");
  const [menuSubscribed, setMenuSubscribed] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const router = useRouter();

  const handleMenuSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (menuSearch.trim()) {
      setMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(menuSearch.trim())}`);
    }
  };

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* ── Main nav bar ── */}
      <header className="site-header">
        {/* Left: Menu | Login | Bag (desktop) / Hamburger (mobile) */}
        <div className="flex items-center gap-4 flex-1">
          {/* Desktop: text buttons */}
          <button
            className="nav-link hidden lg:block"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
          <Link href="/account/login" className="nav-link hidden lg:block">Login</Link>
          <Link href="/cart" className="nav-link hidden lg:block" style={{ position: "relative" }}>
            Bag{totalItems > 0 && <span style={{ marginLeft: "0.25rem", opacity: 0.6 }}>[{totalItems}]</span>}
          </Link>

          {/* Mobile: hamburger — two-line SVG */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 8H21V9H3V8Z" fill="currentColor" />
              <path d="M3 15H21V16H3V15Z" fill="currentColor" />
            </svg>
          </button>
        </div>


        {/* Center: Home link */}
        <Link
          href="/"
          style={{ textDecoration: "none", color: "inherit", position: "absolute", left: "50%", transform: "translateX(-50%)" }}
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: "1.1rem", height: "1.1rem", display: "block" }} aria-hidden="true">
            <path d="M3 12L12 3l9 9" />
            <path d="M9 21V12h6v9" />
            <path d="M3 12v9h18V12" />
          </svg>
        </Link>

        {/* Right: Desktop nav links + Search; Mobile: Search | Login | Bag icons */}
        <div className="flex items-center gap-1 justify-end flex-1">
          {/* Desktop wishlist */}
          <Link href="/wishlist" className="hidden lg:flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Wishlist" style={{ position: "relative" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span style={{ position: "absolute", top: "4px", right: "4px", background: "#000", color: "#fff", borderRadius: "50%", width: "14px", height: "14px", fontSize: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Desktop search */}
          <Link href="/search" className="hidden lg:flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Search">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
          </Link>

          {/* Mobile icons group */}
          <div className="lg:hidden flex items-center gap-1">
            <Link href="/wishlist" className="flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Wishlist" style={{ position: "relative" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span style={{ position: "absolute", top: "4px", right: "4px", background: "#000", color: "#fff", borderRadius: "50%", width: "14px", height: "14px", fontSize: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/search" className="flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Search">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/account/login" className="flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 14C8.13401 14 5 17.134 5 21H4C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor" />
              </svg>
            </Link>
            <Link href="/cart" className="flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Bag" style={{ position: "relative" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V7H9V6ZM8 7V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V7H20V21H4V7H8ZM5 8V20H19V8H5Z" fill="currentColor" />
              </svg>
              {totalItems > 0 && (
                <span style={{ position: "absolute", top: "4px", right: "4px", background: "#000", color: "#fff", borderRadius: "50%", width: "14px", height: "14px", fontSize: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile logo bar — fills gap between nav and sub-nav ── */}
      <div className="mobile-logo-bar lg:hidden">
        <a href="/" aria-label="Home" style={{ textDecoration: "none", display: "block", width: "100%" }}>
          <Image
            src="/images/altriva-logo.png"
            alt="Altriva Studio"
            width={730}
            height={160}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </a>
      </div>

      {/* ── Right logo panel (desktop only) ── */}
      <div className="logo-panel">
        <a
          href="/"
          aria-label="Home"
          style={{ position: "relative", display: "block", width: "100%", height: "100%", textDecoration: "none" }}
        >
          <Image
            src="/images/altriva-logo.png"
            alt="Altriva Studio"
            width={730}
            height={160}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: "120px",
              width: "auto",
              maxWidth: "none",
              transform: "translate(-50%, -50%) rotate(-90deg)",
            }}
          />
        </a>
      </div>

      {/* ── Menu overlay ── */}
      {menuOpen && (
        <div className="menu-overlay" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <style>{`
            /* ── Menu layout ── */
            .mo-body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
            .mo-main { display: flex; flex-direction: column; flex: 1; }
            .mo-cats-col { padding: 1.5rem var(--page-margin) 0; }
            .mo-right { display: none; }
            .mo-footer { border-top: 1px solid rgba(0,0,0,0.12); padding: 1.75rem var(--page-margin) 2.5rem; margin-top: auto; }
            .mo-footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 2.5rem; }
            .mo-newsletter { display: none; }
            .mo-brand { display: none; }

            @media (min-width: 1024px) {
              .mo-body { flex-direction: row; overflow: hidden; }
              .mo-main { flex-direction: row; flex: 1; overflow: hidden; }
              .mo-cats-col { width: 260px; flex-shrink: 0; padding: 2.5rem 0 0 var(--page-margin); overflow-y: auto; display: flex; flex-direction: column; border-right: 1px solid rgba(0,0,0,0.1); }
              .mo-right { display: flex; flex-direction: column; flex: 1; padding: 2.5rem 3rem 2.5rem 3rem; overflow-y: auto; gap: 2.5rem; }
              .mo-footer-grid { grid-template-columns: 1fr 1fr 1.5fr; gap: 2rem 2.5rem; }
              .mo-newsletter { display: block; }
              .mo-brand { position: absolute; top: 0; right: 0; bottom: 0; width: 80px; display: flex; align-items: center; justify-content: center; pointer-events: none; overflow: hidden; }
            }
          `}</style>

          {/* ── Top bar: bordered close + currency ── */}
          <div style={{ height: "var(--nav-height)", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 0, paddingBottom: 0, paddingLeft: "var(--page-margin)", paddingRight: "calc(var(--page-margin) + var(--logo-panel-width))", flexShrink: 0 }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", color: "inherit" }}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "1rem", height: "1rem" }}>
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
            </button>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setCurrencyOpen((o) => !o)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6, color: "inherit", padding: 0, display: "flex", alignItems: "center", gap: "0.25rem" }}
              >
                {currency.label}
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.5rem", height: "0.5rem", transform: currencyOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }}>
                  <path d="M2 4l3 3 3-3" />
                </svg>
              </button>
              {currencyOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 0.375rem)", background: "#f2f2eb", border: "1px solid rgba(0,0,0,0.12)", zIndex: 20, minWidth: "6.5rem" }}>
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      style={{ display: "block", width: "100%", textAlign: "left", background: c.code === currency.code ? "rgba(0,0,0,0.06)" : "none", border: "none", cursor: "pointer", padding: "0.5rem 0.75rem", fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "inherit" }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div className="mo-body">
            <div className="mo-main">

              {/* Left column: search + categories */}
              <div className="mo-cats-col">
                {/* Search */}
                <form
                  onSubmit={handleMenuSearch}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.35)", paddingBottom: "0.4rem", marginBottom: "2.25rem" }}
                >
                  <input
                    type="search"
                    placeholder="Search"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.8125rem", letterSpacing: "0.02em", color: "inherit" }}
                  />
                  <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: "0.8125rem", height: "0.8125rem", opacity: 0.45 }} aria-hidden="true">
                      <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>

                {/* Category names */}
                <ul style={{ listStyle: "none" }}>
                  {menuCategories.map((cat) => (
                    <li key={cat.label}>
                      <button
                        onClick={() => setOpenCategory(openCategory === cat.label ? null : cat.label)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontFamily: "'EB Garamond', Georgia, serif",
                          fontSize: "1.625rem", letterSpacing: "0.005em", color: "inherit",
                          padding: "0.625rem 0", textAlign: "left", display: "block", width: "100%", lineHeight: 1.25,
                          textDecoration: openCategory === cat.label ? "underline" : "none",
                          textUnderlineOffset: "3px", textDecorationThickness: "1px",
                        }}
                      >
                        {cat.label}
                      </button>
                      {/* Mobile: inline sub-items — no chevron, just indented */}
                      {openCategory === cat.label && (
                        <ul className="lg:hidden" style={{ listStyle: "none", paddingBottom: "0.25rem" }}>
                          {cat.items.map((item) => (
                            <li key={item.label}>
                              <a
                                href={item.href}
                                style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.4rem 0 0.4rem 0.875rem", fontSize: "0.625rem", letterSpacing: "0.09em", textTransform: "uppercase", color: "inherit", textDecoration: "none" }}
                                onClick={() => setMenuOpen(false)}
                              >
                                {item.count !== null && <span style={{ opacity: 0.4, minWidth: "3.5rem", fontVariantNumeric: "tabular-nums" }}>[ {item.count} ]</span>}
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Lookbook link */}
                <Link
                  href="/lookbook"
                  style={{
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: "1.625rem", letterSpacing: "0.005em", color: "inherit",
                    padding: "0.625rem 0", display: "block", lineHeight: 1.25, textDecoration: "none",
                  }}
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
                >
                  Lookbook
                </Link>

                {/* Mobile: About + Assistance flat lists + newsletter (hidden on desktop) */}
                <div className="lg:hidden" style={{ marginTop: "auto", paddingTop: "5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem", borderTop: "1px solid rgba(0,0,0,0.12)", paddingTop: "1.25rem" }}>
                    {Object.entries(footerLinks).map(([heading, items]) => (
                      <div key={heading}>
                        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1rem", letterSpacing: "0.01em", marginBottom: "0.625rem" }}>
                          {heading}
                        </p>
                        {items.map((item) => (
                          <a key={item.label} href={item.href} style={{ display: "block", fontSize: "0.5625rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "inherit", textDecoration: "none", padding: "0.3rem 0", opacity: 0.75 }} onClick={() => setMenuOpen(false)}>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Mobile newsletter */}
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.12)", marginTop: "1.5rem", paddingTop: "1.25rem", paddingBottom: "2rem" }}>
                    <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1rem", letterSpacing: "0.01em", marginBottom: "0.875rem" }}>
                      Subscribe.
                    </p>
                    {menuSubscribed ? (
                      <p style={{ fontSize: "0.625rem", opacity: 0.6 }}>You&apos;re on the list!</p>
                    ) : (
                      <form
                        onSubmit={(e) => { e.preventDefault(); if (menuEmail) setMenuSubscribed(true); }}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.25)", paddingBottom: "0.375rem" }}
                      >
                        <input
                          type="email"
                          required
                          placeholder="Your email"
                          value={menuEmail}
                          onChange={(e) => setMenuEmail(e.target.value)}
                          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.75rem", letterSpacing: "0.01em", color: "inherit" }}
                        />
                        <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "inherit", padding: 0, flexShrink: 0 }}>
                          →
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Vertical brand logo — always visible in mobile menu, below newsletter */}
                  <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0 3rem" }}>
                    <div style={{ position: "relative", width: "22vw", height: "calc(22vw * 4.5625)" }}>
                      <Image
                        src="/images/altriva-logo.png"
                        alt=""
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
                </div>

              </div>

              {/* Right panel: category sub-items + About/Assistance flat + newsletter (desktop only) */}
              <div className="mo-right">
                {/* Category sub-items when a category is clicked */}
                {(() => {
                  const active = openCategory ? menuCategories.find(c => c.label === openCategory) : null;
                  return active ? (
                    <ul style={{ listStyle: "none" }}>
                      {active.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "0.5625rem 0", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "inherit", textDecoration: "none" }}
                            onClick={() => setMenuOpen(false)}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "italic")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "normal")}
                          >
                            {item.count !== null && (
                              <span style={{ opacity: 0.35, minWidth: "5rem", fontSize: "0.5625rem", fontVariantNumeric: "tabular-nums" }}>[ {item.count} ]</span>
                            )}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null;
                })()}

                {/* About + Assistance — flat, always expanded */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
                  {Object.entries(footerLinks).map(([heading, items]) => (
                    <div key={heading}>
                      <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.0625rem", letterSpacing: "0.01em", marginBottom: "0.75rem", opacity: 0.9 }}>
                        {heading}
                      </p>
                      {items.map((item) => (
                        <a key={item.label} href={item.href} style={{ display: "block", fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "inherit", textDecoration: "none", padding: "0.3rem 0", opacity: 0.7, transition: "opacity 0.1s" }}
                          onClick={() => setMenuOpen(false)}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Desktop newsletter */}
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.12)", paddingTop: "1.25rem" }}>
                  <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.0625rem", letterSpacing: "0.01em", marginBottom: "0.875rem" }}>
                    Newsletters that smell nice.<br />Subscribe.
                  </p>
                  {menuSubscribed ? (
                    <p style={{ fontSize: "0.625rem", opacity: 0.6, letterSpacing: "0.04em" }}>You&apos;re on the list!</p>
                  ) : (
                    <form
                      onSubmit={(e) => { e.preventDefault(); if (menuEmail) setMenuSubscribed(true); }}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.25)", paddingBottom: "0.375rem", maxWidth: "320px" }}
                    >
                      <input
                        type="email"
                        required
                        placeholder="Your email"
                        value={menuEmail}
                        onChange={(e) => setMenuEmail(e.target.value)}
                        style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.8125rem", letterSpacing: "0.01em", color: "inherit" }}
                      />
                      <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "inherit", padding: 0, flexShrink: 0 }}>
                        Subscribe →
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Heart image card — beside the fixed logo panel */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "2.5rem",
              right: "calc(var(--logo-panel-width) + 2rem)",
              transform: "rotate(-8deg)",
              transformOrigin: "bottom right",
              zIndex: 5,
              pointerEvents: "none",
              userSelect: "none",
              width: "180px",
            }}
          >
            <Image
              src="/images/heart_menu_pic.jpeg"
              alt=""
              width={400}
              height={500}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
