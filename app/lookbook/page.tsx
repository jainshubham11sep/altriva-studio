"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/lookbook/IMG_0037.JPG",
  "/images/lookbook/IMG_0050.JPG",
  "/images/lookbook/IMG_0056.JPG",
  "/images/lookbook/IMG_0070.JPG",
  "/images/lookbook/IMG_0071.JPG",
  "/images/lookbook/IMG_0078.JPG",
  "/images/lookbook/IMG_0082.JPG",
  "/images/lookbook/IMG_0102.JPG",
  "/images/lookbook/IMG_0117.JPG",
  "/images/lookbook/IMG_0121.JPG",
  "/images/lookbook/IMG_0141.JPG",
  "/images/lookbook/IMG_0156.JPG",
  "/images/lookbook/IMG_0185.JPG",
  "/images/lookbook/IMG_0187.JPG",
  "/images/lookbook/IMG_0209.JPG",
  "/images/lookbook/IMG_0216.JPG",
  "/images/lookbook/IMG_0245.JPG",
  "/images/lookbook/IMG_0268.JPG",
  "/images/lookbook/IMG_0275.JPG",
  "/images/lookbook/IMG_0287.JPG",
];

export default function LookbookPage() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setCurrent(Math.min(Math.max(idx, 0), images.length - 1));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Full-screen overlay — sits above all site chrome */
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "#000" }}>

      {/* Top gradient bar */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          padding: "1.25rem 1.25rem 4rem",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <Link
          href="/"
          style={{
            pointerEvents: "auto", color: "#fff", textDecoration: "none",
            fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase",
            opacity: 0.85, display: "flex", alignItems: "center", gap: "0.375rem",
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: "0.7rem", height: "0.7rem" }}>
            <path d="M10 3L5 8l5 5" />
          </svg>
          Back
        </Link>
        <p style={{ color: "#fff", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 }}>
          Altriva Studio — Lookbook
        </p>
        <p style={{ color: "#fff", fontSize: "0.5625rem", letterSpacing: "0.06em", opacity: 0.55, minWidth: "2.5rem", textAlign: "right" }}>
          {current + 1}&thinsp;/&thinsp;{images.length}
        </p>
      </div>

      {/* Bottom gradient bar */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
          padding: "4rem 1.25rem 2rem",
          background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        {/* Dot progress indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.3rem" }}>
          {images.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? "1.5rem" : "0.3rem",
                height: "0.175rem",
                borderRadius: "2px",
                background: "#fff",
                opacity: i === current ? 0.9 : 0.35,
                transition: "width 0.25s ease, opacity 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Snap scroll container */}
      <div
        ref={containerRef}
        style={{
          height: "100%",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            style={{
              height: "100dvh",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src={src}
              alt={`Altriva Studio Lookbook ${i + 1}`}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="100vw"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
