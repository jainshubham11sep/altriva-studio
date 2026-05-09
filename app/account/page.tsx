import Link from "next/link";

export default function AccountPage() {
  return (
    <div style={{ padding: "3rem var(--page-margin) 5rem", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        <h1 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>My Account</h1>

        {/* Sections */}
        {[
          { title: "My Orders & Returns", desc: "View your order history and initiate returns.", href: "#" },
          { title: "Address Book", desc: "Manage your saved delivery addresses.", href: "#" },
          { title: "Payment Methods", desc: "Manage your saved payment preferences.", href: "#" },
          { title: "Account Details", desc: "Update your name, email and password.", href: "#" },
        ].map((section) => (
          <a
            key={section.title}
            href={section.href}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "1.25rem 0", borderTop: "1px solid rgba(0,0,0,0.1)",
              textDecoration: "none", color: "inherit",
            }}
          >
            <div>
              <p style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{section.title}</p>
              <p style={{ fontSize: "0.6875rem", opacity: 0.5, marginTop: "0.25rem" }}>{section.desc}</p>
            </div>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: "1rem", height: "1rem", opacity: 0.4 }}>
              <path d="M6 4l4 4-4 4" />
            </svg>
          </a>
        ))}

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "1.5rem" }}>
          <Link
            href="/account/login"
            style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", opacity: 0.5, color: "inherit", textDecoration: "none" }}
          >
            Sign Out →
          </Link>
        </div>
      </div>
    </div>
  );
}
