"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import { FAMILIES, getProducts, type FamilyId } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./page.module.css";

export default function ProductsClient() {
  const [family, setFamily] = useState<FamilyId>("security");
  const fam = FAMILIES.find((f) => f.id === family) ?? FAMILIES[0];
  const products = getProducts(family);
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
      <Header />
      <SectionHero
        kicker="OUR PRODUCTS"
        title="A complete range of electrical and security solutions."
        lede="Including — but not limited to — lighting fixtures, power panels and cables, across five product families."
        image="products-hero.jpg"
      >
        <div className={styles.tabs} role="tablist">
          {FAMILIES.map((f) => (
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
            {String(products.length).padStart(2, "0")} SYSTEMS
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

      <Footer />
    </>
  );
}
