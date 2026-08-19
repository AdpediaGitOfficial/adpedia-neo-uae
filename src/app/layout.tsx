import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { fontVariables } from "@/lib/fonts";
import { siteConfig, offices } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ContactModalProvider } from "@/components/providers/ContactModalProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} — Creative Digital Studio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "digital studio",
    "brand design",
    "UI/UX design",
    "web development",
    "mobile app development",
    "AI solutions",
    "Adpedia",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.domain,
  logo: `${siteConfig.domain}/images/brand/logo-white.png`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  description: siteConfig.description,
  sameAs: Object.values(siteConfig.social),
  address: offices.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.address.join(", "),
    addressCountry: office.country,
  })),
  contactPoint: offices.map((office) => ({
    "@type": "ContactPoint",
    telephone: office.phone,
    email: office.email,
    contactType: "customer service",
    areaServed: office.country,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        {/* Reveal-on-scroll starts at opacity:0 for JS users; ensure content is
            visible when JavaScript is disabled (progressive enhancement / SEO). */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-ink font-sans text-white antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ContactModalProvider>
          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </ContactModalProvider>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
