"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_PAGES } from "@/lib/data";
import { NAV_PAGES_AR } from "@/lib/data.ar";
import styles from "./Header.module.css";

type Locale = "en" | "ar";

// Arabic language toggle — disabled at client's request (kept for future re-enable).
// function otherLocalePath(pathname: string, locale: Locale) {
//   if (locale === "ar") {
//     const stripped = pathname.replace(/^\/ar/, "");
//     return stripped === "" ? "/" : stripped;
//   }
//   return pathname === "/" ? "/ar" : `/ar${pathname}`;
// }

export default function Header({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const pages = locale === "ar" ? NAV_PAGES_AR : NAV_PAGES;
  const rfqHref = locale === "ar" ? "/ar/rfq" : "/rfq";
  const homeHref = locale === "ar" ? "/ar" : "/";
  // const toggleHref = otherLocalePath(pathname, locale);
  const ctaLabel = locale === "ar" ? "اطلب عرض سعر" : "REQUEST AN OFFER";
  // const toggleLabel =
  //   locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية";

  return (
    <header className={styles.wrap}>
      <div className={styles.rule} />
      <div className={styles.bar}>
        <Link
          href={homeHref}
          className={styles.logoLink}
          aria-label="Eagle Eye Trading Est. — Home"
        >
          <Image
            src="/assets/eagle-eye-logo-reversed-tight.png"
            alt="Eagle Eye Trading Est."
            width={203}
            height={46}
            className={styles.logo}
            priority
          />
        </Link>

        <div className={styles.navGroup}>
          <nav className={styles.nav} aria-label="Primary">
            {pages.map((p) => {
              const active = pathname === p.href;
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>
          {/* Arabic language toggle — disabled at client's request (kept for future re-enable).
          <Link
            href={toggleHref}
            className={`${styles.langToggle} ${locale === "ar" ? styles.langToggleAr : ""}`}
            aria-label={toggleLabel}
            hrefLang={locale === "en" ? "ar" : "en"}
          >
            <span className={styles.langThumb} aria-hidden="true" />
            <span
              className={`${styles.langLabel} ${locale === "en" ? styles.langLabelActive : ""}`}
            >
              EN
            </span>
            <span
              className={`${styles.langLabel} ${locale === "ar" ? styles.langLabelActive : ""}`}
            >
              AR
            </span>
          </Link>
          */}
          <Link href={rfqHref} className={styles.cta}>
            {ctaLabel}
          </Link>

          <button
            className={styles.burger}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        {pages.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.id}
              href={p.href}
              className={`${styles.mobileLink} ${active ? styles.mobileLinkActive : ""}`}
              onClick={() => setOpen(false)}
            >
              {p.label}
            </Link>
          );
        })}
        {/* Arabic language toggle — disabled at client's request (kept for future re-enable).
        <Link
          href={toggleHref}
          className={`${styles.langToggle} ${styles.langToggleMobile} ${locale === "ar" ? styles.langToggleAr : ""}`}
          aria-label={toggleLabel}
          hrefLang={locale === "en" ? "ar" : "en"}
          onClick={() => setOpen(false)}
        >
          <span className={styles.langThumb} aria-hidden="true" />
          <span
            className={`${styles.langLabel} ${locale === "en" ? styles.langLabelActive : ""}`}
          >
            EN
          </span>
          <span
            className={`${styles.langLabel} ${locale === "ar" ? styles.langLabelActive : ""}`}
          >
            AR
          </span>
        </Link>
        */}
        <Link
          href={rfqHref}
          className={`${styles.cta} ${styles.mobileCta}`}
          onClick={() => setOpen(false)}
        >
          {ctaLabel}
        </Link>
      </nav>
    </header>
  );
}
