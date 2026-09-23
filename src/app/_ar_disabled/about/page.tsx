import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import styles from "../../(en)/about/page.module.css";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "مؤسسة عين النسر مزوّد رائد لحلول الأنظمة الكهربائية وتقنية المعلومات والأمن والسلامة، بفريق هندسي مقيم في المملكة وأكثر من 26 شريكًا تقنيًا.",
  alternates: {
    canonical: "/ar/about",
    languages: { en: "/about", ar: "/ar/about" },
  },
};

const STATS_AR = [
  { num: "360°", label: "نطاق متكامل شامل" },
  { num: "داخل المملكة", label: "فريق هندسي" },
  { num: "+26", label: "شريكًا تقنيًا" },
];

export default function AboutPageAr() {
  return (
    <>
      <Header locale="ar" />
      <SectionHero
        kicker="من نحن"
        title="مزوّد رائد لحلول الأنظمة الكهربائية وتقنية المعلومات والأمن والسلامة."
        image="about-hero.jpg"
      />

      <Reveal as="section" className={styles.intro}>
        <div className={styles.copy}>
          <p>
            مزوّد رائد لأنظمة الكهرباء وتقنية المعلومات والأمن والسلامة —
            مصمَّمة داخل المملكة، وقائمة على شراكات مع كبرى الجهات التقنية
            العالمية.
          </p>
          <div className={styles.stats}>
            {STATS_AR.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.images}>
          <div
            className={styles.imgTall}
            style={{
              backgroundImage: "url(/assets/team-panel-installation.jpg)",
            }}
          />
          <div
            className={styles.imgShort}
            style={{
              backgroundImage: "url(/assets/fiber-cable-detail.jpg)",
            }}
          />
        </div>
      </Reveal>
      <Reveal as="section" stagger className={styles.mvv}>
        <div
          className={styles.mvvCol}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(28,34,38,.1) 0%, rgba(28,34,38,.5) 100%), url(/assets/mission-handshake.jpg)",
          }}
        >
          <div className={styles.mvvHeading}>رسالتنا</div>
          <p className={styles.mvvBody}>
            تجاوز توقعات عملائنا، والتعامل بإنصاف مع الجميع.
          </p>
        </div>
        <div
          className={styles.mvvCol}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(28,34,38,.1) 0%, rgba(28,34,38,.5) 100%), url(/assets/riyadh-tower-vision.jpg)",
          }}
        >
          <div className={styles.mvvHeading}>رؤيتنا</div>
          <p className={styles.mvvBody}>
            أن نكون المتكامل الأكثر تميزًا للأنظمة في المملكة.
          </p>
        </div>
        <div
          className={styles.mvvCol}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(28,34,38,.1) 0%, rgba(28,34,38,.5) 100%), url(/assets/values-team-discussion.jpg)",
          }}
        >
          <div className={styles.mvvHeading}>قيمنا</div>
          <p className={styles.mvvBody}>
            أفكار جريئة. تواصل صادق. أعلى معايير الأخلاق المهنية.
          </p>
        </div>
      </Reveal>

      <CTABand
        title="لنتحدث عن مشروعك القادم."
        sub="نُجيب على طلبات عروض الأسعار المؤهلة خلال يومَي عمل"
        label="اطلب عرض سعر ←"
        href="/ar/rfq"
      />

      <Footer locale="ar" />
    </>
  );
}
