import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const NOTIFY_EMAILS = ["vaieziqbal29@gmail.com", "altrivaindia@gmail.com"];
const SENDER_EMAIL = "altrivaindia@gmail.com";
const SENDER_PASS = "your_gmail_app_password_here";

export async function POST(req: Request) {
  try {
    const { orderNum, items, total, contact, paymentMethod, extraNote } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASS,
      },
    });

    const itemRows = items
      .map(
        (item: { product: { displayName: string; priceInr: number }; size: string; quantity: number }) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.product.displayName}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.size}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">Rs. ${(item.product.priceInr * item.quantity).toLocaleString("en-IN")}</td>
        </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#000;">
        <h2 style="letter-spacing:0.05em;font-size:18px;margin-bottom:4px;">New Order — Altriva Studio</h2>
        <p style="font-size:13px;color:#666;margin-top:0;">Order #${orderNum}</p>

        <h3 style="font-size:13px;letter-spacing:0.06em;text-transform:uppercase;margin-top:24px;margin-bottom:8px;">Customer</h3>
        <table style="font-size:13px;width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#666;width:120px;">Name</td><td>${contact.firstName} ${contact.lastName}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Email</td><td>${contact.email || "—"}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Phone</td><td>${contact.phone || "—"}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Address</td><td>${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}, ${contact.country}</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Payment</td><td><strong>${paymentMethod === "cod" ? "Cash on Delivery" : "Online (Razorpay)"}</strong>${extraNote ? ` — ${extraNote}` : ""}</td></tr>
        </table>

        <h3 style="font-size:13px;letter-spacing:0.06em;text-transform:uppercase;margin-top:24px;margin-bottom:8px;">Items</h3>
        <table style="font-size:13px;width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:8px 12px;text-align:left;font-weight:500;">Product</th>
              <th style="padding:8px 12px;text-align:left;font-weight:500;">Size</th>
              <th style="padding:8px 12px;text-align:left;font-weight:500;">Qty</th>
              <th style="padding:8px 12px;text-align:left;font-weight:500;">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="margin-top:16px;font-size:15px;font-weight:600;">
          Total: Rs. ${total.toLocaleString("en-IN")}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Altriva Studio" <${SENDER_EMAIL}>`,
      to: NOTIFY_EMAILS.join(", "),
      subject: `New Order #${orderNum} — Rs. ${total.toLocaleString("en-IN")}${paymentMethod === "cod" ? " [COD]" : ""}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order email failed:", err);
    return NextResponse.json({ ok: false });
  }
}
