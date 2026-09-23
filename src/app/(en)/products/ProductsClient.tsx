"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import CTABand from "@/components/CTABand";
import { FAMILIES, getProducts, type FamilyId } from "@/lib/data";
import { FAMILIES_AR, getProductsAr } from "@/lib/data.ar";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./page.module.css";

type Locale = "en" | "ar";

const COPY = {
  en: {
    kicker: "OUR PRODUCTS",
    title: "A complete range of electrical and security solutions.",
    lede: "Including — but not limited to — lighting fixtures, power panels and cables, across five product families.",
    systems: "SYSTEMS",
    ctaTitle: "Have a specification? We'll price it.",
    ctaSub: "QUALIFIED RFQs ANSWERED WITHIN TWO BUSINESS DAYS",
    ctaLabel: "Request an Offer →",
    rfqHref: "/rfq",
  },
  ar: {
    kicker: "منتجاتنا",
    title: "مجموعة متكاملة من الحلول الكهربائية والأمنية.",
    lede: "بما يشمل — دون حصر — تجهيزات الإنارة ولوحات الطاقة والكابلات، عبر خمس فئات من المنتجات.",
    systems: "نظامًا",
    ctaTitle: "لديك مواصفات جاهزة؟ سنقدّم لك السعر.",
    ctaSub: "نُجيب على طلبات عروض الأسعار المؤهلة خلال يومَي عمل",
    ctaLabel: "اطلب عرض سعر ←",
    rfqHref: "/ar/rfq",
  },
};

export default function ProductsClient({ locale = "en" }: { locale?: Locale }) {
  const families = locale === "ar" ? FAMILIES_AR : FAMILIES;
  const t = COPY[locale];
  const [family, setFamily] = useState<FamilyId>("fas");
  const fam = families.find((f) => f.id === family) ?? families[0];
  const products = locale === "ar" ? getProductsAr(family) : getProducts(family);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [family]);

  return (
    <>
      <Header locale={locale} />
      <SectionHero kicker={t.kicker} title={t.title} lede={t.lede} image="products-hero.jpg">
        <div className={styles.tabs} role="tablist">
          {families.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={f.id === family}
              className={`${styles.tab} ${f.id === family ? styles.tabActive : ""}`}
              onClick={() => setFamily(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </SectionHero>

      <div className={styles.body} ref={bodyRef}>
        <div className={styles.head}>
          <h2 className={styles.title}>{fam.title}</h2>
          <span className={styles.rule} />
          <span className={styles.count}>
            {String(products.length).padStart(2, "0")} {t.systems}
          </span>
        </div>
        <p className={styles.intro}>{fam.intro}</p>
        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.code} className={styles.card}>
              {p.hasImage ? (
                <div
                  className={styles.cardImg}
                  style={{ backgroundImage: `url(/assets/${p.img})` }}
                />
              ) : (
                <div className={styles.cardNoImg}>
                  <div className={styles.cardCodeBg}>{p.code}</div>
                </div>
              )}
              <div className={styles.cardBody}>
                <div className={styles.cardCode}>{p.code}</div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardText}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTABand
        title={t.ctaTitle}
        sub={t.ctaSub}
        label={t.ctaLabel}
        href={t.rfqHref}
      />

      <Footer locale={locale} />
    </>
  );
}
