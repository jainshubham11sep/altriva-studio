import nodemailer from "nodemailer";

// Order emails, sent through Gmail SMTP. Server-side only.
// Credentials come only from env vars (.env.local locally, Vercel → Settings → Environment Variables in production).
// Never hardcode them here: this repo is public, and Google revokes App Passwords that leak.
// GMAIL_APP_PASSWORD must be a Google App Password (myaccount.google.com/apppasswords), not the normal account password.

export type OrderItem = { name: string; size: string; quantity: number; priceInr: number };

export type Contact = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
};

export type Order = {
  orderNum: string;
  items: OrderItem[];
  total: number;
  contact: Contact;
  paymentMethod: "cod" | "online";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
};

export type SendResult = { ok: true; messageId: string } | { ok: false; error: string };
export type OrderEmailResult = { admin: SendResult; customer: SendResult | { ok: false; skipped: true; error: string } };

const RETRY_DELAYS_MS = [1000, 3000]; // 3 attempts in total

const senderEmail = () => (process.env.GMAIL_USER || "altrivaindia@gmail.com").trim();
const senderPass = () => (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
const notifyEmails = () =>
  (process.env.ORDER_NOTIFY_EMAILS || "vaieziqbal29@gmail.com,altrivaindia@gmail.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

// Everything in an order comes from the checkout form, so escape it before putting it into email HTML.
function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const rs = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;

function itemsTable(items: OrderItem[]) {
  const rows = items.length
    ? items
        .map(
          (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${esc(item.name)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${esc(item.size)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${esc(item.quantity)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;">${rs(item.priceInr * item.quantity)}</td>
      </tr>`
        )
        .join("")
    : `<tr><td colspan="4" style="padding:10px 12px;font-size:13px;color:#b00;">Item details unavailable — check this order in the Razorpay dashboard.</td></tr>`;
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

function adminHtml(order: Order) {
  const c = order.contact;
  const paymentLabel = order.paymentMethod === "cod" ? "Cash on Delivery" : "Online (Razorpay)";
  const razorpayRef = [order.razorpayOrderId, order.razorpayPaymentId].filter(Boolean).map(esc).join(" / ");
  return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#000;padding:24px 0;">
        <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;margin:0 0 8px;">Altriva Studio</p>
        <h2 style="font-size:20px;margin:0 0 4px;font-weight:600;">New Order Received</h2>
        <p style="font-size:13px;color:#666;margin:0 0 28px;">Order #${esc(order.orderNum)} &nbsp;·&nbsp; ${paymentLabel}</p>

        <h3 style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;color:#444;">Customer Details</h3>
        <table style="font-size:13px;width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr><td style="padding:5px 0;color:#888;width:110px;">Name</td><td>${esc(c.firstName)} ${esc(c.lastName)}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Email</td><td>${esc(c.email) || "—"}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Phone</td><td>${esc(c.phone) || "—"}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Address</td><td>${esc(c.address)}, ${esc(c.city)}${c.state ? ", " + esc(c.state) : ""} ${esc(c.zip)}, ${esc(c.country)}</td></tr>
          <tr><td style="padding:5px 0;color:#888;">Payment</td><td><strong>${paymentLabel}</strong></td></tr>
          ${razorpayRef ? `<tr><td style="padding:5px 0;color:#888;">Razorpay</td><td>${razorpayRef}</td></tr>` : ""}
        </table>

        <h3 style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;color:#444;">Order Items</h3>
        ${itemsTable(order.items)}

        <div style="margin-top:20px;padding-top:16px;border-top:2px solid #000;display:flex;justify-content:space-between;">
          <span style="font-size:14px;font-weight:600;">Total</span>
          <span style="font-size:14px;font-weight:600;">${rs(order.total)}</span>
        </div>
      </div>`;
}

function customerHtml(order: Order) {
  const c = order.contact;
  return `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#000;padding:24px 0;">
          <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;margin:0 0 8px;">Altriva Studio</p>
          <h2 style="font-size:20px;margin:0 0 12px;font-weight:600;">Your order is confirmed.</h2>
          <p style="font-size:14px;color:#444;line-height:1.7;margin:0 0 28px;">
            Hi ${esc(c.firstName)}, thank you for your order. We've received it and it's being prepared.
            ${order.paymentMethod === "cod" ? "You'll pay in cash when your order arrives." : "Your payment has been received."}
          </p>

          <h3 style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;color:#444;">Order Summary &nbsp; <span style="color:#999;font-weight:400;">#${esc(order.orderNum)}</span></h3>
          ${itemsTable(order.items)}

          <div style="margin-top:20px;padding-top:16px;border-top:2px solid #000;">
            <table style="width:100%;font-size:13px;">
              <tr>
                <td style="padding:4px 0;color:#888;">Subtotal</td>
                <td style="text-align:right;">${rs(order.total)}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#888;">Shipping</td>
                <td style="text-align:right;">Free</td>
              </tr>
              <tr>
                <td style="padding:10px 0 4px;font-weight:600;font-size:14px;">Total</td>
                <td style="text-align:right;font-weight:600;font-size:14px;padding-top:10px;">${rs(order.total)}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top:28px;padding:16px;background:#f9f9f7;">
            <p style="font-size:12px;color:#666;margin:0 0 4px;"><strong>Delivery address</strong></p>
            <p style="font-size:13px;color:#444;margin:0;line-height:1.6;">
              ${esc(c.firstName)} ${esc(c.lastName)}<br/>
              ${esc(c.address)}<br/>
              ${esc(c.city)}${c.state ? ", " + esc(c.state) : ""} ${esc(c.zip)}<br/>
              ${esc(c.country)}
            </p>
          </div>

          <p style="font-size:12px;color:#999;margin-top:28px;line-height:1.6;">
            Questions about your order? Contact us at
            <a href="mailto:altrivaindia@gmail.com" style="color:#000;">altrivaindia@gmail.com</a>
            or call <a href="tel:+919672743384" style="color:#000;">+91 96727 43384</a>.
          </p>
        </div>`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Errors that won't go away by retrying: bad credentials, rejected recipient, bad config.
const isPermanent = (code?: string) => code === "EAUTH" || code === "EENVELOPE" || code === "ECONFIG";

async function sendWithRetry(label: string, mail: { to: string[]; subject: string; html: string }): Promise<SendResult> {
  const user = senderEmail();
  const pass = senderPass();
  if (!pass) {
    const error = "GMAIL_APP_PASSWORD is not set — add it in Vercel → Settings → Environment Variables and redeploy";
    console.error(`[order-email] ${label}: NOT SENT — ${error}`);
    return { ok: false, error };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  const attempts = RETRY_DELAYS_MS.length + 1;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    console.log(`[order-email] ${label}: attempt ${attempt}/${attempts} → ${mail.to.join(", ")}`);
    try {
      const info = await transporter.sendMail({ from: `"Altriva Studio" <${user}>`, to: mail.to.join(", "), subject: mail.subject, html: mail.html });
      console.log(`[order-email] ${label}: SENT on attempt ${attempt} (messageId ${info.messageId})`);
      return { ok: true, messageId: info.messageId };
    } catch (err) {
      const e = err as { code?: string; responseCode?: number; response?: string; message?: string };
      const error = `${e.code ?? "ERROR"}${e.responseCode ? " " + e.responseCode : ""}: ${e.response || e.message}`;
      console.error(`[order-email] ${label}: attempt ${attempt}/${attempts} FAILED — ${error}`);
      if (e.code === "EAUTH") {
        console.error(`[order-email] Gmail rejected the login for ${user} — the App Password is wrong or was revoked. Generate a new one and update GMAIL_APP_PASSWORD.`);
      }
      if (isPermanent(e.code) || attempt === attempts) {
        console.error(`[order-email] ${label}: GAVE UP after ${attempt} attempt(s)`);
        return { ok: false, error };
      }
      await sleep(RETRY_DELAYS_MS[attempt - 1]);
    }
  }
  return { ok: false, error: "unreachable" };
}

// Sends the admin notification and the customer confirmation. Never throws.
export async function sendOrderEmails(order: Order): Promise<OrderEmailResult> {
  const subjectTotal = rs(order.total);
  const admin = await sendWithRetry(`order #${order.orderNum} admin notification`, {
    to: notifyEmails(),
    subject: `New Order #${order.orderNum} — ${subjectTotal}${order.paymentMethod === "cod" ? " [COD]" : ""}`,
    html: adminHtml(order),
  });

  const customerEmail = order.contact.email.trim();
  const customer = customerEmail
    ? await sendWithRetry(`order #${order.orderNum} customer confirmation`, {
        to: [customerEmail],
        subject: `Order Confirmed — #${order.orderNum} | Altriva Studio`,
        html: customerHtml(order),
      })
    : (console.warn(`[order-email] order #${order.orderNum} customer confirmation: SKIPPED — no customer email on the order`),
      { ok: false as const, skipped: true as const, error: "no customer email" });

  return { admin, customer };
}
