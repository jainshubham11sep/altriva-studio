"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ padding: "2rem 0", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.125rem", fontWeight: 400, marginBottom: "0.5rem" }}>
          Message received.
        </p>
        <p style={{ fontSize: "0.75rem", opacity: 0.55, lineHeight: 1.6 }}>
          We&apos;ll get back to you within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}
    >
      <p style={{ fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.45 }}>
        Send a message
      </p>

      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "0.375rem" }}>
        <label style={{ display: "block", fontSize: "0.5625rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.4, marginBottom: "0.25rem" }}>
          Name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "0.8125rem", letterSpacing: "0.02em", color: "inherit" }}
        />
      </div>

      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "0.375rem" }}>
        <label style={{ display: "block", fontSize: "0.5625rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.4, marginBottom: "0.25rem" }}>
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "0.8125rem", letterSpacing: "0.02em", color: "inherit" }}
        />
      </div>

      <div style={{ borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "0.375rem" }}>
        <label style={{ display: "block", fontSize: "0.5625rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.4, marginBottom: "0.25rem" }}>
          Message
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: "0.8125rem", letterSpacing: "0.02em", color: "inherit", fontFamily: "inherit" }}
        />
      </div>

      <button
        type="submit"
        style={{
          alignSelf: "flex-start",
          background: "#000",
          color: "#fff",
          border: "none",
          padding: "0.875rem 2rem",
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </form>
  );
}
