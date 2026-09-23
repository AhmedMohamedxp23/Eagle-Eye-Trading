import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { SERVICES_AR } from "@/lib/data.ar";
import styles from "../../(en)/services/page.module.css";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "ستة خطوط خدمة، ومقاول واحد مسؤول — استشارات، تصميم وهندسة، تركيب، تكامل أنظمة، فحص وتشغيل تجريبي، وتشغيل وصيانة.",
  alternates: {
    canonical: "/ar/services",
    languages: { en: "/services", ar: "/ar/services" },
  },
};

export default function ServicesPageAr() {
  return (
    <>
      <Header locale="ar" />
      <SectionHero
        kicker="خدماتنا"
        title="ستة خطوط خدمة، ومقاول واحد مسؤول."
        image="services-hero.jpg"
      />

      <div className={styles.list}>
        {SERVICES_AR.map((s, i) => (
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

      <CTABand
        title="لديك مواصفات جاهزة؟ سنقدّم لك السعر."
        sub="نُجيب على طلبات عروض الأسعار المؤهلة خلال يومَي عمل"
        label="اطلب عرض سعر ←"
        href="/ar/rfq"
      />

      <Footer locale="ar" />
    </>
  );
}
