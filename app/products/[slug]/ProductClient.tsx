"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { categoryToCollectionSlug } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

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

  const images = [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];

  const handleAddToBag = () => {
    const size = selectedSize ?? "O/S";
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordions = [
    {
      id: "details",
      label: "Details",
      content: `Colour: ${product.displayName.split(" ").slice(-2).join(" ")}\nMaterial: Premium quality materials\nDimensions: Please refer to size guide\nSKU: ALT-${product.id.padStart(5, "0")}\nMade with care.`,
    },
    {
      id: "shipping",
      label: "Shipping & Returns",
      content: "Complimentary standard shipping on orders over £300.\nExpress delivery available.\nFree returns within 14 days of receipt.\nItems must be unworn and in original packaging.",
    },
  ];

  return (
    <div style={{ paddingBottom: "4rem" }}>
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
      <div style={{ display: "flex", gap: "3rem", padding: "0 var(--page-margin)", flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* ── Image gallery ── */}
        <div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {/* Main image */}
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
          {/* Thumbnails */}
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

        {/* ── Product info ── */}
        <div style={{ flex: "0 1 360px", display: "flex", flexDirection: "column", gap: "1.25rem" }} className="lg:sticky lg:top-[var(--total-header-height)] lg:pt-2">
          {/* Category + Title + Price */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
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

          {/* Add to bag */}
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

          {/* Wishlist */}
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

          {/* Accordions */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", marginTop: "0.5rem" }}>
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
            Duties and taxes included. Free standard shipping on orders over £300.
          </p>
        </div>
      </div>

      {/* Related products */}
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
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="related-item"
                style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <div style={{ position: "relative", aspectRatio: p.aspect === "portrait" ? "4/5" : "1/1", backgroundColor: "#f5f5f3" }}>
                  <Image src={p.image} alt={p.displayName} fill className="object-cover" sizes="(max-width: 767px) 50vw, 25vw" />
                </div>
                <div>
                  <p style={{ fontSize: "0.6875rem", letterSpacing: "0.02em", textTransform: "capitalize", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {p.displayName}
                  </p>
                  <p style={{ fontSize: "0.6875rem", opacity: 0.55, marginTop: "0.2rem" }}>Rs.&nbsp;{p.priceInr.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
