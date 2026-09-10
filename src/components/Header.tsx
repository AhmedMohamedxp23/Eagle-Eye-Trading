"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_PAGES } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.display = open ? "flex" : "none";
      return;
    }

    if (open) {
      gsap.set(el, { display: "flex", height: 0, opacity: 0 });
      void el.offsetHeight; // force reflow so GSAP measures real layout, not display:none
      console.log("DEBUG opening, natural scrollHeight=", el.scrollHeight);
      const tween = gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        onUpdate: () => console.log("DEBUG tween height=", el.style.height, "progress=", tween?.progress?.()),
        onComplete: () => console.log("DEBUG open complete, final height=", getComputedStyle(el).height),
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          el.style.display = "none";
        },
      });
    }
  }, [open]);

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
        ref={menuRef}
        className={styles.mobileMenu}
        aria-label="Mobile"
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
