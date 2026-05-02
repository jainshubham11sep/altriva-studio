const moreFeatured = [
  { count: 56, label: "Men's New In", href: "#" },
  { count: 79, label: "Women's New In", href: "#" },
  { count: 41, label: "Loafer Bags", href: "#" },
];

export default function MoreFeatured() {
  return (
    <section style={{ padding: "3rem var(--page-margin) 4rem" }}>
      {/* SEO text block */}
      <div className="mb-8" style={{ maxWidth: "480px" }}>
        <h2
          className="text-heading"
          style={{ fontSize: "1rem", lineHeight: "1.6", letterSpacing: "0.01em" }}
        >
          Iconic day-to-night silhouettes; each style reflecting the perfect
          balance of femininity and modernity. From tailored shirt dresses,
          long-line evening dresses to statement pieces straight from the runway.
        </h2>
        <a
          href="#"
          className="text-caption block mt-3 hover:italic transition-all"
          style={{ opacity: 0.6 }}
        >
          Learn more
        </a>
      </div>

      {/* More featured links */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(0,0,0,0.1)" }}
      >
        <p
          className="nav-link py-4"
          style={{ opacity: 0.4 }}
        >
          More featured
        </p>
        {moreFeatured.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between py-4 border-t hover:italic transition-all"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            <span className="text-heading text-xl">{item.label}</span>
            <span className="text-caption opacity-50 group-hover:opacity-0 transition-opacity">
              [{item.count}]
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
