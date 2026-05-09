"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

type Step = "contact" | "shipping" | "payment" | "confirmed";

const SHIPPING_OPTIONS = [
  { id: "express", label: "DHL Express", desc: "1–3 business days", price: 1500 },
  { id: "standard", label: "DHL Standard", desc: "4–7 business days", price: 0 },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("contact");
  const [shipping, setShipping] = useState("standard");
  const [orderNum] = useState(() => Math.floor(Math.random() * 900000 + 100000).toString());

  const [contact, setContact] = useState({
    email: "", firstName: "", lastName: "",
    address: "", city: "", state: "", zip: "", country: "India", phone: "",
  });
  const [payment, setPayment] = useState({ card: "", expiry: "", cvv: "", name: "" });

  const shippingCost = SHIPPING_OPTIONS.find((o) => o.id === shipping)?.price ?? 0;
  const total = subtotal + shippingCost;

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div style={{ padding: "4rem var(--page-margin)", textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem", opacity: 0.6, marginBottom: "1.5rem" }}>Your bag is empty.</p>
        <Link href="/" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "inherit" }}>
          Continue Shopping →
        </Link>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: "0.5rem 0", fontSize: "0.875rem", outline: "none", color: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.625rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.5,
    display: "block", marginBottom: "0.25rem",
  };

  return (
    <div style={{ padding: "2rem var(--page-margin) 4rem" }}>
      {/* Breadcrumb steps */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap" }}>
        {(["contact", "shipping", "payment"] as Step[]).map((s, i) => (
          <span key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {i > 0 && <span style={{ opacity: 0.3 }}>/</span>}
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                opacity: step === s ? 1 : 0.35,
                fontWeight: step === s ? 500 : 400,
              }}
            >
              {s === "contact" ? "Contact & Shipping" : s === "shipping" ? "Shipping Method" : "Payment"}
            </span>
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "4rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Left — form */}
        <div style={{ flex: "1 1 400px", maxWidth: "560px" }}>

          {/* ── STEP 1: Contact & Shipping ── */}
          {step === "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h2 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Contact & Shipping
              </h2>

              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={contact.email}
                  onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>First name</label>
                  <input style={inputStyle} value={contact.firstName}
                    onChange={(e) => setContact((p) => ({ ...p, firstName: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Last name</label>
                  <input style={inputStyle} value={contact.lastName}
                    onChange={(e) => setContact((p) => ({ ...p, lastName: e.target.value }))} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Address</label>
                <input style={inputStyle} value={contact.address}
                  onChange={(e) => setContact((p) => ({ ...p, address: e.target.value }))} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input style={inputStyle} value={contact.city}
                    onChange={(e) => setContact((p) => ({ ...p, city: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <input style={inputStyle} value={contact.state}
                    onChange={(e) => setContact((p) => ({ ...p, state: e.target.value }))} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>PIN Code</label>
                  <input style={inputStyle} value={contact.zip}
                    onChange={(e) => setContact((p) => ({ ...p, zip: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Country</label>
                  <input style={inputStyle} value={contact.country}
                    onChange={(e) => setContact((p) => ({ ...p, country: e.target.value }))} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} type="tel" value={contact.phone}
                  onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))} />
              </div>

              <button
                onClick={() => {
                  if (contact.email && contact.firstName && contact.address) setStep("shipping");
                }}
                style={{
                  background: "#000", color: "#fff", border: "none", padding: "0.875rem 1.5rem",
                  fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer", marginTop: "0.5rem",
                }}
              >
                Continue to Shipping →
              </button>
            </div>
          )}

          {/* ── STEP 2: Shipping Method ── */}
          {step === "shipping" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h2 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Shipping Method
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.1)", cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="radio" name="shipping" value={opt.id}
                        checked={shipping === opt.id}
                        onChange={() => setShipping(opt.id)}
                        style={{ accentColor: "#000", width: "14px", height: "14px" }}
                      />
                      <div>
                        <p style={{ fontSize: "0.6875rem", letterSpacing: "0.04em" }}>{opt.label}</p>
                        <p style={{ fontSize: "0.625rem", opacity: 0.5, marginTop: "0.125rem" }}>{opt.desc}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.6875rem" }}>
                      {opt.price === 0 ? "Free" : `Rs. ${opt.price.toLocaleString("en-IN")}`}
                    </span>
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => setStep("contact")}
                  style={{ background: "none", border: "1px solid rgba(0,0,0,0.2)", padding: "0.875rem 1.25rem", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep("payment")}
                  style={{ flex: 1, background: "#000", color: "#fff", border: "none", padding: "0.875rem 1.5rem", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Payment ── */}
          {step === "payment" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h2 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Payment
              </h2>

              {/* Card info */}
              <div style={{ border: "1px solid rgba(0,0,0,0.15)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Card Number</label>
                  <input
                    style={inputStyle} placeholder="1234 5678 9012 3456"
                    value={payment.card} maxLength={19}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                      setPayment((p) => ({ ...p, card: v }));
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Name on Card</label>
                  <input style={inputStyle} value={payment.name}
                    onChange={(e) => setPayment((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Expiry (MM/YY)</label>
                    <input style={inputStyle} placeholder="MM/YY" value={payment.expiry} maxLength={5}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2");
                        setPayment((p) => ({ ...p, expiry: v }));
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>CVV</label>
                    <input style={inputStyle} placeholder="•••" type="password" value={payment.cvv} maxLength={4}
                      onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))} />
                  </div>
                </div>
              </div>

              {/* Accepted cards */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                {["VISA", "MC", "AMEX", "UPI"].map((c) => (
                  <span key={c} style={{ fontSize: "0.5625rem", letterSpacing: "0.06em", border: "1px solid rgba(0,0,0,0.15)", padding: "0.2rem 0.4rem", opacity: 0.5 }}>
                    {c}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: "0.625rem", opacity: 0.45, lineHeight: 1.5 }}>
                Your payment information is encrypted and secure. We do not store your card details.
              </p>

              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => setStep("shipping")}
                  style={{ background: "none", border: "1px solid rgba(0,0,0,0.2)", padding: "0.875rem 1.25rem", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (payment.card.length >= 19 && payment.name && payment.expiry.length === 5 && payment.cvv.length >= 3) {
                      clearCart();
                      setStep("confirmed");
                    }
                  }}
                  style={{ flex: 1, background: "#000", color: "#fff", border: "none", padding: "0.875rem 1.5rem", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Pay Rs.&nbsp;{total.toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          )}

          {/* ── CONFIRMED ── */}
          {step === "confirmed" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 16 16" fill="white" width="14" height="14"><path d="M2 8l4 4 8-8" stroke="white" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 400 }}>
                Order Confirmed
              </h2>
              <p style={{ fontSize: "0.875rem", opacity: 0.7, lineHeight: 1.6 }}>
                Thank you for your order. A confirmation has been sent to {contact.email || "your email"}.
              </p>
              <p style={{ fontSize: "0.6875rem", opacity: 0.5 }}>Order #{orderNum}</p>
              <Link
                href="/"
                style={{
                  display: "inline-block", background: "#000", color: "#fff",
                  padding: "0.875rem 2rem", fontSize: "0.6875rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", textDecoration: "none", marginTop: "1rem",
                }}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Right — order summary */}
        {step !== "confirmed" && (
          <div style={{ flex: "0 0 300px", display: "flex", flexDirection: "column", gap: "0" }}>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", opacity: 0.45 }}>
              Order Summary
            </p>
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.07)", alignItems: "flex-start" }}
                >
                  <div style={{ position: "relative", width: "56px", aspectRatio: "4/5", backgroundColor: "#f5f5f3", flexShrink: 0 }}>
                    <Image src={item.product.image} alt={item.product.displayName} fill className="object-cover" sizes="56px" />
                    <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#000", color: "#fff", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5625rem" }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.6875rem", textTransform: "capitalize", lineHeight: 1.3 }}>{item.product.displayName}</p>
                    {item.size !== "O/S" && <p style={{ fontSize: "0.625rem", opacity: 0.5, marginTop: "0.2rem" }}>{item.size}</p>}
                  </div>
                  <p style={{ fontSize: "0.6875rem", flexShrink: 0 }}>Rs.&nbsp;{(item.product.priceInr * item.quantity).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.6875rem", opacity: 0.6 }}>Subtotal</span>
                <span style={{ fontSize: "0.6875rem" }}>Rs.&nbsp;{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.6875rem", opacity: 0.6 }}>Shipping</span>
                <span style={{ fontSize: "0.6875rem" }}>{shippingCost === 0 ? "Free" : `Rs. ${shippingCost.toLocaleString("en-IN")}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>Total</span>
                <span style={{ fontSize: "0.75rem" }}>Rs.&nbsp;{total.toLocaleString("en-IN")}</span>
              </div>
              <p style={{ fontSize: "0.5625rem", opacity: 0.4 }}>Duties & taxes included</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
