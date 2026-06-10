import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const NOTIFY_EMAILS = ["vaieziqbal29@gmail.com", "altrivaindia@gmail.com"];
const SENDER_EMAIL = "altrivaindia@gmail.com";
const SENDER_PASS = "bswzeytwujlnptnv"; // replace with Gmail App Password

type Item = {
  product: { displayName: string; priceInr: number };
  size: string;
  quantity: number;
};

function buildItemRows(items: Item[]) {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${item.product.displayName}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${item.size}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${item.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">Rs. ${(item.product.priceInr * item.quantity).toLocaleString("en-IN")}</td>
      </tr>`
    )
    .join("");
}

function itemsTable(rows: string) {
  return `
    <table style="width:100%;border-collapse:collapse;margin-top:8px;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:10px 12px;text-align:left;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-weight:500;">Product</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-weight:500;">Size</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-weight:500;">Qty</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-weight:500;">Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

export async function POST(req: Request) {
  try {
    const { orderNum, items, total, contact, paymentMethod } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: SENDER_EMAIL, pass: SENDER_PASS },
    });

    const rows = buildItemRows(items);
    const paymentLabel = paymentMethod === "cod" ? "Cash on Delivery" : "Online (Razorpay)";

    // ── Admin email ──────────────────────────────────────────────────────────
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#000;padding:24px 0;">
        <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;margin:0 0 8px;">Altriva Studio</p>
        <h2 style="font-size:20px;margin:0 0 4px;font-weight:600;">New Order Received</h2>
        <p style="font-size:13px;color:#666;margin:0 0 28px;">Order #${orderNum} &nbsp;·&nbsp; ${paymentLabel}</p>

        <h3 style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;color:#444;">Customer Details</h3>
        <table style="font-size:13px;width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr><td style="padding:5px 0;color:#888;width:110px;">Name</td><td>${contact.firstName} ${contact.lastName}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Email</td><td>${contact.email || "—"}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Phone</td><td>${contact.phone || "—"}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Address</td><td>${contact.address}, ${contact.city}${contact.state ? ", " + contact.state : ""} ${contact.zip}, ${contact.country}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Payment</td><td><strong>${paymentLabel}</strong></td></tr>
        </table>

        <h3 style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;color:#444;">Order Items</h3>
        ${itemsTable(rows)}

        <div style="margin-top:20px;padding-top:16px;border-top:2px solid #000;display:flex;justify-content:space-between;">
          <span style="font-size:14px;font-weight:600;">Total</span>
          <span style="font-size:14px;font-weight:600;">Rs. ${total.toLocaleString("en-IN")}</span>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"Altriva Studio" <${SENDER_EMAIL}>`,
      to: NOTIFY_EMAILS.join(", "),
      subject: `New Order #${orderNum} — Rs. ${total.toLocaleString("en-IN")}${paymentMethod === "cod" ? " [COD]" : ""}`,
      html: adminHtml,
    });

    // ── Customer confirmation email ──────────────────────────────────────────
    if (contact.email) {
      const customerHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#000;padding:24px 0;">
          <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;margin:0 0 8px;">Altriva Studio</p>
          <h2 style="font-size:20px;margin:0 0 12px;font-weight:600;">Your order is confirmed.</h2>
          <p style="font-size:14px;color:#444;line-height:1.7;margin:0 0 28px;">
            Hi ${contact.firstName}, thank you for your order. We've received it and it's being prepared.
            ${paymentMethod === "cod" ? "You'll pay in cash when your order arrives." : "Your payment has been received."}
          </p>

          <h3 style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;color:#444;">Order Summary &nbsp; <span style="color:#999;font-weight:400;">#${orderNum}</span></h3>
          ${itemsTable(rows)}

          <div style="margin-top:20px;padding-top:16px;border-top:2px solid #000;">
            <table style="width:100%;font-size:13px;">
              <tr>
                <td style="padding:4px 0;color:#888;">Subtotal</td>
                <td style="text-align:right;">Rs. ${total.toLocaleString("en-IN")}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#888;">Shipping</td>
                <td style="text-align:right;">Free</td>
              </tr>
              <tr>
                <td style="padding:10px 0 4px;font-weight:600;font-size:14px;">Total</td>
                <td style="text-align:right;font-weight:600;font-size:14px;padding-top:10px;">Rs. ${total.toLocaleString("en-IN")}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top:28px;padding:16px;background:#f9f9f7;">
            <p style="font-size:12px;color:#666;margin:0 0 4px;"><strong>Delivery address</strong></p>
            <p style="font-size:13px;color:#444;margin:0;line-height:1.6;">
              ${contact.firstName} ${contact.lastName}<br/>
              ${contact.address}<br/>
              ${contact.city}${contact.state ? ", " + contact.state : ""} ${contact.zip}<br/>
              ${contact.country}
            </p>
          </div>

          <p style="font-size:12px;color:#999;margin-top:28px;line-height:1.6;">
            Questions about your order? Contact us at
            <a href="mailto:altrivaindia@gmail.com" style="color:#000;">altrivaindia@gmail.com</a>
            or call <a href="tel:+919672743384" style="color:#000;">+91 96727 43384</a>.
          </p>
        </div>`;

      await transporter.sendMail({
        from: `"Altriva Studio" <${SENDER_EMAIL}>`,
        to: contact.email,
        subject: `Order Confirmed — #${orderNum} | Altriva Studio`,
        html: customerHtml,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order email failed:", err);
    return NextResponse.json({ ok: false });
  }
}
