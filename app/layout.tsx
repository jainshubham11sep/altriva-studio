import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JW Anderson Official Site : Luxury Bags, Ready-To-Wear, Shoes – JW Anderson",
  description:
    "Shop at the JW Anderson official website. Discover luxury women's and men's collections, shop new arrivals and discover the brand's history and unique designs.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    siteName: "JW Anderson",
    type: "website",
    title: "JW Anderson Official Site : Luxury Bags, Ready-To-Wear, Shoes – JW Anderson",
    description:
      "Shop at the JW Anderson official website. Discover luxury women's and men's collections.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body>
        <AnnouncementBar />
        <Header />
        <div className="page-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
