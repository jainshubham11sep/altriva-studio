import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Altriva Studio Official Site : Menswear & Womenswear, Ready-To-Wear, Shoes – Altriva Studio",
  description:
    "Shop at the Altriva Studio official website. Discover luxury women's and men's collections, shop new arrivals and discover the brand's history and unique designs.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    siteName: "Altriva Studio",
    type: "website",
    title: "Altriva Studio Official Site : Menswear & Womenswear, Ready-To-Wear, Shoes – Altriva Studio",
    description:
      "Shop at the Altriva Studio official website. Discover luxury women's and men's collections.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1072924388084163');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1072924388084163&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
