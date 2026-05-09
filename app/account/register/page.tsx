"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.2)", padding: "0.5rem 0",
    fontSize: "0.875rem", outline: "none", color: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.625rem", letterSpacing: "0.06em", textTransform: "uppercase",
    opacity: 0.5, display: "block", marginBottom: "0.25rem",
  };

  if (done) {
    return (
      <div style={{ padding: "3rem var(--page-margin) 5rem", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 400 }}>
            Welcome to Altriva Studio
          </h1>
          <p style={{ fontSize: "0.875rem", opacity: 0.6, lineHeight: 1.6 }}>
            Your account has been created. You can now sign in and start shopping.
          </p>
          <Link href="/account/login" style={{ display: "inline-block", background: "#000", color: "#fff", padding: "0.875rem 2rem", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem var(--page-margin) 5rem", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h1 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Create Account</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>First name</label>
              <input style={inputStyle} value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Last name</label>
              <input style={inputStyle} value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Password (min. 8 characters)</label>
            <input style={inputStyle} type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input style={inputStyle} type="password" value={form.confirm} onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))} />
          </div>

          <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: "0.125rem", accentColor: "#000", width: "14px", height: "14px", flexShrink: 0 }} />
            <span style={{ fontSize: "0.625rem", opacity: 0.6, lineHeight: 1.5 }}>
              I agree to receive marketing communications from Altriva Studio about news, events and offers, and accept the{" "}
              <Link href="/pages/terms-conditions" style={{ color: "inherit" }}>Terms of Use</Link> and{" "}
              <Link href="/pages/privacy-policy" style={{ color: "inherit" }}>Privacy Policy</Link>.
            </span>
          </label>
        </div>

        <button
          onClick={() => {
            if (form.firstName && form.email && form.password.length >= 8 && form.password === form.confirm) {
              setDone(true);
            }
          }}
          style={{ background: "#000", color: "#fff", border: "none", padding: "0.875rem 1.5rem", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", width: "100%" }}
        >
          Create Account
        </button>

        <Link href="/account/login" style={{ fontSize: "0.6875rem", opacity: 0.5, letterSpacing: "0.04em", color: "inherit", textDecoration: "none" }}>
          Already have an account? Sign In →
        </Link>
      </div>
    </div>
  );
}
