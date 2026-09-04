import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_TC, Noto_Serif_TC, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const serifTc = Noto_Serif_TC({
  variable: "--font-serif-tc",
  subsets: ["latin"],
  weight: ["600", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}｜北海道中文滑雪學校｜Ski & Snowboard 專業教學`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: site.name,
    locale: "zh_TW",
    type: "website",
    images: ["/images/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${noto.variable} ${serifTc.variable} ${outfit.variable} h-full antialiased`}>
      <body className="grain washi min-h-full flex flex-col">
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1832715211223601');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1832715211223601&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
