import { NextResponse } from "next/server";
import { isValidEmail, parseOrder, placeCodOrder } from "@/lib/orders";

export const maxDuration = 60; // room for email retries

// Places a cash-on-delivery order: saves it, then emails the admin and the customer.
// The order counts as placed even if an email fails — failures are logged, not shown to the customer.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const order = parseOrder(body, "cod");
  if (!order || !isValidEmail(order.contact.email)) {
    console.error("[order] COD order rejected — invalid data:", JSON.stringify(body).slice(0, 500));
    return NextResponse.json({ ok: false, error: "Invalid order data" }, { status: 400 });
  }

  try {
    const { razorpayOrderId, emails } = await placeCodOrder(order);
    return NextResponse.json({ ok: true, orderNum: order.orderNum, razorpayOrderId, emailSent: emails.admin.ok && emails.customer.ok });
  } catch (err) {
    // placeCodOrder doesn't throw on save/email failures; this is a last-resort guard.
    console.error(`[order] #${order.orderNum} (COD): unexpected error —`, err);
    return NextResponse.json({ ok: true, orderNum: order.orderNum, emailSent: false });
  }
}
