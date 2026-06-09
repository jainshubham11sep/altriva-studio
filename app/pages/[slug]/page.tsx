import { notFound } from "next/navigation";

const pageContent: Record<string, { title: string; body: string }> = {
  "about-us": {
    title: "About Us",
    body: `Altriva Studio was founded with a vision to create timeless, thoughtful design that bridges cultures and aesthetics. Our collections are born from a deep appreciation for craft, texture, and the quiet power of well-made things.

We believe in clothing that lasts — in quality over quantity, in pieces that become part of your story.`,
  },
  "store-locations": {
    title: "Store Locations",
    body: `Our stores are open in select cities. Visit us to experience the full collection in person.

London — 34 Brewer Street, Soho
New York — 50 Hudson Yards
Tokyo — 5-4-1 Minami-Aoyama, Minato-ku
Paris — 8 Rue du Faubourg Saint-Honoré`,
  },
  "careers": {
    title: "Careers",
    body: `We are always looking for talented, passionate people to join our team. If you are driven by creativity and excellence, we would love to hear from you.

Please send your CV and portfolio to altrivaindia@gmail.com.`,
  },
  "sign-up": {
    title: "Sign Up",
    body: `Create an account to save your wishlist, track orders, and stay up to date with new arrivals and exclusive offers.`,
  },
  "contact-us": {
    title: "Contact Us",
    body: `For general enquiries, reach us at:

Phone: +91 96727 43384
Email: altrivaindia@gmail.com

We aim to respond within 2 business days.`,
  },
  "customer-support": {
    title: "Customer Support",
    body: `Our customer support team is available Monday to Saturday, 10am–7pm IST.

Phone: +91 96727 43384
Email: altrivaindia@gmail.com

For returns and exchanges, please refer to our Delivery & Returns policy.`,
  },
  "delivery-and-returns": {
    title: "Delivery & Returns",
    body: `Complimentary UK standard delivery on all orders over £300.

Express delivery is available for an additional charge. International shipping is available to over 100 countries.

Returns are accepted within 30 days of receipt. Items must be unworn, unwashed, and in their original packaging with all tags attached.

To initiate a return, please contact our customer support team.`,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    body: `We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.

We collect information you provide directly, such as when you create an account or place an order. We use this data to fulfil orders, improve our services, and communicate with you.

We do not sell your personal data to third parties. For full details, please review our complete Privacy Policy document.`,
  },
  "terms-conditions": {
    title: "Terms & Conditions",
    body: `By accessing and using this website, you accept these Terms and Conditions in full.

All content on this site is the property of Altriva Studio and may not be reproduced without permission. Prices are subject to change without notice. We reserve the right to refuse orders at our discretion.`,
  },
  "book-appointment": {
    title: "Book an Appointment",
    body: `Our in-store styling appointments offer a personal shopping experience tailored to you.

Sessions are available in all flagship stores and last approximately 60 minutes. Please book at least 48 hours in advance.

To book, contact us at +91 96727 43384 or email altrivaindia@gmail.com.`,
  },
  "brand-narrative": {
    title: "Brand Narrative",
    body: `Altriva is a fashion label built on the belief that clothing should feel right before it looks right. We see garments not as disposable products, but as personal objects — pieces that stay with you, support how you feel, and age with use.

The modern fashion system has moved away from this idea. Quality has been compromised by speed, fabrics are chosen for convenience rather than longevity, and production is pushed into large-scale environments where both craft and people are often undervalued. At the same time, garments are made without consideration for their afterlife, contributing to unnecessary waste.

Altriva exists to respond to this. We begin with fabric — selecting top-quality materials and studying their composition with intention. Every textile is chosen with its full lifecycle in mind: from fibre and weaving, to garment-making, to a long life of wear, and eventually to responsible recycling or upcycling. Innovation, for us, lies in designing clothes that already understand what comes next.

Our garments are produced in collaboration with small-scale master tailors and artisans rather than large production houses. This allows for care, precision, and fair recognition of skill, while helping build a sustainable community around craft.

Altriva is created through mindful design, controlled production, and respect for material, maker, and wearer. The result is clothing that feels familiar, lasts well, and continues its journey beyond a single season.

Altriva is not about trends. It is about building clothes — and systems — that are meant to endure.`,
  },
  "founders-note": {
    title: "Founder's Note",
    body: `Altriva began with a simple question I kept coming back to: why do some clothes feel right, while others never do?

I grew up drawing, observing, and making. Over time, those drawings became garments, and garments became a way of understanding how fabric, form, and feeling come together. Clothing, for me, was never just about how it looked — it was about how it sat on the body, how it moved, and how it stayed with you through a day.

Like many people, I took a path that felt expected before choosing to step away from it. Spending time in London gave me clarity and reminded me that meaningful work comes from listening closely to what you're drawn to. I chose fashion not as an industry, but as a craft that carries responsibility.

Altriva exists because something felt missing. Too much clothing today is made quickly, from convenient materials, with little thought for longevity or consequence. At Altriva, we begin with fabric. We choose materials for their quality and composition, and we think carefully about their full lifecycle — from fibre and weaving, to wear, and eventually to recycling or upcycling. Innovation, for us, is designing garments that already understand their next life.

Our pieces are made in collaboration with small-scale master tailors and artisans. Working this way allows us to move with care, honour skill, and build a community around making — not scale.

If you've ever had a garment you keep returning to, you already understand what we're trying to do. Altriva is made for that feeling — clothing that feels familiar, wears well, and continues its journey long after the first season.

Thank you for being part of it.`,
  },
};

export async function generateStaticParams() {
  return Object.keys(pageContent).map((slug) => ({ slug }));
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pageContent[slug];
  if (!page) notFound();

  const isFoundersNote = slug === "founders-note";

  return (
    <div
      style={{
        padding: "2rem var(--page-margin) 5rem",
        maxWidth: "640px",
      }}
    >
      <h1
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "1.75rem",
          letterSpacing: "0.01em",
          marginBottom: "1.75rem",
          fontWeight: 400,
        }}
      >
        {page.title}
      </h1>
      {page.body.split("\n\n").map((para, i) => (
        <p
          key={i}
          style={{
            fontSize: "0.875rem",
            letterSpacing: "0.015em",
            lineHeight: 1.8,
            marginBottom: "1.25rem",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          {para}
        </p>
      ))}
      {isFoundersNote && (
        <div style={{ marginTop: "2.5rem", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "2rem" }}>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.125rem", letterSpacing: "0.01em", marginBottom: "0.25rem" }}>
            — Vaiez
          </p>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.5, marginBottom: "1rem" }}>
            Founder, Altriva
          </p>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1rem", fontStyle: "italic", letterSpacing: "0.01em", opacity: 0.7 }}>
            Clothing should feel right before it looks right.
          </p>
        </div>
      )}
    </div>
  );
}
