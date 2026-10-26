import { NextResponse } from "next/server";
import { finalizeOnlineOrder } from "@/lib/orders";
import { verifyWebhookSignature } from "@/lib/razorpay";

export const maxDuration = 60; // room for email retries

// Razorpay webhook (Dashboard → Accounts & Settings → Webhooks), events: order.paid, payment.captured.
// Server-to-server, so it fires even when the customer's browser never returns from the payment.
// A non-2xx response makes Razorpay retry the webhook later, which is how failed emails get retried.
export async function POST(req: Request) {
  const rawBody = await req.text();

  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    console.error("[webhook] RAZORPAY_WEBHOOK_SECRET is not set — cannot verify Razorpay webhooks");
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  if (!verifyWebhookSignature(rawBody, req.headers.get("x-razorpay-signature") ?? "")) {
    console.error("[webhook] rejected — signature does not match RAZORPAY_WEBHOOK_SECRET");
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as {
    event: string;
    payload: { order?: { entity: { id: string } }; payment?: { entity: { id: string; order_id: string } } };
  };
  const payment = event.payload.payment?.entity;
  const orderId = event.payload.order?.entity.id ?? payment?.order_id;
  console.log(`[webhook] received ${event.event} for order ${orderId ?? "?"} / payment ${payment?.id ?? "?"}`);

  if ((event.event !== "order.paid" && event.event !== "payment.captured") || !orderId) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const result = await finalizeOnlineOrder(orderId, payment?.id, "webhook");
  // "in_progress" → let Razorpay retry, in case the request currently sending fails.
  const ok = result.status === "sent" || result.status === "already_sent";
  return NextResponse.json({ ok, status: result.status }, { status: ok ? 200 : 500 });
}
