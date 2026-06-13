"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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

/* ── Transform logic ── */
interface CardStyles {
  outer: React.CSSProperties;
  inner: React.CSSProperties;
}

function cardStyles(offset: number): CardStyles {
  const abs = Math.abs(offset);

  if (abs > 4) {
    return { outer: { display: "none" }, inner: {} };
  }

  const transition = "transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.42s, box-shadow 0.42s";

  if (offset === 0) {
    return {
      outer: {
        position: "absolute",
        top: "44%",
        left: "50%",
        width: "min(260px, 58vw)",
        aspectRatio: "3/4",
        transform: "translateX(-50%) translateY(-50%)",
        zIndex: 20,
        transformStyle: "preserve-3d",
        transition,
      },
      inner: {
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transform: "rotateY(0deg) scale(1)",
        transition,
        boxShadow: "0 28px 80px rgba(0,0,0,0.95), 0 0 0 0.5px rgba(255,255,255,0.07)",
      },
    };
  }

  const sign = Math.sign(offset);
  /* horizontal offset: first adjacent at ±42vw, then +22vw each */
  const tx = sign * (42 + (abs - 1) * 22);
  const angle = sign * 62;
  const scale = Math.max(0.42, 0.75 - (abs - 1) * 0.1);
  const brightness = Math.max(0.28, 0.62 - (abs - 1) * 0.14);
  const shadow = `0 ${Math.max(4, 16 - abs * 4)}px ${Math.max(10, 36 - abs * 8)}px rgba(0,0,0,0.75)`;

  return {
    outer: {
      position: "absolute",
      top: "44%",
      left: "50%",
      width: "min(260px, 58vw)",
      aspectRatio: "3/4",
      /* translateX(-50%) centres the card; then adds the lateral offset.
         This translation happens before rotateY so it stays in screen space. */
      transform: `translateX(calc(-50% + ${tx}vw)) translateY(-50%)`,
      zIndex: 20 - abs * 2,
      transformStyle: "preserve-3d",
      transition,
      cursor: "pointer",
    },
    inner: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      transform: `rotateY(${angle}deg) scale(${scale})`,
      transformOrigin: "center center",
      transition,
      filter: `brightness(${brightness})`,
      boxShadow: shadow,
    },
  };
}

export default function LookbookPage() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, images.length - 1)), []);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "radial-gradient(ellipse at 50% 42%, #191924 0%, #07070d 100%)",
        overflow: "hidden",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Top bar ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
        padding: "1.25rem 1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link
          href="/"
          style={{
            color: "#fff", textDecoration: "none",
            fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase",
            opacity: 0.7, display: "flex", alignItems: "center", gap: "0.35rem",
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "0.6rem", height: "0.6rem" }}>
            <path d="M10 3L5 8l5 5" />
          </svg>
          Back
        </Link>
        <p style={{ color: "#fff", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55 }}>
          Cover Flow
        </p>
        <p style={{ color: "#fff", fontSize: "0.5625rem", letterSpacing: "0.06em", opacity: 0.45, minWidth: "2.5rem", textAlign: "right" }}>
          {current + 1}&thinsp;/&thinsp;{images.length}
        </p>
      </div>

      {/* ── Side vignettes ── */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "18%", zIndex: 25, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(7,7,13,0.85) 0%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "18%", zIndex: 25, pointerEvents: "none",
        background: "linear-gradient(to left, rgba(7,7,13,0.85) 0%, transparent 100%)",
      }} />

      {/* ── 3-D Stage ── */}
      <div style={{
        position: "absolute", inset: 0,
        perspective: "850px",
        perspectiveOrigin: "50% 44%",
      }}>
        {images.map((src, i) => {
          const offset = i - current;
          const { outer, inner } = cardStyles(offset);
          if (outer.display === "none") return null;

          return (
            <div
              key={src}
              style={outer}
              onClick={() => { if (offset < 0) prev(); else if (offset > 0) next(); }}
            >
              <div style={inner}>
                <Image
                  src={src}
                  alt={`Altriva Studio Lookbook ${i + 1}`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 640px) 58vw, 260px"
                  priority={i < 3}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Floor reflection line ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, zIndex: 22, pointerEvents: "none",
        top: "calc(44% + min(97px, 21.7vw))", /* bottom edge of center card */
        height: "1px",
        background: "linear-gradient(to right, transparent 10%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 90%)",
      }} />

      {/* ── Bottom: label + dots + arrows ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30,
        padding: "0 1.5rem 2.5rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem",
      }}>
        {/* Track / dot indicators */}
        <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Image ${i + 1}`}
              style={{
                width: i === current ? "1.25rem" : "0.25rem",
                height: "0.2rem",
                borderRadius: "2px",
                background: "#fff",
                opacity: i === current ? 0.85 : 0.28,
                border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
                transition: "width 0.3s ease, opacity 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Name label */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            color: "#fff",
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "1.0625rem",
            letterSpacing: "0.03em",
            marginBottom: "0.2rem",
            lineHeight: 1.2,
          }}>
            Altriva Studio
          </p>
          <p style={{ color: "#fff", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.45 }}>
            Lookbook
          </p>
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous"
            style={{
              background: "none", border: "none", cursor: current === 0 ? "default" : "pointer",
              color: "#fff", opacity: current === 0 ? 0.18 : 0.65, padding: "0.5rem", display: "flex",
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "1.25rem", height: "1.25rem" }}>
              <path d="M13 5l-5 5 5 5" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={current === images.length - 1}
            aria-label="Next"
            style={{
              background: "none", border: "none", cursor: current === images.length - 1 ? "default" : "pointer",
              color: "#fff", opacity: current === images.length - 1 ? 0.18 : 0.65, padding: "0.5rem", display: "flex",
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "1.25rem", height: "1.25rem" }}>
              <path d="M7 5l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
