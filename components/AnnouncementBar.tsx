"use client";

import { useState, useEffect } from "react";
import { announcements } from "@/lib/products";

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % announcements.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="announcement-bar">
      {/* Desktop: absolute positioned, rotating */}
      <div className="relative w-full min-h-8 hidden md:flex items-center justify-center overflow-hidden">
        {announcements.map((a, i) => (
          <a
            key={i}
            href={a.href}
            className="absolute inset-0 flex items-center justify-center px-3 transition-all duration-500"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "translateX(0)" : "translateX(100%)",
              pointerEvents: i === idx ? "auto" : "none",
              fontSize: "0.75rem",
              letterSpacing: "0.02em",
            }}
          >
            {a.text}
          </a>
        ))}
      </div>

      {/* Mobile: single message, block layout, auto height */}
      <div className="w-full md:hidden">
        {announcements.map((a, i) => (
          <a
            key={i}
            href={a.href}
            className="flex w-full items-center justify-center px-3 py-2 text-center transition-all duration-500"
            style={{
              display: i === idx ? "flex" : "none",
              fontSize: "0.75rem",
              letterSpacing: "0.02em",
              lineHeight: "1.3",
            }}
          >
            {a.text}
          </a>
        ))}
      </div>
    </div>
  );
}
