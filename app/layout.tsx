import type { Metadata, Viewport } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeProvider from "@/context/ThemeContext";
import WishlistProvider from "@/context/WishlistContext";
import CartProvider from "@/context/CartContext";

export const metadata: Metadata = {
  title: {
    default: "SK BOUTIQUE | تصاميم أوروبية عصرية بصناعة محلية متقنة",
    template: "%s | SK BOUTIQUE",
  },
  description:
    "SK BOUTIQUE — تصاميم أوروبية عصرية تُصنع محلياً بأيدٍ أردنية ماهرة. نستورد أفضل الخامات من إيطاليا وفرنسا ونصنعها بمعايير الجودة الأوروبية. تسوق تشكيلتنا الحصرية الآن.",
  keywords: [
    "تصاميم أوروبية",
    "صناعة محلية",
    "SK BOUTIQUE",
    "ملابس نسائية",
    "فساتين",
    "أطقم فاخرة",
    "موضة عصرية",
    "جودة أوروبية",
    "متجر ملابس أردن",
  ],
  authors: [{ name: "SK BOUTIQUE Jordan" }],
  creator: "SK BOUTIQUE",
  publisher: "SK BOUTIQUE",
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
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="h-full scroll-smooth dark-theme" style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SK BOUTIQUE" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#faf8f5" media="(prefers-color-scheme: light)" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
          crossOrigin="anonymous"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
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
                  description:
                    "تصاميم أوروبية عصرية تُصنع محلياً بمعايير الجودة الأوروبية",
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
                      urlTemplate:
                        "https://sk-boutique.pages.dev/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="h-full bg-(--bg-primary) text-(--text-primary) antialiased overflow-x-hidden selection:bg-gold/30 relative">
        <AnimatedBackground />
        <ThemeProvider>
          <div className="relative z-10">
            <CartProvider><WishlistProvider>{children}</WishlistProvider></CartProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
