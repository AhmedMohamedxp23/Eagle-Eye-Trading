import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://www.eagleeye-est.com";
const SITE_NAME = "Eagle Eye Trading Est.";
const SITE_TITLE =
  "Eagle Eye Trading Est.";
const SITE_DESCRIPTION =
  "Electrical, IT, security and life-safety systems — consulted, designed, installed, commissioned and maintained as one accountable 360° scope.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Eagle Eye Trading Est.",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "systems integrator Saudi Arabia",
    "electrical contractor Riyadh",
    "fire alarm systems KSA",
    "CCTV security systems Riyadh",
    "ICT infrastructure Saudi Arabia",
    "PSIM integration",
    "lighting fixtures Saudi Arabia",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eagle Eye Trading Est. — Riyadh skyline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/eagle-eye-logo.png`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: "325934",
    addressLocality: "Riyadh",
    postalCode: "11371",
    addressCountry: "SA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966-56-200-0048",
    contactType: "sales",
    email: "sales@eagleeye-est.com",
    areaServed: "SA",
    availableLanguage: ["en", "ar"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
