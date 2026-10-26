import { sendOrderEmails, type Contact, type Order, type OrderEmailResult, type OrderItem } from "./orderEmail";
import {
  createOrder,
  fetchOrder,
  fetchPayment,
  notesOf,
  updateOrderNotes,
  type RazorpayNotes,
  type RazorpayOrder,
} from "./razorpay";

// Order handling, server-side only.
//
// The site has no database, so every order (online and COD) is saved as a Razorpay order whose `notes`
// hold the full order details. That record exists before any email is sent, so a failed email never
// loses an order: it's visible in Razorpay Dashboard → Transactions → Orders.
// `notes.mail` tracks the email status ("sent" / "failed" / "claim:...") so an order is emailed only once,
// whether it's confirmed by the customer's browser or by the Razorpay webhook.

const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string) => EMAIL_RE.test(email);

// Validates the order the checkout page sends ({ orderNum, items: CartItem[], total, contact }).
export function parseOrder(body: unknown, paymentMethod: Order["paymentMethod"]): Order | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const c = (b.contact ?? {}) as Record<string, unknown>;
  const rawItems = Array.isArray(b.items) ? b.items : [];

  const items: OrderItem[] = rawItems.slice(0, 20).map((raw) => {
    const i = raw as { product?: { displayName?: unknown; priceInr?: unknown }; size?: unknown; quantity?: unknown };
    return {
      name: str(i.product?.displayName, 60),
      size: str(i.size, 10),
      quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)),
      priceInr: Number(i.product?.priceInr) || 0,
    };
  });
  const contact: Contact = {
    email: str(c.email, 100),
    firstName: str(c.firstName, 50),
    lastName: str(c.lastName, 50),
    address: str(c.address, 200),
    city: str(c.city, 50),
    state: str(c.state, 50),
    zip: str(c.zip, 12),
    country: str(c.country, 40),
    phone: str(c.phone, 20),
  };
  const orderNum = str(b.orderNum, 20);
  const total = Number(b.total);

  if (!orderNum || items.length === 0 || !Number.isFinite(total) || total <= 0 || !contact.firstName || !contact.address) {
    return null;
  }
  return { orderNum, items, total, contact, paymentMethod };
}

// ── Order details <-> Razorpay notes ────────────────────────────────────────
// Razorpay allows 15 notes of up to 256 characters each: a few readable ones for the dashboard,
// plus the full order as JSON split across d0..d8.
const CHUNK = 250;
const MAX_CHUNKS = 9;

export function orderToNotes(order: Order): RazorpayNotes {
  const c = order.contact;
  const readable: RazorpayNotes = {
    order_num: order.paymentMethod === "cod" ? `${order.orderNum} (COD - not paid online)` : order.orderNum,
    customer: `${c.firstName} ${c.lastName}`.trim(),
    phone: c.phone,
    email: c.email,
    address: [c.address, c.city, c.state, c.zip, c.country].filter(Boolean).join(", ").slice(0, 250),
  };
  const notes: RazorpayNotes = Object.fromEntries(Object.entries(readable).filter(([, v]) => v));
  const data = JSON.stringify({
    n: order.orderNum,
    t: order.total,
    p: order.paymentMethod,
    c: [c.email, c.firstName, c.lastName, c.address, c.city, c.state, c.zip, c.country, c.phone],
    i: order.items.map((i) => [i.name, i.size, i.quantity, i.priceInr]),
  });
  const chunks = Math.ceil(data.length / CHUNK);
  if (chunks > MAX_CHUNKS) {
    console.error(`[order] order #${order.orderNum} is too large to store in Razorpay notes (${data.length} chars) — only the summary is saved`);
    return notes;
  }
  for (let k = 0; k < chunks; k++) notes[`d${k}`] = data.slice(k * CHUNK, (k + 1) * CHUNK);
  return notes;
}

export function orderFromNotes(notes: RazorpayNotes): Omit<Order, "razorpayOrderId" | "razorpayPaymentId"> | null {
  let data = "";
  for (let k = 0; k < MAX_CHUNKS && notes[`d${k}`]; k++) data += notes[`d${k}`];
  if (!data) return null;
  try {
    const d = JSON.parse(data) as { n: string; t: number; p: Order["paymentMethod"]; c: string[]; i: [string, string, number, number][] };
    const [email, firstName, lastName, address, city, state, zip, country, phone] = d.c;
    return {
      orderNum: d.n,
      total: d.t,
      paymentMethod: d.p,
      contact: { email, firstName, lastName, address, city, state, zip, country, phone },
      items: d.i.map(([name, size, quantity, priceInr]) => ({ name, size, quantity, priceInr })),
    };
  } catch {
    return null;
  }
}

// ── Online orders ───────────────────────────────────────────────────────────

// Creates the Razorpay order the customer pays for, with the full order details attached.
export async function createOnlineOrder(amountInr: number, order: Order | null) {
  const receipt = order ? `altriva_${order.orderNum}` : `altriva_${Date.now()}`;
  const amountPaise = Math.round(amountInr * 100);
  let rzpOrder: RazorpayOrder;
  try {
    rzpOrder = await createOrder(amountPaise, receipt, order ? orderToNotes(order) : undefined);
  } catch (err) {
    if (!order) throw err;
    // Never block a payment because of the attached details.
    console.error(`[order] #${order.orderNum}: Razorpay rejected the order details — retrying without them:`, (err as Error).message);
    console.log(`[order] #${order.orderNum}: details ${JSON.stringify(order)}`);
    rzpOrder = await createOrder(amountPaise, receipt);
  }
  console.log(
    `[order] online order ${order ? "#" + order.orderNum : "(no details sent)"} saved as Razorpay order ${rzpOrder.id} — Rs. ${amountInr}, awaiting payment`
  );
  return rzpOrder;
}

const CLAIM_TTL_MS = 90_000;

type FinalizeStatus = "sent" | "already_sent" | "in_progress" | "failed" | "not_paid" | "not_found";

// Called after payment, from both the browser (/api/orders/confirm-payment) and the webhook.
// Sends the two emails exactly once per order.
export async function finalizeOnlineOrder(
  razorpayOrderId: string,
  razorpayPaymentId: string | undefined,
  source: "checkout" | "webhook"
): Promise<{ status: FinalizeStatus; emails?: OrderEmailResult }> {
  const tag = `[order] ${razorpayOrderId} (${source})`;

  let rzpOrder: RazorpayOrder;
  try {
    rzpOrder = await fetchOrder(razorpayOrderId);
  } catch (err) {
    console.error(`${tag}: could not load order from Razorpay —`, (err as Error).message);
    return { status: "not_found" };
  }

  const payment = razorpayPaymentId ? await fetchPayment(razorpayPaymentId).catch(() => null) : null;
  const paymentOk = !!payment && payment.order_id === razorpayOrderId && (payment.status === "captured" || payment.status === "authorized");
  if (rzpOrder.status !== "paid" && !paymentOk) {
    console.warn(`${tag}: not paid yet (order status ${rzpOrder.status}, payment status ${payment?.status ?? "unknown"}) — no email sent`);
    return { status: "not_paid" };
  }

  // Claim the order so the browser and the webhook don't both send the emails.
  const notes = notesOf(rzpOrder);
  const mail = notes.mail ?? "";
  if (mail === "sent") {
    console.log(`${tag}: emails already sent for this order — skipping`);
    return { status: "already_sent" };
  }
  if (mail.startsWith("claim:") && Date.now() - Number(mail.split(":")[1]) < CLAIM_TTL_MS) {
    console.log(`${tag}: emails are being sent by another request — skipping`);
    return { status: "in_progress" };
  }
  const claim = `claim:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
  try {
    await updateOrderNotes(razorpayOrderId, { ...notes, mail: claim });
    const recheck = notesOf(await fetchOrder(razorpayOrderId));
    if (recheck.mail !== claim) {
      console.log(`${tag}: another request claimed this order first — skipping`);
      return { status: "in_progress" };
    }
  } catch (err) {
    // Can't coordinate through Razorpay; sending twice is better than not sending at all.
    console.error(`${tag}: could not mark order as being emailed — sending anyway:`, (err as Error).message);
  }

  const details = orderFromNotes(notes);
  if (!details) console.error(`${tag}: order details missing from Razorpay notes — sending a notification with what Razorpay has`);
  const order: Order = {
    orderNum: details?.orderNum ?? notes.order_num ?? razorpayOrderId,
    items: details?.items ?? [],
    total: details?.total ?? rzpOrder.amount / 100,
    paymentMethod: "online",
    contact: details?.contact ?? {
      email: "", firstName: notes.customer || "Unknown customer", lastName: "", address: notes.address || "—",
      city: "", state: "", zip: "", country: "", phone: notes.phone || "",
    },
    razorpayOrderId,
    razorpayPaymentId: razorpayPaymentId ?? payment?.id,
  };
  // Customers can also type their email/phone into the Razorpay popup; use those if the form had none.
  if (!order.contact.email && payment?.email) order.contact.email = payment.email;
  if (!order.contact.phone && payment?.contact) order.contact.phone = payment.contact;

  console.log(`${tag}: payment confirmed for order #${order.orderNum} — sending emails`);
  const emails = await sendOrderEmails(order);
  const status: FinalizeStatus = emails.admin.ok ? "sent" : "failed";
  await updateOrderNotes(razorpayOrderId, { ...notes, mail: status }).catch((err) =>
    console.error(`${tag}: could not save email status on the Razorpay order:`, (err as Error).message)
  );
  console.log(`${tag}: order #${order.orderNum} done — admin email ${emails.admin.ok ? "sent" : "FAILED"}, customer email ${emails.customer.ok ? "sent" : "NOT sent"}`);
  return { status, emails };
}

// ── Cash on delivery ────────────────────────────────────────────────────────

export async function placeCodOrder(order: Order) {
  const tag = `[order] #${order.orderNum} (COD)`;
  console.log(`${tag}: received — Rs. ${order.total}, ${order.items.length} item(s), customer ${order.contact.email || "(no email)"}`);
  // Full order in the logs too, so it's never lost even if Razorpay is unreachable.
  console.log(`${tag}: details ${JSON.stringify(order)}`);

  let razorpayOrderId: string | undefined;
  try {
    const rzpOrder = await createOrder(Math.round(order.total * 100), `COD_${order.orderNum}`, orderToNotes(order));
    razorpayOrderId = rzpOrder.id;
    console.log(`${tag}: saved as Razorpay order ${rzpOrder.id} (receipt COD_${order.orderNum})`);
  } catch (err) {
    console.error(`${tag}: could NOT save order in Razorpay — details are in the log line above:`, (err as Error).message);
  }

  const emails = await sendOrderEmails({ ...order, razorpayOrderId });

  if (razorpayOrderId) {
    const id = razorpayOrderId;
    await fetchOrder(id)
      .then((o) => updateOrderNotes(id, { ...notesOf(o), mail: emails.admin.ok ? "sent" : "failed" }))
      .catch((err) => console.error(`${tag}: could not save email status on the Razorpay order:`, (err as Error).message));
  }
  console.log(`${tag}: done — admin email ${emails.admin.ok ? "sent" : "FAILED"}, customer email ${emails.customer.ok ? "sent" : "NOT sent"}`);
  return { razorpayOrderId, emails };
}
