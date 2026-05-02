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

Please send your CV and portfolio to careers@altrivastudio.com.`,
  },
  "sign-up": {
    title: "Sign Up",
    body: `Create an account to save your wishlist, track orders, and stay up to date with new arrivals and exclusive offers.`,
  },
  "contact-us": {
    title: "Contact Us",
    body: `For general enquiries, please email us at hello@altrivastudio.com.

We aim to respond within 2 business days. For urgent matters, please reach out via our customer support line.`,
  },
  "customer-support": {
    title: "Customer Support",
    body: `Our customer support team is available Monday to Friday, 9am–6pm GMT.

Email: support@altrivastudio.com
Phone: +44 20 7123 4567

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

To book, contact your nearest store directly or email appointments@altrivastudio.com.`,
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

  return (
    <div
      style={{
        padding: "2rem var(--page-margin) 4rem",
        maxWidth: "640px",
      }}
    >
      <h1
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "1.75rem",
          letterSpacing: "0.01em",
          marginBottom: "1.5rem",
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
            lineHeight: 1.6,
            marginBottom: "1rem",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          {para}
        </p>
      ))}
    </div>
  );
}
