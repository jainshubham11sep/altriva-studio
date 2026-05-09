"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "recover">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recovered, setRecovered] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.2)", padding: "0.5rem 0",
    fontSize: "0.875rem", outline: "none", color: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.625rem", letterSpacing: "0.06em", textTransform: "uppercase",
    opacity: 0.5, display: "block", marginBottom: "0.25rem",
  };

  return (
    <div style={{ padding: "3rem var(--page-margin) 5rem", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "2rem" }}>

        {mode === "login" && (
          <>
            <h1 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Sign In</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input style={inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <button
              style={{
                background: "#000", color: "#fff", border: "none",
                padding: "0.875rem 1.5rem", fontSize: "0.6875rem",
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", width: "100%",
              }}
            >
              Sign In
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button
                onClick={() => setMode("recover")}
                style={{ background: "none", border: "none", padding: 0, fontSize: "0.6875rem", cursor: "pointer", textAlign: "left", opacity: 0.5, letterSpacing: "0.04em" }}
              >
                Forgot your password?
              </button>
              <Link href="/account/register" style={{ fontSize: "0.6875rem", opacity: 0.5, letterSpacing: "0.04em", color: "inherit", textDecoration: "none" }}>
                Create an account →
              </Link>
            </div>
          </>
        )}

        {mode === "recover" && !recovered && (
          <>
            <h1 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Reset Password</h1>
            <p style={{ fontSize: "0.75rem", opacity: 0.6, lineHeight: 1.5 }}>
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button
              onClick={() => setRecovered(true)}
              style={{ background: "#000", color: "#fff", border: "none", padding: "0.875rem 1.5rem", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", width: "100%" }}
            >
              Recover Password
            </button>
            <button onClick={() => setMode("login")} style={{ background: "none", border: "none", padding: 0, fontSize: "0.6875rem", cursor: "pointer", textAlign: "left", opacity: 0.5 }}>
              ← Back to Sign In
            </button>
          </>
        )}

        {mode === "recover" && recovered && (
          <>
            <h1 style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Check your email</h1>
            <p style={{ fontSize: "0.75rem", opacity: 0.6, lineHeight: 1.5 }}>
              We&apos;ve sent a confirmation email with a link to reset your password.
            </p>
            <button
              onClick={() => { setMode("login"); setRecovered(false); }}
              style={{ background: "#000", color: "#fff", border: "none", padding: "0.875rem 1.5rem", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", width: "100%" }}
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
