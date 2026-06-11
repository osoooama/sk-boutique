import type { Metadata, Viewport } from "next";
import { Alexandria, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/context/Providers";

const alexandria = Alexandria({
  subsets: ["arabic"],
  variable: "--font-alexandria",
  display: "swap",
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "SK BOUTIQUE | تصاميم أوروبية عصرية بصناعة محلية متقنة",
    template: "%s | SK BOUTIQUE",
  },
  description:
    "SK BOUTIQUE — تصاميم أوروبية عصرية تُصنع محلياً بأيدٍ أردنية ماهرة. نستورد أفضل الخامات من إيطاليا وفرنسا ونصنعها بمعايير الجودة الأوروبية.",
  keywords: [
    "تصاميم أوروبية", "صناعة محلية", "SK BOUTIQUE", "ملابس نسائية",
    "عطور", "مسك", "موضة عصرية", "متجر ملابس أردن",
  ],
  authors: [{ name: "SK BOUTIQUE Jordan" }],
  creator: "SK BOUTIQUE",
  publisher: "SK BOUTIQUE",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SK BOUTIQUE",
  },
  formatDetection: { telephone: true },
  openGraph: {
    title: "SK BOUTIQUE | تصاميم أوروبية عصرية بصناعة محلية متقنة",
    description:
      "تصاميم أوروبية عصرية تُصنع محلياً بأيدٍ أردنية ماهرة بمعايير الجودة الأوروبية.",
    url: "https://sk-boutique.pages.dev",
    siteName: "SK BOUTIQUE",
    locale: "ar_JO",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://sk-boutique.pages.dev" },
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${inter.variable} h-full scroll-smooth`}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SK BOUTIQUE" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Store",
                  name: "SK BOUTIQUE",
                  description: "تصاميم أوروبية عصرية تُصنع محلياً بمعايير الجودة الأوروبية",
                  url: "https://sk-boutique.pages.dev",
                  telephone: "+962798921123",
                  address: { "@type": "PostalAddress", addressCountry: "JO" },
                  sameAs: ["https://www.instagram.com/sk_boutique977/"],
                },
                {
                  "@type": "WebSite",
                  url: "https://sk-boutique.pages.dev",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://sk-boutique.pages.dev/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-inter h-full bg-luxury-black text-luxury-white antialiased overflow-x-hidden selection:bg-luxury-gold/30">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
