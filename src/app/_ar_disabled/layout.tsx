import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

const SITE_URL = "https://www.eagleeye-est.com";
const SITE_NAME = "مؤسسة عين النسر التجارية";
const SITE_TITLE = "مؤسسة عين النسر التجارية";
const SITE_DESCRIPTION =
  "أنظمة كهربائية وتقنية معلومات وأمن وسلامة — استشارات وتصميم وتركيب وتشغيل تجريبي وصيانة، ضمن نطاق مسؤول شامل 360°.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "شركة تكامل أنظمة في السعودية",
    "مقاول كهرباء الرياض",
    "أنظمة إنذار حريق السعودية",
    "أنظمة مراقبة CCTV الرياض",
    "بنية تقنية المعلومات السعودية",
    "تكامل PSIM",
    "تجهيزات إنارة السعودية",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: `${SITE_URL}/ar`,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "مؤسسة عين النسر التجارية — الشعار",
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
  url: `${SITE_URL}/ar`,
  logo: `${SITE_URL}/assets/eagle-eye-logo.png`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: "325934",
    addressLocality: "الرياض",
    postalCode: "11371",
    addressCountry: "SA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966-56-200-0048",
    contactType: "sales",
    email: "sales@eagleeye-est.com",
    areaServed: "SA",
    availableLanguage: ["ar", "en"],
  },
};

export default function ArabicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
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
