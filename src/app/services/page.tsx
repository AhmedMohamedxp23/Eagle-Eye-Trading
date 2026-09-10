import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { SERVICES } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Six service lines, one accountable contractor — consultation, design & engineering, installation, system integration, testing & commissioning, and operation & maintenance.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <SectionHero
        kicker="OUR SERVICES"
        title="Six service lines, one accountable contractor."
        image="services-hero.jpg"
      />

      <div className={styles.list}>
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.num}
            className={`${styles.row} ${i % 2 === 1 ? styles.rowReverse : ""}`}
          >
            <div className={styles.thumb}>
              <div
                className={styles.thumbImg}
                style={{ backgroundImage: `url(/assets/${s.img})` }}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.num}>{s.num}</div>
              <h3 className={styles.title}>{s.title}</h3>
              <div className={styles.stage}>{s.stage}</div>
              <p className={styles.long}>{s.long}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <CTABand title="Have a specification? We'll price it." />

      <Footer />
    </>
  );
}
