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

/* ── Per-card transform ─────────────────────────────────────────────── */
interface CardStyles { outer: React.CSSProperties; inner: React.CSSProperties; }

function cardStyles(offset: number, dragVw: number, live: boolean): CardStyles {
  const abs = Math.abs(offset);
  if (abs > 3) return { outer: { display: "none" }, inner: {} };

  const eased = "transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.42s, box-shadow 0.42s";
  const instant = "none";
  const transition = live ? instant : eased;

  if (offset === 0) {
    return {
      outer: {
        position: "absolute",
        top: "44%",
        left: "50%",
        width: "clamp(290px, 76vw, 430px)",
        aspectRatio: "3/4",
        transform: `translateX(calc(-50% + ${dragVw}vw)) translateY(-50%)`,
        zIndex: 20,
        transformStyle: "preserve-3d",
        transition,
      },
      inner: {
        width: "100%", height: "100%", position: "relative", overflow: "hidden",
        transform: "rotateY(0deg) scale(1)",
        transition,
        boxShadow: "0 32px 90px rgba(0,0,0,0.95), 0 0 0 0.5px rgba(255,255,255,0.08)",
      },
    };
  }

  const sign = Math.sign(offset);
  const tx = sign * (58 + (abs - 1) * 26) + dragVw;
  const angle = sign * 62;
  const scale = Math.max(0.38, 0.68 - (abs - 1) * 0.14);
  const brightness = Math.max(0.22, 0.55 - (abs - 1) * 0.18);

  return {
    outer: {
      position: "absolute",
      top: "44%",
      left: "50%",
      width: "clamp(290px, 76vw, 430px)",
      aspectRatio: "3/4",
      transform: `translateX(calc(-50% + ${tx}vw)) translateY(-50%)`,
      zIndex: 20 - abs * 2,
      transformStyle: "preserve-3d",
      transition,
      cursor: "pointer",
    },
    inner: {
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      transform: `rotateY(${angle}deg) scale(${scale})`,
      transformOrigin: "center center",
      transition,
      filter: `brightness(${brightness})`,
      boxShadow: `0 ${Math.max(4, 18 - abs * 5)}px ${Math.max(8, 45 - abs * 12)}px rgba(0,0,0,0.75)`,
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────── */
export default function LookbookPage() {
  const [current, setCurrent] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const dirLocked = useRef<"h" | "v" | null>(null);
  const winWidth = useRef(390);

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, images.length - 1)), []);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  /* Store window width for vw ↔ px conversion */
  useEffect(() => {
    winWidth.current = window.innerWidth;
    const onResize = () => { winWidth.current = window.innerWidth; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* Passive-false touchmove so we can preventDefault on horizontal swipe */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (!dirLocked.current) {
        if (Math.abs(dx) > 5) dirLocked.current = "h";
        else if (Math.abs(dy) > 5) dirLocked.current = "v";
      }
      if (dirLocked.current === "h") {
        e.preventDefault();
        setDragging(true);
        setDragPx(dx);
      }
    };
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => el.removeEventListener("touchmove", onMove);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    dirLocked.current = null;
    setDragging(false);
    setDragPx(0);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    setDragging(false);
    setDragPx(0);
    if (Math.abs(dx) > 45) { if (dx < 0) next(); else prev(); }
  };

  const dragVw = dragPx / winWidth.current * 100;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", inset: 0, zIndex: 500, overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 40%, #18182a 0%, #060609 100%)",
        touchAction: "pan-y",
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
        <Link href="/" style={{
          color: "#fff", textDecoration: "none",
          fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase",
          opacity: 0.7, display: "flex", alignItems: "center", gap: "0.35rem",
        }}>
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
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "12%", zIndex: 25, pointerEvents: "none", background: "linear-gradient(to right, rgba(6,6,9,0.9) 0%, transparent 100%)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "12%", zIndex: 25, pointerEvents: "none", background: "linear-gradient(to left, rgba(6,6,9,0.9) 0%, transparent 100%)" }} />

      {/* ── 3-D Stage ── */}
      <div style={{ position: "absolute", inset: 0, perspective: "900px", perspectiveOrigin: "50% 44%" }}>
        {images.map((src, i) => {
          const offset = i - current;
          const { outer, inner } = cardStyles(offset, dragVw, dragging);
          if (outer.display === "none") return null;
          return (
            <div
              key={src}
              style={outer}
              onClick={() => { if (!dragging) { if (offset < 0) prev(); else if (offset > 0) next(); } }}
            >
              <div style={inner}>
                <Image
                  src={src}
                  alt={`Altriva Studio Lookbook ${i + 1}`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 640px) 76vw, 430px"
                  priority={i < 3}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Floor line ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, zIndex: 22, pointerEvents: "none",
        top: "calc(44% + clamp(145px, 38vw, 215px))",
        height: "1px",
        background: "linear-gradient(to right, transparent 8%, rgba(255,255,255,0.05) 28%, rgba(255,255,255,0.05) 72%, transparent 92%)",
      }} />

      {/* ── Bottom: logo + dots + arrows ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30,
        padding: "0 1.5rem 2.25rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "1.1rem",
      }}>
        {/* Dot track */}
        <div style={{ display: "flex", gap: "0.28rem", alignItems: "center" }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Image ${i + 1}`}
              style={{
                width: i === current ? "1.25rem" : "0.22rem",
                height: "0.22rem",
                borderRadius: "2px",
                background: "#fff",
                opacity: i === current ? 0.9 : 0.28,
                border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
                transition: "width 0.3s ease, opacity 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Altriva logo (white) */}
        <div style={{ textAlign: "center" }}>
          <Image
            src="/images/altriva-logo.png"
            alt="Altriva Studio"
            width={730}
            height={160}
            style={{ height: "1.375rem", width: "auto", display: "block", margin: "0 auto", filter: "brightness(0) invert(1)", opacity: 0.82 }}
          />
          <p style={{ color: "#fff", fontSize: "0.4375rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.4, marginTop: "0.25rem" }}>
            Lookbook
          </p>
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <button onClick={prev} disabled={current === 0} aria-label="Previous"
            style={{ background: "none", border: "none", cursor: current === 0 ? "default" : "pointer", color: "#fff", opacity: current === 0 ? 0.18 : 0.65, padding: "0.5rem", display: "flex" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "1.25rem", height: "1.25rem" }}>
              <path d="M13 5l-5 5 5 5" />
            </svg>
          </button>
          <button onClick={next} disabled={current === images.length - 1} aria-label="Next"
            style={{ background: "none", border: "none", cursor: current === images.length - 1 ? "default" : "pointer", color: "#fff", opacity: current === images.length - 1 ? 0.18 : 0.65, padding: "0.5rem", display: "flex" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "1.25rem", height: "1.25rem" }}>
              <path d="M7 5l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
