import crypto from "node:crypto";

// Thin wrapper over the Razorpay REST API (https://razorpay.com/docs/api/). Server-side only.

export type RazorpayNotes = Record<string, string>;

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  notes: RazorpayNotes | [];
};

export type RazorpayPayment = {
  id: string;
  order_id: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  amount: number;
  email?: string;
  contact?: string;
};

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set");

  const res = await fetch(`https://api.razorpay.com/v1${path}`, {
    method,
    headers: {
      Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Razorpay ${method} ${path} failed (${res.status}): ${text}`);
  return JSON.parse(text) as T;
}

export const createOrder = (amountPaise: number, receipt: string, notes?: RazorpayNotes) =>
  call<RazorpayOrder>("POST", "/orders", { amount: amountPaise, currency: "INR", receipt, notes });

export const fetchOrder = (orderId: string) => call<RazorpayOrder>("GET", `/orders/${orderId}`);

export const updateOrderNotes = (orderId: string, notes: RazorpayNotes) =>
  call<RazorpayOrder>("PATCH", `/orders/${orderId}`, { notes });

export const fetchPayment = (paymentId: string) => call<RazorpayPayment>("GET", `/payments/${paymentId}`);

// Razorpay returns `[]` instead of `{}` when an order has no notes.
export const notesOf = (order: RazorpayOrder): RazorpayNotes => (Array.isArray(order.notes) ? {} : order.notes);

function safeEqualHex(expected: string, received: string) {
  const a = Buffer.from(expected);
  const b = Buffer.from(received || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Signature Razorpay Checkout hands to the browser after a successful payment.
export function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqualHex(expected, signature);
}

// Signature on webhook requests (X-Razorpay-Signature header), computed over the raw request body.
export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}
