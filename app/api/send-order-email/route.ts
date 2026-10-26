import { NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/orderEmail";
import { parseOrder } from "@/lib/orders";

export const maxDuration = 60; // room for email retries

// Sends the order emails for the given order, without saving it or taking payment.
// The checkout page no longer uses this (see /api/orders/cod and /api/orders/confirm-payment);
// it's kept for testing, and uses exactly the same email code as real orders.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const order = parseOrder(body, body?.paymentMethod === "cod" ? "cod" : "online");
  if (!order) {
    console.error("[order-email] invalid request:", JSON.stringify(body).slice(0, 500));
    return NextResponse.json({ ok: false, error: "Invalid order data" }, { status: 400 });
  }

  const emails = await sendOrderEmails(order);
  if (!emails.admin.ok) {
    return NextResponse.json({ ok: false, error: "Failed to send order email" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
