"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useCart } from "@/contexts/CartContext";
import { pixelInitiateCheckout, pixelAddPaymentInfo, pixelPurchase } from "@/lib/pixel";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [paying, setPaying] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [orderNum] = useState(() => Math.floor(Math.random() * 900000 + 100000).toString());
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

  const [contact, setContact] = useState({
    email: "", firstName: "", lastName: "",
    address: "", city: "", state: "", zip: "", country: "India", phone: "",
  });

  const total = subtotal;

  useEffect(() => {
    if (typeof window !== "undefined" && window.Razorpay) setRazorpayLoaded(true);
  }, []);

  useEffect(() => {
    if (items.length > 0) pixelInitiateCheckout(items, subtotal);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sendOrderEmail = (extraNote?: string) =>
    fetch("/api/send-order-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNum, items, total, contact, paymentMethod, extraNote }),
    }).catch(() => {});

  const handlePay = async () => {
    if (!contact.firstName || !contact.address) {
      alert("Please fill in your name and delivery address.");
      return;
    }

    if (paymentMethod === "cod") {
      setPaying(true);
      pixelPurchase(orderNum, total, items);
      sendOrderEmail("Payment: Cash on Delivery");
      clearCart();
      setConfirmed(true);
      return;
    }

    if (!razorpayLoaded) {
      alert("Payment gateway is loading. Please try again in a moment.");
      return;
    }
    setPaying(true);
    try {
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      pixelAddPaymentInfo(total);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Altriva Studio",
        description: `Order #${orderNum}`,
        order_id: data.orderId,
        prefill: {
          name: `${contact.firstName} ${contact.lastName}`,
          email: contact.email,
          contact: contact.phone,
        },
        notes: {
          address: `${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}`,
        },
        theme: { color: "#000000" },
        handler: () => {
          pixelPurchase(data.orderId, total, items);
          sendOrderEmail("Payment: Online (Razorpay)");
          clearCart();
          setConfirmed(true);
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
      setPaying(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.2)", padding: "0.5rem 0",
    fontSize: "0.875rem", outline: "none", color: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.625rem", letterSpacing: "0.06em", textTransform: "uppercase",
    opacity: 0.5, display: "block", marginBottom: "0.25rem",
  };

  if (items.length === 0 && !confirmed) {
    return (
      <div style={{ padding: "4rem var(--page-margin)", textAlign: "center" }}>
        <p style={{ fontSize: "0.875rem", opacity: 0.6, marginBottom: "1.5rem" }}>Your bag is empty.</p>
        <Link href="/" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "inherit" }}>
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />

      <div style={{ padding: "2rem var(--page-margin) 4rem" }}>
        <div style={{ display: "flex", gap: "4rem", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Left — form or confirmation */}
          <div style={{ flex: "1 1 400px", maxWidth: "560px" }}>

            {!confirmed ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h2 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Contact &amp; Shipping
                </h2>

                <div>
                  <label style={labelStyle}>Email <span style={{ opacity: 0.4, fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                  <input style={inputStyle} type="email" value={contact.email}
                    onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>First name *</label>
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
                  <label style={labelStyle}>Address *</label>
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

                {/* Payment method */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={labelStyle}>Payment Method</span>
                  {(["online", "cod"] as const).map((m) => (
                    <label
                      key={m}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.875rem 1rem", cursor: "pointer",
                        border: paymentMethod === m ? "1px solid #000" : "1px solid rgba(0,0,0,0.15)",
                        transition: "border-color 0.15s",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m}
                        checked={paymentMethod === m}
                        onChange={() => setPaymentMethod(m)}
                        style={{ accentColor: "#000", width: "14px", height: "14px", flexShrink: 0 }}
                      />
                      <div>
                        <p style={{ fontSize: "0.6875rem", letterSpacing: "0.02em" }}>
                          {m === "online" ? "Pay Online" : "Cash on Delivery"}
                        </p>
                        <p style={{ fontSize: "0.5625rem", opacity: 0.45, marginTop: "0.15rem" }}>
                          {m === "online" ? "UPI, Cards, Net Banking & Wallets via Razorpay" : "Pay in cash when your order arrives"}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handlePay}
                  disabled={paying}
                  style={{
                    background: paying ? "rgba(0,0,0,0.6)" : "#000",
                    color: "#fff", border: "none",
                    padding: "0.9375rem 1.5rem",
                    fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: paying ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  }}
                >
                  {paying ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: "14px", height: "14px", animation: "spin 1s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Processing…
                    </>
                  ) : (
                    paymentMethod === "cod"
                      ? `Place Order — Rs. ${total.toLocaleString("en-IN")} (COD) →`
                      : `Pay Rs. ${total.toLocaleString("en-IN")} →`
                  )}
                </button>

                {paymentMethod === "online" && (
                  <p style={{ fontSize: "0.5625rem", opacity: 0.4 }}>
                    Secure payment via Razorpay — UPI, Cards, Net Banking &amp; Wallets accepted.
                  </p>
                )}
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" width="18" height="18">
                    <path d="M2 8l4 4 8-8" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 400 }}>
                  Order Confirmed
                </h2>
                <p style={{ fontSize: "0.875rem", opacity: 0.7, lineHeight: 1.7 }}>
                  Thank you for your order.
                  {contact.email && (
                    <> A confirmation has been sent to <strong>{contact.email}</strong>.</>
                  )}
                </p>
                <p style={{ fontSize: "0.6875rem", opacity: 0.4, letterSpacing: "0.04em" }}>
                  Order #{orderNum}
                </p>
                <Link href="/"
                  style={{ display: "inline-block", background: "#000", color: "#fff", padding: "0.875rem 2rem", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", marginTop: "1rem", width: "fit-content" }}>
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right — order summary */}
          {!confirmed && (
            <div style={{ flex: "0 0 300px", display: "flex", flexDirection: "column", gap: "0" }}>
              <p style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", opacity: 0.45 }}>
                Order Summary
              </p>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`}
                    style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.07)", alignItems: "flex-start" }}>
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
                  <span style={{ fontSize: "0.6875rem" }}>Free</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>Total</span>
                  <span style={{ fontSize: "0.75rem" }}>Rs.&nbsp;{total.toLocaleString("en-IN")}</span>
                </div>
                <p style={{ fontSize: "0.5625rem", opacity: 0.4 }}>Duties &amp; taxes included</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
