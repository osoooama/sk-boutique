import "./globals.css";

export const metadata = {
  title: {
    default: "SK BOUTIQUE | \u0623\u0632\u064A\u0627\u0621 \u0623\u0631\u062F\u0646\u064A\u0629 \u0639\u0635\u0631\u064A\u0629 \u0628\u062C\u0648\u062F\u0629 \u0639\u0627\u0644\u0645\u064A\u0629",
    template: "%s | SK BOUTIQUE"
  },
  description: "SK BOUTIQUE \u2014 \u062A\u0635\u0627\u0645\u064A\u0645 \u0623\u0631\u062F\u0646\u064A\u0629 \u0639\u0635\u0631\u064A\u0629 \u0628\u062E\u0627\u0645\u0627\u062A \u0648\u062C\u0648\u062F\u0629 \u0623\u0648\u0631\u0648\u0628\u064A\u0629. \u0646\u062E\u064A\u0637 \u0643\u0644 \u0642\u0637\u0639\u0629 \u0628\u062D\u0631\u0641\u064A\u0629 \u0648\u062F\u0642\u0629 \u0639\u0627\u0644\u064A\u0629 \u0644\u0646\u0642\u062F\u0645 \u0644\u0643 \u0645\u0646\u062A\u062C\u0627\u064B \u0628\u0645\u0648\u0627\u0635\u0641\u0627\u062A \u062A\u0646\u0627\u0641\u0633 \u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629. \u062A\u0633\u0648\u0642 \u062A\u0634\u0643\u064A\u0644\u062A\u0646\u0627 \u0627\u0644\u062D\u0635\u0631\u064A\u0629 \u0627\u0644\u0622\u0646.",
  keywords: ["\u0645\u0644\u0627\u0628\u0633 \u0623\u0631\u062F\u0646\u064A\u0629", "\u0623\u0632\u064A\u0627\u0621 \u0646\u0633\u0627\u0626\u064A\u0629", "SK BOUTIQUE", "\u0635\u0646\u0627\u0639\u0629 \u0623\u0631\u062F\u0646\u064A\u0629", "\u0641\u0633\u0627\u062A\u064A\u0646", "\u0623\u0637\u0642\u0645 \u0646\u0633\u0627\u0626\u064A\u0629", "\u0645\u062A\u062C\u0631 \u0645\u0644\u0627\u0628\u0633 \u0623\u0631\u062F\u0646", "\u062C\u0648\u062F\u0629 \u0639\u0627\u0644\u064A\u0629", "\u0645\u0648\u0636\u0629 \u0639\u0631\u0628\u064A\u0629"],
  authors: [{ name: "SK BOUTIQUE Jordan" }],
  creator: "SK BOUTIQUE",
  publisher: "SK BOUTIQUE",
  openGraph: {
    title: "SK BOUTIQUE | \u0623\u0632\u064A\u0627\u0621 \u0623\u0631\u062F\u0646\u064A\u0629 \u0639\u0635\u0631\u064A\u0629 \u0628\u062C\u0648\u062F\u0629 \u0639\u0627\u0644\u0645\u064A\u0629",
    description: "\u0646\u062E\u064A\u0637 \u0643\u0644 \u0642\u0637\u0639\u0629 \u0628\u062D\u0631\u0641\u064A\u0629 \u0648\u062F\u0642\u0629 \u0639\u0627\u0644\u064A\u0629. \u062A\u0635\u0627\u0645\u064A\u0645 \u0623\u0631\u062F\u0646\u064A\u0629 \u0639\u0635\u0631\u064A\u0629 \u0628\u062E\u0627\u0645\u0627\u062A \u0623\u0648\u0631\u0648\u0628\u064A\u0629.",
    url: "https://sk-boutique-977.netlify.app",
    siteName: "SK BOUTIQUE",
    locale: "ar_JO",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://sk-boutique-977.netlify.app" },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="h-full scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fcfbf9" media="(prefers-color-scheme: light)" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          precedence="default"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "SK BOUTIQUE",
              description: "\u062A\u0635\u0627\u0645\u064A\u0645 \u0623\u0631\u062F\u0646\u064A\u0629 \u0639\u0635\u0631\u064A\u0629 \u0628\u062E\u0627\u0645\u0627\u062A \u0648\u062C\u0648\u062F\u0629 \u0623\u0648\u0631\u0648\u0628\u064A\u0629",
              url: "https://sk-boutique-977.netlify.app",
              telephone: "+962798921123",
              address: {
                "@type": "PostalAddress",
                addressCountry: "JO"
              },
              sameAs: [
                "https://www.instagram.com/sk_boutique977/"
              ]
            })
          }}
        />
      </head>
      <body className="h-full bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased overflow-x-hidden selection:bg-[#cfa850]/30">
        {children}
      </body>
    </html>
  );
}
