import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Altriva Studio Official Site : Luxury Bags, Ready-To-Wear, Shoes – Altriva Studio",
  description:
    "Shop at the Altriva Studio official website. Discover luxury women's and men's collections, shop new arrivals and discover the brand's history and unique designs.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    siteName: "Altriva Studio",
    type: "website",
    title: "Altriva Studio Official Site : Luxury Bags, Ready-To-Wear, Shoes – Altriva Studio",
    description:
      "Shop at the Altriva Studio official website. Discover luxury women's and men's collections.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body>
        <Providers>
          <AnnouncementBar />
          <Header />
          <div className="page-content">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
