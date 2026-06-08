"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { categoryToCollectionSlug, products as allProducts } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { pixelViewContent, pixelAddToCart } from "@/lib/pixel";

const STATIC_REVIEWS = [
  { id: 1, name: "Priya S.",  rating: 5, date: "March 2025",    verified: true,  title: "Absolutely stunning",        text: "The quality is exceptional. Soft yet structured — exactly as described. Runs true to size." },
  { id: 2, name: "Arjun M.", rating: 4, date: "February 2025", verified: true,  title: "Worth every rupee",          text: "Arrived quickly and the colour is even more vibrant in person. Slightly relaxed fit which I love." },
  { id: 3, name: "Nisha K.", rating: 5, date: "January 2025",  verified: false, title: "My third Altriva purchase",  text: "The quality never disappoints. Packed beautifully and delivered on time. Will be back." },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "0.1rem" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 12 12" fill={i <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" style={{ width: "0.6875rem", height: "0.6875rem" }}>
          <path d="M6 1l1.2 3.6H11L8.1 7l1.1 3.5L6 8.5 2.8 10.5 3.9 7 1 4.6h3.8z" />
        </svg>
      ))}
    </span>
  );
}

const SIZES_APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZES_SHOES = ["36", "37", "38", "39", "40", "41", "42"];

function getSizes(category: string) {
  const c = category.toUpperCase();
  if (c.includes("SHOE") || c.includes("SLIDE") || c.includes("SANDAL") || c.includes("MULE") || c.includes("FLAT") || c.includes("FOOTWEAR")) return SIZES_SHOES;
  if (c.includes("BAG") || c.includes("CHARM") || c.includes("SUNGLASS") || c.includes("HAT") || c.includes("BELT") || c.includes("ACCESSORY") || c.includes("ACCESSORIES")) return null;
  return SIZES_APPAREL;
}

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductClient({ product, related }: Props) {
  const { addItem } = useCart();
  const sizes = getSizes(product.category);
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes ? null : "O/S");
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const KEY = "altriva_recently_viewed";
    const stored: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    const updated = [product.slug, ...stored.filter(s => s !== product.slug)].slice(0, 10);
    localStorage.setItem(KEY, JSON.stringify(updated));
    const viewed = updated.slice(1)
      .map(slug => allProducts.find(p => p.slug === slug))
      .filter(Boolean) as Product[];
    setRecentlyViewed(viewed.slice(0, 6));
    pixelViewContent(product);
  }, [product.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const images = product.images ?? [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];

  const handleAddToBag = () => {
    const size = selectedSize ?? "O/S";
    addItem(product, size);
    pixelAddToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordions = [
    {
      id: "details",
      label: "Details",
      content: product.description ?? `SKU: ALT-${product.id.padStart(5, "0")}\nMaterial: Premium quality materials\nPlease refer to our size guide for measurements.`,
    },
    {
      id: "shipping",
      label: "Shipping & Returns",
      content: "Complimentary standard shipping on orders over £300.\nExpress delivery available.\nFree returns within 14 days of receipt.\nItems must be unworn and in original packaging.",
    },
  ];

  return (
    <div style={{ paddingBottom: "5rem" }}>
      <style>{`
        .product-layout {
          display: grid;
          grid-template-areas: "mobile-title" "gallery" "sidebar";
          grid-template-columns: 1fr;
          padding: 0 var(--page-margin);
        }
        .product-mobile-title { grid-area: mobile-title; padding: 0.75rem 0 1rem; }
        .product-gallery-block { grid-area: gallery; }
        .product-sidebar { grid-area: sidebar; padding-top: 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .product-title-desktop { display: none; }
        .product-actions-inline { display: none; }
        .mobile-sticky-bar { display: flex; }
        @media (min-width: 1024px) {
          .product-layout {
            grid-template-areas: "gallery sidebar";
            grid-template-columns: 1fr 360px;
            gap: 3rem;
            align-items: start;
          }
          .product-mobile-title { display: none; }
          .product-gallery-block { position: relative; }
          .product-sidebar { padding-top: 0.5rem; position: sticky; top: var(--total-header-height); }
          .product-title-desktop { display: flex; }
          .product-actions-inline { display: flex; flex-direction: column; gap: 0.625rem; }
          .mobile-sticky-bar { display: none; }
        }
      `}</style>

      {/* Breadcrumb */}
      <nav style={{ padding: "0.75rem var(--page-margin)", fontSize: "0.625rem", letterSpacing: "0.04em", display: "flex", gap: "0.375rem", opacity: 0.45, flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <Link
          href={`/collections/${categoryToCollectionSlug[product.category] ?? product.category.toLowerCase().replace(/[&\s]+/g, "-").replace(/-+/g, "-")}`}
          style={{ color: "inherit", textDecoration: "none", textTransform: "capitalize" }}
        >
          {product.category.toLowerCase()}
        </Link>
        <span>/</span>
        <span style={{ textTransform: "capitalize" }}>{product.displayName}</span>
      </nav>

      {/* Main grid */}
      <div className="product-layout">

        {/* ── Mobile-only title (above image) ── */}
        <div className="product-mobile-title">
          <p style={{ fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.45, marginBottom: "0.375rem" }}>
            {product.category}
          </p>
          <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.375rem", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.25, textTransform: "capitalize", marginBottom: "0.375rem" }}>
            {product.displayName}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.875rem", letterSpacing: "0.02em" }}>
              Rs.&nbsp;{product.priceInr.toLocaleString("en-IN")}
            </span>
            {product.colors && product.colors > 1 && (
              <span style={{ fontSize: "0.6875rem", opacity: 0.55, fontStyle: "italic" }}>
                {product.colors} colours
              </span>
            )}
          </div>
        </div>

        {/* ── Image gallery ── */}
        <div className="product-gallery-block" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ position: "relative", aspectRatio: product.aspect === "portrait" ? "4/5" : "1/1", backgroundColor: "#f5f5f3", overflow: "hidden" }}>
            <Image
              src={images[imgIdx]}
              alt={product.displayName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            {product.badge && (
              <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "#fff", padding: "0.25rem 0.5rem", fontSize: "0.625rem", letterSpacing: "0.04em", zIndex: 10 }}>
                [{product.badge}]
              </span>
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                  style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.8)", border: "none", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
                  aria-label="Previous image"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.875rem", height: "0.875rem" }}>
                    <path d="M10 4l-4 4 4 4" />
                  </svg>
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.8)", border: "none", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
                  aria-label="Next image"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.875rem", height: "0.875rem" }}>
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div style={{ display: "flex", gap: "0.375rem" }}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  style={{ position: "relative", width: "72px", aspectRatio: "4/5", backgroundColor: "#f5f5f3", border: imgIdx === i ? "1px solid #000" : "1px solid transparent", padding: 0, cursor: "pointer", flexShrink: 0 }}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="72px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product sidebar ── */}
        <div className="product-sidebar">

          {/* Desktop-only title */}
          <div className="product-title-desktop" style={{ flexDirection: "column", gap: "0.375rem" }}>
            <p style={{ fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.45 }}>
              {product.category}
            </p>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.375rem", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.25, textTransform: "capitalize" }}>
              {product.displayName}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem" }}>
              <span style={{ fontSize: "0.875rem", letterSpacing: "0.02em" }}>
                Rs.&nbsp;{product.priceInr.toLocaleString("en-IN")}
              </span>
              {product.colors && product.colors > 1 && (
                <span style={{ fontSize: "0.6875rem", opacity: 0.55, fontStyle: "italic" }}>
                  {product.colors} colours
                </span>
              )}
            </div>
          </div>

          {/* Size selector */}
          {sizes && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.625rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.5 }}>
                  Size{selectedSize ? `: ${selectedSize}` : ""}
                </span>
                <button style={{ fontSize: "0.625rem", letterSpacing: "0.04em", opacity: 0.45, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Size guide
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: "0.5rem 0.875rem",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.04em",
                      border: selectedSize === s ? "1px solid #000" : "1px solid rgba(0,0,0,0.2)",
                      background: selectedSize === s ? "#000" : "transparent",
                      color: selectedSize === s ? "#fff" : "inherit",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to bag + Wishlist — desktop only inline */}
          <div className="product-actions-inline">
            <button
              onClick={handleAddToBag}
              disabled={sizes !== null && !selectedSize}
              style={{
                width: "100%",
                background: added ? "#2d6a4f" : "#000",
                color: "#fff",
                border: "none",
                padding: "0.9375rem 1.5rem",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: sizes !== null && !selectedSize ? "not-allowed" : "pointer",
                opacity: sizes !== null && !selectedSize ? 0.4 : 1,
                transition: "background 0.2s",
              }}
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <button
              style={{
                width: "100%",
                background: "transparent",
                color: "inherit",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "0.9375rem 1.5rem",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}
            >
              Save to Wishlist
            </button>
          </div>

          {/* Accordions */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {accordions.map((acc) => (
              <div key={acc.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.875rem 0", background: "none", border: "none", cursor: "pointer",
                    fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "inherit",
                  }}
                >
                  {acc.label}
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "0.875rem", height: "0.875rem", transform: openAccordion === acc.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>
                {openAccordion === acc.id && (
                  <div style={{ paddingBottom: "1rem" }}>
                    {acc.content.split("\n").map((line, i) => (
                      <p key={i} style={{ fontSize: "0.75rem", letterSpacing: "0.015em", lineHeight: 1.6, opacity: 0.7 }}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <p style={{ fontSize: "0.625rem", opacity: 0.45, lineHeight: 1.5 }}>
            Duties and taxes included. Free standard shipping on orders over ₹25,000.
          </p>
        </div>
      </div>

      {/* ── Mobile sticky CTA bar ── */}
      <div
        className="mobile-sticky-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: "#fff",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          padding: "0.75rem var(--page-margin)",
          gap: "0.625rem",
          alignItems: "center",
        }}
      >
        {sizes && !selectedSize ? (
          <button
            style={{
              flex: 1,
              background: "transparent",
              color: "inherit",
              border: "1px solid rgba(0,0,0,0.3)",
              padding: "0.875rem 1rem",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "default",
              opacity: 0.6,
            }}
            disabled
          >
            Select a Size
          </button>
        ) : (
          <button
            onClick={handleAddToBag}
            style={{
              flex: 1,
              background: added ? "#2d6a4f" : "#000",
              color: "#fff",
              border: "none",
              padding: "0.875rem 1rem",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            {added ? "Added to Bag ✓" : "Add to Bag"}
          </button>
        )}
        <button
          style={{
            background: "transparent",
            color: "inherit",
            border: "1px solid rgba(0,0,0,0.2)",
            padding: "0.875rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-label="Save to wishlist"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "1rem", height: "1rem" }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ── You may also like ── */}
      {related.length > 0 && (
        <div style={{ padding: "3rem var(--page-margin) 0" }}>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.45, marginBottom: "1.5rem" }}>
            You may also like
          </p>
          <style>{`
            .related-grid { display: flex; gap: 0.375rem; flex-wrap: wrap; }
            .related-item { width: calc(50% - 0.1875rem); }
            @media (min-width: 768px) { .related-item { width: calc(25% - 0.28125rem); } }
          `}</style>
          <div className="related-grid">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="related-item" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ position: "relative", aspectRatio: p.aspect === "portrait" ? "4/5" : "1/1", backgroundColor: "#f5f5f3" }}>
                  <Image src={p.image} alt={p.displayName} fill className="object-cover" sizes="(max-width: 767px) 50vw, 25vw" />
                </div>
                <div>
                  <p style={{ fontSize: "0.6875rem", letterSpacing: "0.02em", textTransform: "capitalize", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{p.displayName}</p>
                  <p style={{ fontSize: "0.6875rem", opacity: 0.55, marginTop: "0.2rem" }}>Rs.&nbsp;{p.priceInr.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Complete the Look ── */}
      {related.length >= 3 && (
        <div style={{ padding: "3.5rem var(--page-margin) 0" }}>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "3rem" }}>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.01em", marginBottom: "0.375rem" }}>
              Complete the Look
            </h2>
            <p style={{ fontSize: "0.6875rem", opacity: 0.5, marginBottom: "1.75rem", letterSpacing: "0.015em" }}>
              Worn together in this edit
            </p>
            <style>{`
              .look-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.375rem; }
              @media (min-width: 768px) { .look-grid { grid-template-columns: repeat(4, 1fr); } }
            `}</style>
            <div className="look-grid">
              {related.slice(0, 4).map((p) => (
                <div key={p.id} style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  <Link href={`/products/${p.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <div style={{ position: "relative", aspectRatio: "4/5", backgroundColor: "#f5f5f3", overflow: "hidden" }}>
                      <Image src={p.image} alt={p.displayName} fill className="object-cover" sizes="(max-width: 767px) 33vw, 25vw" />
                      {p.badge && (
                        <span style={{ position: "absolute", top: "0.5rem", left: "0.5rem", background: "#fff", padding: "0.2rem 0.4rem", fontSize: "0.5rem", letterSpacing: "0.04em" }}>
                          [{p.badge}]
                        </span>
                      )}
                    </div>
                  </Link>
                  <div>
                    <Link href={`/products/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <p style={{ fontSize: "0.6875rem", letterSpacing: "0.02em", textTransform: "capitalize", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{p.displayName}</p>
                      <p style={{ fontSize: "0.6875rem", opacity: 0.55, marginTop: "0.2rem" }}>Rs.&nbsp;{p.priceInr.toLocaleString("en-IN")}</p>
                    </Link>
                    <button
                      onClick={() => addItem(p, "O/S")}
                      style={{ marginTop: "0.5rem", width: "100%", background: "none", border: "1px solid rgba(0,0,0,0.2)", padding: "0.5rem", fontSize: "0.5625rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", color: "inherit", transition: "border-color 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#000")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.2)")}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Reviews ── */}
      <div style={{ padding: "3.5rem var(--page-margin) 0" }}>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "3rem" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.875rem" }}>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.01em" }}>
                Reviews
              </h2>
              <span style={{ fontSize: "0.6875rem", opacity: 0.45 }}>
                {STATIC_REVIEWS.length} reviews · {(STATIC_REVIEWS.reduce((s, r) => s + r.rating, 0) / STATIC_REVIEWS.length).toFixed(1)} avg
              </span>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              style={{ background: "none", border: "1px solid rgba(0,0,0,0.25)", padding: "0.5rem 1rem", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", color: "inherit" }}
            >
              Write a Review
            </button>
          </div>

          {/* Write a review form */}
          {showReviewForm && (
            <div style={{ background: "#f9f9f7", padding: "1.5rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.01em" }}>Share your experience with this product.</p>
              <div style={{ display: "flex", gap: "0.375rem" }}>
                {[1,2,3,4,5].map(i => (
                  <button key={i} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.125rem", fontSize: "1.125rem", opacity: 0.3 }}>★</button>
                ))}
              </div>
              <input placeholder="Your name" style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.2)", padding: "0.375rem 0", fontSize: "0.75rem", outline: "none", letterSpacing: "0.015em" }} />
              <textarea placeholder="Your review..." rows={3} style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.2)", padding: "0.375rem 0", fontSize: "0.75rem", outline: "none", resize: "none", letterSpacing: "0.015em", fontFamily: "inherit" }} />
              <button
                style={{ alignSelf: "flex-start", background: "#000", color: "#fff", border: "none", padding: "0.75rem 1.5rem", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                onClick={() => setShowReviewForm(false)}
              >
                Submit Review
              </button>
            </div>
          )}

          {/* Review list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {STATIC_REVIEWS.map((r, idx) => (
              <div
                key={r.id}
                style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem", borderBottom: idx < STATIC_REVIEWS.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.375rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <Stars rating={r.rating} />
                    <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.02em" }}>{r.title}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {r.verified && (
                      <span style={{ fontSize: "0.5625rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.45, background: "rgba(0,0,0,0.05)", padding: "0.15rem 0.4rem" }}>
                        Verified
                      </span>
                    )}
                    <span style={{ fontSize: "0.5625rem", opacity: 0.4, letterSpacing: "0.02em" }}>{r.date}</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.015em", lineHeight: 1.65, opacity: 0.75, marginBottom: "0.375rem" }}>{r.text}</p>
                <p style={{ fontSize: "0.5625rem", opacity: 0.4, letterSpacing: "0.04em" }}>{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recently Viewed ── */}
      {recentlyViewed.length > 0 && (
        <div style={{ padding: "3.5rem var(--page-margin) 3rem" }}>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "3rem" }}>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.45, marginBottom: "1.5rem" }}>
              Recently Viewed
            </p>
            <style>{`
              .rv-scroll { display: flex; gap: 0.375rem; overflow-x: auto; scrollbar-width: none; }
              .rv-scroll::-webkit-scrollbar { display: none; }
              .rv-item { flex-shrink: 0; width: calc(40vw - 1rem); }
              @media (min-width: 768px) { .rv-item { width: calc(20% - 0.3rem); } }
            `}</style>
            <div className="rv-scroll">
              {recentlyViewed.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="rv-item" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ position: "relative", aspectRatio: p.aspect === "portrait" ? "4/5" : "1/1", backgroundColor: "#f5f5f3" }}>
                    <Image src={p.image} alt={p.displayName} fill className="object-cover" sizes="40vw" />
                  </div>
                  <p style={{ fontSize: "0.6875rem", letterSpacing: "0.02em", textTransform: "capitalize", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{p.displayName}</p>
                  <p style={{ fontSize: "0.6875rem", opacity: 0.55 }}>Rs.&nbsp;{p.priceInr.toLocaleString("en-IN")}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
