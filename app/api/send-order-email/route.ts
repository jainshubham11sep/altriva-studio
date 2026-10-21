import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Credentials come from env vars (set locally in .env.local and in Vercel → Settings → Environment Variables).
// GMAIL_APP_PASSWORD must be a Google App Password, not the normal account password.
const SENDER_EMAIL = process.env.GMAIL_USER || "altrivaindia@gmail.com";
const SENDER_PASS = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
const NOTIFY_EMAILS = (process.env.ORDER_NOTIFY_EMAILS || "vaieziqbal29@gmail.com,altrivaindia@gmail.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

type Item = {
  product: { displayName: string; priceInr: number };
  size: string;
  quantity: number;
};

type Contact = {
  email?: string;
  firstName: string;
  lastName?: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
};

// Everything below comes from the checkout form, so escape it before putting it into email HTML.
function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeContact(c: Contact): Required<Contact> {
  return {
    email: esc(c.email),
    firstName: esc(c.firstName),
    lastName: esc(c.lastName),
    address: esc(c.address),
    city: esc(c.city),
    state: esc(c.state),
    zip: esc(c.zip),
    country: esc(c.country),
    phone: esc(c.phone),
  };
}

function buildItemRows(items: Item[]) {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${esc(item.product.displayName)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${esc(item.size)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${esc(item.quantity)}</td>
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
  let orderNum: string | undefined;
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      console.error("[order-email] request body is not valid JSON");
      return NextResponse.json({ ok: false, error: "Invalid order data" }, { status: 400 });
    }
    orderNum = esc(body.orderNum);
    const { items, total, paymentMethod } = body as { items: Item[]; total: number; paymentMethod: string };
    const rawContact = body.contact as Contact | undefined;

    if (
      !orderNum ||
      !Array.isArray(items) || items.length === 0 ||
      typeof total !== "number" ||
      !rawContact?.firstName || !rawContact?.address
    ) {
      console.error(`[order-email] invalid request for order #${orderNum || "unknown"}:`, JSON.stringify(body).slice(0, 500));
      return NextResponse.json({ ok: false, error: "Invalid order data" }, { status: 400 });
    }
    const contact = escapeContact(rawContact);
    const customerEmail = rawContact.email?.trim();

    if (!SENDER_PASS) {
      console.error(`[order-email] GMAIL_APP_PASSWORD is not set — cannot send email for order #${orderNum}`);
      return NextResponse.json({ ok: false, error: "Email not configured" }, { status: 500 });
    }

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

    const adminInfo = await transporter.sendMail({
      from: `"Altriva Studio" <${SENDER_EMAIL}>`,
      to: NOTIFY_EMAILS.join(", "),
      subject: `New Order #${orderNum} — Rs. ${total.toLocaleString("en-IN")}${paymentMethod === "cod" ? " [COD]" : ""}`,
      html: adminHtml,
    });
    console.log(`[order-email] admin notification sent for order #${orderNum} (messageId ${adminInfo.messageId})`);

    // ── Customer confirmation email ──────────────────────────────────────────
    if (customerEmail) {
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

      // The admin email already went out, so a bad customer address shouldn't fail the whole request.
      try {
        await transporter.sendMail({
          from: `"Altriva Studio" <${SENDER_EMAIL}>`,
          to: customerEmail,
          subject: `Order Confirmed — #${orderNum} | Altriva Studio`,
          html: customerHtml,
        });
      } catch (err) {
        console.error(`[order-email] customer confirmation failed for order #${orderNum} (${customerEmail}):`, err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = err as { code?: string; responseCode?: number; response?: string; message?: string };
    console.error(`[order-email] FAILED for order #${orderNum ?? "unknown"}:`, {
      code: e.code,
      responseCode: e.responseCode,
      response: e.response,
      message: e.message,
    });
    if (e.code === "EAUTH") {
      console.error("[order-email] Gmail rejected the login — the App Password is wrong or was revoked. Generate a new one and update GMAIL_APP_PASSWORD.");
    }
    return NextResponse.json({ ok: false, error: "Failed to send order email" }, { status: 500 });
  }
}
