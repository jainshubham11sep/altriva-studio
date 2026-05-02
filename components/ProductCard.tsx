"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="product-card flex flex-col gap-2 cursor-pointer"
      style={{ animationDelay: `${index * 0.04}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#f5f5f3",
          aspectRatio: product.aspect === "portrait" ? "4/5" : "1/1",
        }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-colors duration-150"
          style={{ background: hovered ? "rgba(255,255,255,0.06)" : "transparent" }}
        />

        <Image
          src={product.image}
          alt={product.displayName}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: hovered && product.hoverImage ? 0 : 1 }}
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading={index < 8 ? "eager" : "lazy"}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt=""
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
            sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        )}

        {product.badge && (
          <span
            className="absolute top-2 left-2 z-20 bg-white px-2 py-0.5"
            style={{ fontSize: "0.625rem", letterSpacing: "0.04em" }}
          >
            [{product.badge}]
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5">
        <h2 className="product-name">{product.displayName}</h2>
        <div className="flex items-center gap-2 text-caption">
          <span style={{ fontSize: "0.6875rem" }}>
            Rs.&nbsp;{product.priceInr.toLocaleString("en-IN")}
          </span>
          {product.colors && product.colors > 1 && (
            <>
              <span style={{ opacity: 0.3 }}>·</span>
              <span style={{ fontStyle: "italic", opacity: 0.6, fontSize: "0.6875rem" }}>
                {product.colors} colours
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
