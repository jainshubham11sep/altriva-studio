"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { footerLinks } from "@/lib/products";

const menuCategories = [
  {
    label: "Featured",
    items: [
      { label: "Summer Series", count: 83, href: "/collections/summer-series" },
      { label: "Men's New In", count: 56, href: "/collections/mens-new-in" },
      { label: "Women's New In", count: 79, href: "/collections/womens-new-in" },
      { label: "Coming Soon", count: null, href: "/collections/coming-soon" },
      { label: "Collaborations", count: null, href: "/collections/collaborations" },
    ],
  },
  {
    label: "Bags",
    items: [

      { label: "Shoulder Bags", count: null, href: "/collections/shoulder-bags" },
      { label: "Totes", count: null, href: "/collections/totes" },
      { label: "Clutches", count: null, href: "/collections/clutches" },
      { label: "Mini Bags", count: null, href: "/collections/mini-bags" },
      { label: "Bulb Bags", count: null, href: "/collections/bulb-bags" },
    ],
  },
  {
    label: "Mens",
    items: [
      { label: "Men's New In", count: 56, href: "/collections/mens-new-in" },
      { label: "Tops", count: null, href: "/collections/mens-tops" },
      { label: "Trousers", count: null, href: "/collections/mens-trousers" },
      { label: "Outerwear", count: null, href: "/collections/mens-outerwear" },
      { label: "Footwear", count: null, href: "/collections/mens-footwear" },
      { label: "Accessories", count: null, href: "/collections/mens-accessories" },
    ],
  },
  {
    label: "Womens",
    items: [
      { label: "Women's New In", count: 79, href: "/collections/womens-new-in" },
      { label: "Dresses", count: null, href: "/collections/dresses" },
      { label: "Tops", count: null, href: "/collections/womens-tops" },
      { label: "Trousers", count: null, href: "/collections/womens-trousers" },
      { label: "Outerwear", count: null, href: "/collections/womens-outerwear" },
      { label: "Footwear", count: null, href: "/collections/womens-footwear" },
    ],
  },
  {
    label: "Accessories",
    items: [
      { label: "Jewellery", count: null, href: "/collections/jewellery" },
      { label: "Sunglasses", count: null, href: "/collections/sunglasses" },
      { label: "Hats", count: null, href: "/collections/hats" },
      { label: "Scarves", count: null, href: "/collections/scarves" },
      { label: "Belts", count: null, href: "/collections/belts" },
      { label: "Charms", count: null, href: "/collections/charms" },
    ],
  },
  {
    label: "Home",
    items: [
      { label: "All Home", count: null, href: "/collections/all-home" },
      { label: "Candles", count: null, href: "/collections/candles" },
      { label: "Objects", count: null, href: "/collections/objects" },
      { label: "Books", count: null, href: "/collections/books" },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [menuSearch, setMenuSearch] = useState("");
  const { totalItems } = useCart();
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

        {/* Center: Logo — mobile only */}
        <div
          className="lg:hidden"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            height: "var(--nav-height)",
          }}
        >
          <a href="/" aria-label="Home" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <Image
              src="/images/altriva-logo.png"
              alt="Altriva Studio"
              width={730}
              height={160}
              style={{ height: "18px", width: "auto" }}
              priority
            />
          </a>
        </div>

        {/* Right: Desktop nav links + Search; Mobile: Search | Login | Bag icons */}
        <div className="flex items-center gap-1 justify-end flex-1">
          {/* Desktop search */}
          <Link href="/search" className="hidden lg:flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Search">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
          </Link>

          {/* Mobile icons group */}
          <div className="lg:hidden flex items-center gap-1">
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
              .mo-cats-col { width: 250px; flex-shrink: 0; padding: 2.5rem 0 0 var(--page-margin); overflow-y: auto; display: flex; flex-direction: column; border-right: 1px solid rgba(0,0,0,0.1); }
              .mo-right { display: flex; flex: 1; padding: 2.5rem 0 0 3rem; overflow-y: auto; }
              .mo-footer { border-top: none; padding: 2.5rem 5.5rem 2.5rem 3rem; margin-top: 0; flex-shrink: 0; }
              .mo-footer-grid { grid-template-columns: 1fr 1fr 1.5fr; gap: 2rem 2.5rem; }
              .mo-newsletter { display: block; }
              .mo-brand { position: absolute; top: 0; right: 0; bottom: 0; width: 80px; display: flex; align-items: center; justify-content: center; pointer-events: none; overflow: hidden; }
            }
          `}</style>

          {/* ── Top bar: bordered close + currency ── */}
          <div style={{ height: "var(--nav-height)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--page-margin)", flexShrink: 0 }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ border: "1px solid rgba(0,0,0,0.5)", background: "none", cursor: "pointer", color: "inherit", padding: "0.25rem 0.5rem", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
              aria-label="Close menu"
            >
              {/* Mobile: X icon */}
              <svg className="lg:hidden" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "0.8125rem", height: "0.8125rem", display: "block" }} aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
              {/* Desktop: CLOSE text */}
              <span className="hidden lg:inline" style={{ fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Close</span>
            </button>
            <span className="hidden lg:block" style={{ fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6 }}>IN / ₹</span>
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

                {/* Mobile footer (lives inside left col so it scrolls naturally) */}
                <div className="mo-footer lg:hidden" style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <div className="mo-footer-grid">
                    {Object.entries(footerLinks).map(([heading, items]) => (
                      <div key={heading}>
                        <span style={{ display: "block", fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.25rem", marginBottom: "0.875rem" }}>{heading}</span>
                        {items.map((item) => (
                          <a key={item.label} href={item.href} style={{ display: "block", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "inherit", textDecoration: "none", padding: "0.35rem 0" }} onClick={() => setMenuOpen(false)}>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right panel: active category sub-items (desktop only) */}
              <div className="mo-right">
                {(() => {
                  const active = menuCategories.find(c => c.label === (openCategory ?? menuCategories[0].label));
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
              </div>
            </div>

            {/* Desktop footer: About | Assistance | Newsletter */}
            <div className="mo-footer hidden lg:block">
              <div className="mo-footer-grid">
                {Object.entries(footerLinks).map(([heading, items]) => (
                  <div key={heading}>
                    <span style={{ display: "block", fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.125rem", marginBottom: "0.875rem" }}>{heading}</span>
                    {items.map((item) => (
                      <a key={item.label} href={item.href} style={{ display: "block", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "inherit", textDecoration: "none", padding: "0.3rem 0" }} onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
                {/* Newsletter */}
                <div className="mo-newsletter">
                  <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1rem", lineHeight: 1.45, marginBottom: "1.25rem" }}>
                    Newsletters that smell nice.<br />Subscribe.
                  </p>
                  <div style={{ borderBottom: "1px solid rgba(0,0,0,0.3)", paddingBottom: "0.375rem" }}>
                    <input placeholder="Your email" type="email" style={{ background: "transparent", border: "none", outline: "none", fontSize: "0.6875rem", letterSpacing: "0.015em", color: "inherit", width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative vertical brand text (desktop only, absolutely positioned) */}
          <div className="mo-brand" aria-hidden="true">
            <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "5rem", fontWeight: 400, writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", lineHeight: 0.9, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
              ALTRIVA STUDIO
            </span>
          </div>
        </div>
      )}
    </>
  );
}
