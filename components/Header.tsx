"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
          <a href="/" aria-label="Home">
            <Image
              src="/images/logo.png"
              alt="Altriva Studio"
              width={73}
              height={12}
              style={{ height: "18px", width: "auto", display: "block", imageRendering: "crisp-edges" }}
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
        <a href="/" aria-label="Home" className="flex items-center justify-center h-full">
          <Image
            src="/images/logo.png"
            alt="Altriva Studio"
            width={73}
            height={12}
            style={{
              height: "60px",
              width: "auto",
              transform: "rotate(90deg)",
              display: "block",
              imageRendering: "crisp-edges",
            }}
            priority
          />
        </a>
      </div>

      {/* ── Menu overlay ── */}
      {menuOpen && (
        <div className="menu-overlay" style={{ display: "flex", flexDirection: "column" }}>

          {/* Top bar — exact same height as site-header, same horizontal padding */}
          <div
            style={{
              height: "var(--nav-height)",
              minHeight: "var(--nav-height)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 var(--page-margin)",
              flexShrink: 0,
            }}
          >
            {/* Desktop: "Close" text on left */}
            <button onClick={() => setMenuOpen(false)} className="nav-link hidden lg:block" aria-label="Close menu">
              Close
            </button>
            {/* Mobile: empty spacer pushes X to right */}
            <span className="lg:hidden" style={{ flex: 1 }} />
            {/* Mobile: X icon on right */}
            <button
              onClick={() => setMenuOpen(false)}
              className="lg:hidden"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.375rem", lineHeight: 1, display: "flex", alignItems: "center" }}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "1.125rem", height: "1.125rem" }} aria-hidden="true">
                <path d="M3 3l14 14M17 3L3 17" />
              </svg>
            </button>
          </div>

          {/* Scrollable content — uses page-margin for all horizontal padding */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              padding: "0 var(--page-margin)",
            }}
          >
            {/* Search */}
            <div style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem", borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
              <form
                onSubmit={handleMenuSearch}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.35)", paddingBottom: "0.375rem" }}
              >
                <input
                  type="search"
                  placeholder="Search"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.8125rem", letterSpacing: "0.02em", color: "inherit" }}
                />
                <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1, display: "flex" }}>
                  <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: "0.8125rem", height: "0.8125rem", opacity: 0.5 }} aria-hidden="true">
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Categories */}
            <div className="lg:grid lg:grid-cols-4" style={{ paddingTop: "0.5rem", columnGap: "3rem" } as React.CSSProperties}>
              {menuCategories.map((cat) => (
                <div key={cat.label}>

                  {/* Mobile accordion row */}
                  <button
                    className="lg:hidden flex items-center justify-between w-full text-left"
                    style={{
                      padding: "0.75rem 0",
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                      background: "none",
                      border: "none",
                      borderBottomStyle: "solid",
                      borderBottomWidth: "1px",
                      borderBottomColor: "rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      fontFamily: "'EB Garamond', Georgia, serif",
                      fontSize: "1rem",
                      letterSpacing: "0.005em",
                      color: "inherit",
                    }}
                    onClick={() => toggleCategory(cat.label)}
                    aria-expanded={openCategory === cat.label}
                  >
                    <span>{cat.label}</span>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.6875rem", height: "0.6875rem", opacity: 0.45, flexShrink: 0, transform: openCategory === cat.label ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </button>

                  {/* Desktop column heading — Tailwind hidden/block avoids inline-style override issue */}
                  <span
                    className="hidden lg:block"
                    style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55, paddingBottom: "0.625rem", paddingTop: "0.75rem" }}
                  >
                    {cat.label}
                  </span>

                  {/* Sub-links */}
                  <ul>
                    {cat.items.map((item) => (
                      <li key={item.label} className={openCategory === cat.label ? "flex" : "hidden lg:flex"}>
                        <a
                          href={item.href}
                          style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.375rem 0", fontSize: "0.6875rem", letterSpacing: "0.02em", color: "inherit", textDecoration: "none" }}
                          onClick={() => setMenuOpen(false)}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "italic")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "normal")}
                        >
                          {item.count !== null && <span style={{ opacity: 0.4, fontSize: "0.5625rem" }}>[{item.count}]</span>}
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom footer links */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: "1.25rem",
                paddingBottom: "1.5rem",
                borderTop: "1px solid rgba(0,0,0,0.12)",
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              {Object.entries(footerLinks).map(([heading, items]) => (
                <div key={heading} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: "0.5rem", display: "block" }}>
                    {heading}
                  </span>
                  {items.slice(0, 4).map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      style={{ fontSize: "0.6875rem", letterSpacing: "0.02em", color: "inherit", textDecoration: "none", padding: "0.1875rem 0" }}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "italic")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.fontStyle = "normal")}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
