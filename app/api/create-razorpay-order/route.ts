import { NextResponse } from "next/server";
import { createOnlineOrder, parseOrder } from "@/lib/orders";

export async function POST(req: Request) {
  try {
    const { amount, order } = await req.json(); // amount in INR (whole rupees); order = full checkout details

    const parsed = parseOrder(order, "online");
    if (order && !parsed) console.error("[order] online order details invalid — creating Razorpay order without them:", JSON.stringify(order).slice(0, 500));

    const rzpOrder = await createOnlineOrder(amount, parsed);
    return NextResponse.json({ orderId: rzpOrder.id, amount: rzpOrder.amount, currency: rzpOrder.currency });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
