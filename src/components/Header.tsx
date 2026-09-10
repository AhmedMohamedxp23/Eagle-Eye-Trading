"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_PAGES } from "@/lib/data";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrap}>
      <div className={styles.rule} />
      <div className={styles.bar}>
        <Link href="/" className={styles.logoLink} aria-label="Eagle Eye Trading Est. — Home">
          <Image
            src="/assets/eagle-eye-logo-reversed.png"
            alt="Eagle Eye Trading Est."
            width={129}
            height={40}
            className={styles.logo}
            priority
          />
        </Link>

        <div className={styles.navGroup}>
          <nav className={styles.nav} aria-label="Primary">
            {NAV_PAGES.map((p) => {
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
          <Link href="/rfq" className={styles.cta}>
            REQUEST AN OFFER
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
        {NAV_PAGES.map((p) => {
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
        <Link
          href="/rfq"
          className={`${styles.cta} ${styles.mobileCta}`}
          onClick={() => setOpen(false)}
        >
          REQUEST AN OFFER
        </Link>
      </nav>
    </header>
  );
}
