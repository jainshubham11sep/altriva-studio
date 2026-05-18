import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem var(--page-margin)",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      <p style={{ fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
        Altriva Studio
      </p>
      <h1
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          opacity: 0.12,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "1.25rem",
          fontWeight: 400,
          letterSpacing: "0.01em",
          lineHeight: 1.4,
          marginTop: "-0.5rem",
        }}
      >
        This page has moved on.
      </p>
      <p style={{ fontSize: "0.75rem", opacity: 0.5, letterSpacing: "0.015em", lineHeight: 1.6, maxWidth: "320px" }}>
        The page you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          background: "#000",
          color: "#fff",
          padding: "0.875rem 2rem",
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          marginTop: "0.5rem",
        }}
      >
        Back to Home
      </Link>
      <Link
        href="/collections/new-in"
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "inherit",
          textDecoration: "none",
          opacity: 0.45,
        }}
      >
        Browse New In
      </Link>
    </div>
  );
}
