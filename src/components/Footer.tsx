import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

type Locale = "en" | "ar";

const COPY = {
  en: {
    blurb:
      "Emerging as the most valued integrator of electronic security, safety, fire detection and electrical fixtures in the Kingdom of Saudi Arabia.",
    contact: "CONTACT",
    address: "P.O. Box 325934, Riyadh 11371",
    sitemap: "SITEMAP",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Our Services" },
      { href: "/contact", label: "Contact Us" },
      { href: "/rfq", label: "Request for Offer" },
    ],
    rights: "© 2026 EAGLE EYE TRADING EST. · ALL RIGHTS RESERVED",
  },
  ar: {
    blurb:
      "في طريقنا لنكون الأكثر تميزًا في تكامل أنظمة الأمن الإلكتروني والسلامة وكشف الحريق والتجهيزات الكهربائية في المملكة العربية السعودية.",
    contact: "التواصل",
    address: "ص.ب. 325934، الرياض 11371",
    sitemap: "خريطة الموقع",
    links: [
      { href: "/ar", label: "الرئيسية" },
      { href: "/ar/about", label: "من نحن" },
      { href: "/ar/services", label: "خدماتنا" },
      { href: "/ar/contact", label: "تواصل معنا" },
      { href: "/ar/rfq", label: "اطلب عرض سعر" },
    ],
    rights: "© 2026 مؤسسة عين النسر التجارية · جميع الحقوق محفوظة",
  },
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];

  return (
    <footer>
      <div className={styles.top}>
        <div>
          <Image
            src="/assets/eagle-eye-logo-reversed-tight.png"
            alt="Eagle Eye Trading Est."
            width={195}
            height={44}
            className={styles.logo}
          />
          <p className={styles.blurb}>{t.blurb}</p>
        </div>
        <div>
          <div className={styles.heading}>{t.contact}</div>
          <div className={styles.list}>
            <span className={styles.mono}>{t.address}</span>
            <span
              className={styles.mono}
              dir="ltr"
              style={locale === "ar" ? { textAlign: "right" } : undefined}
            >
              +966 56 200 0048
            </span>
            <span
              className={styles.mono}
              dir="ltr"
              style={locale === "ar" ? { textAlign: "right" } : undefined}
            >
              sales@eagleeye-est.com
            </span>
          </div>
        </div>
        <div>
          <div className={styles.heading}>{t.sitemap}</div>
          <div className={styles.list}>
            {t.links.map((l) => (
              <Link key={l.href} href={l.href}>
                <span className={styles.sans}>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.fine}>{t.rights}</span>
      </div>
    </footer>
  );
}
