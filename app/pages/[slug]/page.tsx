import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";

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
    body: "",
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
    body: `India – 15 days replacements from the date of product delivered.

International – 15 days replacements from the date of product delivered.

Shipping charges for replacement requests will be borne by ALTRIVA. Exchanges will be processed only for the same amount as the original order value or a higher amount.

Exchange orders are not eligible for returns or store credit. Exchanges are final and cannot be reversed for a refund once initiated.

Please note that the product must be returned unused and all tags and labels should be attached.

Shipping charges will be borne by the customer if you wish to return the piece. You will be charged Rs. 100 which will be deducted from the refund amount.

Shipping will be borne by ALTRIVA only under the following conditions:

If there is a manufacturing defect in the piece.

If the package is received damaged.

Please note that the product must be unused and all tags and labels should be attached.`,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    body: `This privacy policy ("Policy") relates to the manner ALTRIVA ("we", "us", "our") in which we use, handle and process the data that you provide us in connection with using the products or services we offer. By using this website or by availing goods or services offered by us, you agree to the terms and conditions of this Policy, and consent to our use, storage, disclosure, and transfer of your information or data in the manner described in this Policy.

We are committed to ensuring that your privacy is protected in accordance with applicable laws and regulations. We urge you to acquaint yourself with this Policy to familiarize yourself with the manner in which your data is being handled by us.

ALTRIVA may change this Policy periodically and we urge you to check this page for the latest version of the Policy in order to keep yourself updated.

What data is being collected

We may collect the following information from you: Name; contact information including address and email address; demographic information or preferences or interests; personal data or other information relevant or required for providing the goods or services to you. The meaning of Personal Data will be as defined under relevant Indian laws.

Note: Notwithstanding anything under this Policy as required under applicable Indian laws, we will not be storing any credit card, debit card or any other similar card data of yours. Please also note that all data or information collected from you will be strictly in accordance with applicable laws and guidelines.

What we do with the data we gather

We require this data to provide you with the goods or services offered by us including but not limited to: internal record keeping; improving our products or services; providing updates to you regarding our products or services including any special offers; communicating information to you; and internal training and quality assurance purposes.

Who do we share your data with

We may share your information or data with: third parties including our service providers in order to facilitate the provisions of goods or services to you; our group companies (to the extent relevant); our auditors or advisors to the extent required by them for performing their services; and governmental bodies, regulatory authorities, law enforcement authorities pursuant to our legal obligations or compliance requirements.

How we use cookies

We use "cookies" to collect information and to better understand customer behaviour. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to avail our goods or services to the full extent. We do not control the use of cookies by third parties. The third party service providers have their own privacy policies addressing how they use such information.

Your rights relating to your data

Right to Review – You can review the data provided by you and can request us to correct or amend such data (to the extent feasible, as determined by us). That said, we will not be responsible for the authenticity of the data or information provided by you.

Withdrawal of your Consent – You can choose not to provide your data, at any time while availing our goods or services or otherwise withdraw your consent provided to us earlier, in writing to our email ID: altrivaindia@gmail.com. In the event you choose to not provide or later withdraw your consent, we may not be able to provide you our services or goods. Please note that these rights are subject to our compliance with applicable laws.

How long will we retain your information or data?

We may retain your information or data (i) for as long as we are providing goods and services to you; and (ii) as permitted under applicable law, we may also retain your data or information even after you terminate the business relationship with us. However, we will process such information or data in accordance with applicable laws and this Policy.

Data Security

We will use commercially reasonable and legally required precautions to preserve the integrity and security of your information and data.

Queries / Grievance Officer

For any queries, questions or grievances about this Policy, please contact us using the contact information provided on this website.`,
  },
  "terms-conditions": {
    title: "Terms & Conditions",
    body: `These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding agreement by and between ALTRIVA ("Website Owner" or "we" or "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, "Services").

By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.

The use of this website or availing of our Services is subject to the following terms of use:

To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.

Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.

Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.

The contents of the Website and the Services are proprietary to us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.

You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.

You agree to pay us the charges associated with availing the Services.

You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.

You agree and acknowledge that the website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.

You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services.

You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, then this would make you ineligible for a refund.

Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.

These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.

All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Kota, Rajasthan.

All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.`,
  },
  "shipping": {
    title: "Shipping",
    body: `For international buyers, orders are shipped and delivered through registered international courier companies and/or international speed post only.

For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within 0–4 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to courier company / post office norms.

ALTRIVA provides free shipping all over India and free international shipping on orders over Rs. 20,000.

ALTRIVA is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0–4 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.

Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.

For any issues in utilizing our services you may contact our helpdesk on +91 96727 43384 or altrivaindia@gmail.com.`,
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
  const isContact = slug === "contact-us";

  if (isContact) {
    return (
      <div style={{ padding: "2rem var(--page-margin) 5rem", maxWidth: "640px" }}>
        <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.75rem", letterSpacing: "0.01em", marginBottom: "2.5rem", fontWeight: 400 }}>
          Contact Us
        </h1>

        {/* Contact details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.015em", lineHeight: 1.7, opacity: 0.6 }}>
            For general enquiries, reach us at:
          </p>
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.02em" }}>
            <span style={{ opacity: 0.45, fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Phone</span>
            <a href="tel:+919672743384" style={{ color: "inherit", textDecoration: "none" }}>+91 96727 43384</a>
          </p>
          <p style={{ fontSize: "0.875rem", letterSpacing: "0.02em" }}>
            <span style={{ opacity: 0.45, fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>Email</span>
            <a href="mailto:altrivaindia@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>altrivaindia@gmail.com</a>
          </p>
          <p style={{ fontSize: "0.75rem", opacity: 0.5, letterSpacing: "0.015em" }}>
            We aim to respond within 2 business days.
          </p>
        </div>

        {/* Custom orders */}
        <div style={{ background: "#f7f7f2", padding: "1.5rem", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.5, marginBottom: "0.625rem" }}>
            Custom orders, just for you.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.015em", lineHeight: 1.7, opacity: 0.65 }}>
            We entertain and encourage custom orders so your Altriva piece can be just yours. Contact us to know more.
          </p>
        </div>

        <ContactForm />
      </div>
    );
  }

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
