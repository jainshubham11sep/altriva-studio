declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

export function pixelViewContent(product: {
  id: string;
  displayName: string;
  priceInr: number;
  category: string;
}) {
  fbq("track", "ViewContent", {
    content_ids: [product.id],
    content_name: product.displayName,
    content_category: product.category,
    content_type: "product",
    value: product.priceInr,
    currency: "INR",
  });
}

export function pixelAddToCart(product: {
  id: string;
  displayName: string;
  priceInr: number;
}, quantity: number) {
  fbq("track", "AddToCart", {
    content_ids: [product.id],
    content_name: product.displayName,
    content_type: "product",
    value: product.priceInr * quantity,
    currency: "INR",
    num_items: quantity,
  });
}

export function pixelInitiateCheckout(
  items: Array<{ product: { id: string }; quantity: number }>,
  total: number
) {
  fbq("track", "InitiateCheckout", {
    content_ids: items.map((i) => i.product.id),
    num_items: items.reduce((s, i) => s + i.quantity, 0),
    value: total,
    currency: "INR",
  });
}

export function pixelAddPaymentInfo(total: number) {
  fbq("track", "AddPaymentInfo", {
    value: total,
    currency: "INR",
  });
}

export function pixelPurchase(
  orderId: string,
  total: number,
  items: Array<{ product: { id: string }; quantity: number }>
) {
  fbq("track", "Purchase", {
    content_ids: items.map((i) => i.product.id),
    num_items: items.reduce((s, i) => s + i.quantity, 0),
    value: total,
    currency: "INR",
    order_id: orderId,
  });
}
