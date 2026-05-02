"use client";

export default function ProductActions() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <button
        style={{
          width: "100%",
          background: "#000",
          color: "#fff",
          padding: "0.875rem 1.5rem",
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          border: "none",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        Add to Bag
      </button>
      <button
        style={{
          width: "100%",
          background: "transparent",
          color: "#000",
          padding: "0.875rem 1.5rem",
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          border: "1px solid rgba(0,0,0,0.2)",
          transition: "border-color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.6)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.2)")}
      >
        Save to Wishlist
      </button>
    </div>
  );
}
