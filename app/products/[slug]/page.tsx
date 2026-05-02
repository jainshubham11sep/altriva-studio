import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductActions from "@/components/ProductActions";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 4);

  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* Breadcrumb */}
      <div
        style={{
          padding: "0.75rem var(--page-margin)",
          fontSize: "0.6875rem",
          letterSpacing: "0.05em",
          display: "flex",
          gap: "0.5rem",
          opacity: 0.5,
        }}
      >
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <span style={{ textTransform: "capitalize" }}>{product.category.toLowerCase()}</span>
        <span>/</span>
        <span style={{ textTransform: "capitalize" }}>{product.displayName}</span>
      </div>

      {/* Main layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "0 var(--page-margin)",
        }}
        className="lg:flex-row lg:gap-8 lg:items-start"
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            backgroundColor: "#f5f5f3",
            aspectRatio: product.aspect === "portrait" ? "4/5" : "1/1",
            flexShrink: 0,
          }}
          className="w-full lg:w-3/5"
        >
          <Image
            src={product.image}
            alt={product.displayName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          {product.badge && (
            <span
              className="absolute top-3 left-3 bg-white px-2 py-0.5"
              style={{ fontSize: "0.625rem", letterSpacing: "0.04em", zIndex: 10 }}
            >
              [{product.badge}]
            </span>
          )}
        </div>

        {/* Details */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          className="lg:sticky lg:top-[var(--total-header-height)] lg:pt-2 lg:w-2/5"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              {product.category}
            </p>
            <h1
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: 400,
                letterSpacing: "0.01em",
                lineHeight: 1.3,
                textTransform: "capitalize",
              }}
            >
              {product.displayName}
            </h1>
            <p style={{ fontSize: "0.875rem", letterSpacing: "0.02em", marginTop: "0.25rem" }}>
              Rs.&nbsp;{product.priceInr.toLocaleString("en-IN")}
            </p>
            {product.colors && product.colors > 1 && (
              <p style={{ fontSize: "0.6875rem", opacity: 0.6, fontStyle: "italic" }}>
                {product.colors} colours available
              </p>
            )}
          </div>

          <ProductActions />

          {/* Product info */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.1)",
              paddingTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.015em", lineHeight: 1.6, opacity: 0.7 }}>
              Complimentary UK shipping on orders above £300. Free returns within 30 days.
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding: "3rem var(--page-margin) 0" }}>
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              opacity: 0.5,
            }}
          >
            You may also like
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.375rem",
              flexWrap: "wrap",
            }}
          >
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                style={{
                  width: "calc(25% - 0.375rem * 3 / 4)",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: p.aspect === "portrait" ? "4/5" : "1/1",
                    backgroundColor: "#f5f5f3",
                  }}
                >
                  <Image src={p.image} alt={p.displayName} fill className="object-cover" sizes="25vw" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.02em",
                      textTransform: "capitalize",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {p.displayName}
                  </p>
                  <p style={{ fontSize: "0.6875rem", opacity: 0.6, marginTop: "0.125rem" }}>
                    Rs.&nbsp;{p.priceInr.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
