import { NextResponse } from "next/server";
import { finalizeOnlineOrder } from "@/lib/orders";
import { verifyCheckoutSignature } from "@/lib/razorpay";

export const maxDuration = 60; // room for email retries

// Called by the checkout page right after Razorpay reports a successful payment.
// If the customer's browser never gets here (e.g. phone switched to a UPI app), the webhook covers it.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const orderId = String(body?.razorpay_order_id ?? "");
  const paymentId = String(body?.razorpay_payment_id ?? "");
  const signature = String(body?.razorpay_signature ?? "");

  if (!orderId || !paymentId || !verifyCheckoutSignature(orderId, paymentId, signature)) {
    console.error(`[order] payment confirmation rejected — missing fields or bad signature (order ${orderId || "?"}, payment ${paymentId || "?"})`);
    return NextResponse.json({ ok: false, error: "Invalid payment confirmation" }, { status: 400 });
  }

  const result = await finalizeOnlineOrder(orderId, paymentId, "checkout");
  const ok = result.status === "sent" || result.status === "already_sent" || result.status === "in_progress";
  return NextResponse.json({ ok, status: result.status }, { status: ok ? 200 : 500 });
}
