"use client";

import { useState } from "react";
import Image from "next/image";
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
          <button className="nav-link hidden lg:block" aria-label="Login">
            Login
          </button>
          <button className="nav-link hidden lg:block" aria-label="Bag">
            Bag
          </button>

          {/* Mobile: hamburger — JWA style two-line SVG */}
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
          <button
            className="hidden lg:flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity"
            aria-label="Search"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Mobile icons group */}
          <div className="lg:hidden flex items-center gap-1">
            {/* Search */}
            <button className="flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Search">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Login */}
            <button className="flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 14C8.13401 14 5 17.134 5 21H4C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor" />
              </svg>
            </button>
            {/* Bag */}
            <button className="flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity" aria-label="Bag">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V7H9V6ZM8 7V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V7H20V21H4V7H8ZM5 8V20H19V8H5Z" fill="currentColor" />
              </svg>
            </button>
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
        <div className="menu-overlay">
          {/* Header row */}
          <div className="flex min-h-11 w-full items-center justify-between pr-4 pt-2 pl-4 lg:pl-6 lg:pr-6">
            {/* Desktop: "Close" text */}
            <button
              onClick={() => setMenuOpen(false)}
              className="nav-link hidden lg:block"
              aria-label="Close menu"
            >
              Close
            </button>

            {/* Mobile: spacer so X goes right */}
            <span className="lg:hidden" />

            {/* Mobile: X icon */}
            <button
              onClick={() => setMenuOpen(false)}
              className="lg:hidden flex items-center justify-center w-9 h-9 p-1.5 hover:opacity-50 transition-opacity"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.2929 12L5.14642 5.85359L5.85353 5.14648L12 11.2929L18.1464 5.14648L18.8535 5.85359L12.7071 12L18.8535 18.1465L18.1464 18.8536L12 12.7071L5.85353 18.8536L5.14642 18.1465L11.2929 12Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          {/* Nav content */}
          <div className="flex h-full flex-col overflow-y-auto px-4 lg:px-6">
            {/* Search bar */}
            <div className="py-6 border-b" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
              <div className="relative flex items-center border-b border-black/60 pb-1">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-transparent text-body focus:outline-none placeholder:text-black/40"
                  style={{ fontSize: "0.875rem" }}
                />
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0 ml-2 opacity-60" aria-hidden="true">
                  <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Categories — accordion on mobile, grid on desktop */}
            <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-x-8 py-4">
              {menuCategories.map((cat) => (
                <div key={cat.label} className="flex flex-col">
                  {/* Mobile: accordion toggle */}
                  <button
                    className="lg:hidden flex items-center justify-between py-3 border-b text-body hover:italic transition-all"
                    style={{ borderColor: "rgba(0,0,0,0.12)" }}
                    onClick={() => toggleCategory(cat.label)}
                    aria-expanded={openCategory === cat.label}
                  >
                    <span>{cat.label}</span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="w-4 h-4 opacity-50 transition-transform"
                      style={{ transform: openCategory === cat.label ? "rotate(90deg)" : "rotate(0deg)" }}
                    >
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </button>

                  {/* Desktop: always visible heading */}
                  <span className="hidden lg:block py-2 text-body">
                    {cat.label}
                  </span>

                  {/* Sub-items */}
                  <ul
                    className="flex flex-col"
                    style={{
                      display: openCategory === cat.label ? "flex" : undefined,
                    }}
                  >
                    {/* Mobile: only show when expanded */}
                    {cat.items.map((item) => (
                      <li
                        key={item.label}
                        className={openCategory === cat.label ? "flex" : "hidden lg:flex"}
                      >
                        <a
                          href={item.href}
                          className="flex items-center gap-1 min-h-11 nav-link w-fit"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.count !== null && (
                            <span className="flex items-center gap-0.5 min-w-6 opacity-70 group-hover:opacity-0 transition-opacity">
                              <span>[</span>
                              <span>{item.count}</span>
                              <span>]</span>
                            </span>
                          )}
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer links in menu */}
            <div className="mt-auto pt-6 pb-6 border-t flex flex-wrap gap-x-8 gap-y-4" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
              {Object.entries(footerLinks).map(([heading, items]) => (
                <div key={heading} className="flex flex-col gap-1">
                  <span className="nav-link opacity-50">{heading}</span>
                  {items.slice(0, 4).map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-caption py-1 hover:italic transition-all"
                      onClick={() => setMenuOpen(false)}
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
