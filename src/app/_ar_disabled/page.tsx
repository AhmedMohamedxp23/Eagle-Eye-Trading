import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";
import CountUpStat from "@/components/CountUpStat";
import CapabilityDomains from "@/components/CapabilityDomains";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import { PARTNERS, CLIENTS } from "@/lib/data";
import { SERVICES_AR, DOMAINS_AR } from "@/lib/data.ar";
import styles from "../(en)/page.module.css";

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "أنظمة كهربائية وتقنية معلومات وأمن وسلامة — استشارات وتصميم وتركيب وتشغيل تجريبي وصيانة، ضمن نطاق مسؤول شامل 360°.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

export default function HomeAr() {
  return (
    <>
      <Header locale="ar" />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGradient} />
        <HeroCanvas />
        <div className={styles.heroScan} />
        <div className={styles.heroContent}>
          <div className={styles.heroRule} />
          <div>
            <div className={styles.kicker}>
              تكامل الأنظمة &nbsp;·&nbsp; المملكة العربية السعودية
            </div>
            <h1 className={styles.h1}>نهندس الحلول لتحديات الغد.</h1>
            <p className={styles.lede}>
              أنظمة كهربائية وتقنية معلومات وأمن وسلامة — تصميم وتركيب
              وصيانة من الألف إلى الياء.
            </p>
            <div className={styles.heroActions}>
              <Link href="/ar/rfq" className={styles.btnPrimary}>
                اطلب عرض سعر
              </Link>
              <Link href="/ar/services" className={styles.btnGhost}>
                خدماتنا
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <div className={styles.statNum}>
              <CountUpStat target={6} />
            </div>
            <div className={styles.statLabel}>خطوط الخدمة</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>360°</div>
            <div className={styles.statLabel}>تسليم متكامل</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>الرياض</div>
            <div className={styles.statLabel}>المقر الرئيسي</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>05</div>
            <div className={styles.statLabel}>مجالات الكفاءة</div>
          </div>
        </div>
      </section>

      <Reveal as="section" stagger className={styles.mvv}>
        <div className={styles.mvvCol}>
          <div className={styles.mvvHeading}>الرسالة</div>
          <p className={styles.mvvBody}>
            تجاوز توقعات عملائنا في كل جانب من جوانب أعمالنا.
          </p>
        </div>
        <div className={styles.mvvCol}>
          <div className={styles.mvvHeading}>الرؤية</div>
          <p className={styles.mvvBody}>
            أن نكون المتكامل الأكثر تميزًا للأنظمة في المملكة.
          </p>
        </div>
        <div className={styles.mvvCol}>
          <div className={styles.mvvHeading}>القيم</div>
          <p className={styles.mvvBody}>
            التحرر من الافتراضات المحدودة. العمل وفق أعلى معايير الأخلاق
            المهنية. بيئة عمل يزدهر فيها فريقنا.
          </p>
        </div>
      </Reveal>

      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNum}>01</span>
          <h2 className={styles.sectionTitle}>ماذا نقدم</h2>
          <span className={styles.sectionRule} />
          <Link href="/ar/services" className={styles.sectionLink}>
            جميع الخدمات ←
          </Link>
        </div>
        <p className={styles.sectionSub}>
          مقاول واحد، من المسح الأول وحتى الصيانة مدى الحياة.
        </p>
        <Reveal stagger className={styles.specGrid}>
          {SERVICES_AR.map((s) => (
            <Link href="/ar/services" key={s.num} className={styles.specCard}>
              <span className={styles.specGhost}>{s.num}</span>
              <span className={styles.specBadge}>{s.num}</span>
              <h3 className={styles.specTitle}>{s.title}</h3>
              <p className={styles.specBody}>{s.short}</p>
              <span className={styles.specStage}>{s.stage}</span>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNum}>02</span>
          <h2 className={styles.sectionTitle}>مجالات الكفاءة</h2>
          <span className={styles.sectionRule} />
          <span className={styles.sectionLink} style={{ cursor: "default" }}>
            اختر للمعاينة
          </span>
        </div>
        <Reveal>
          <CapabilityDomains domains={DOMAINS_AR} />
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNum}>03</span>
          <h2 className={styles.sectionTitle}>الشراكات والعملاء</h2>
          <span className={styles.sectionRule} />
          <span className={styles.sectionLink} style={{ cursor: "default" }}>
            مزودو التقنية · المراجع
          </span>
        </div>
        <Reveal stagger className={styles.logoGrid}>
          {PARTNERS.map(([file, alt]) => (
            <div
              key={file}
              role="img"
              aria-label={alt}
              className={styles.partnerTile}
              style={{ backgroundImage: `url(/assets/partners/${file}.png)` }}
            />
          ))}
        </Reveal>
        <div className={styles.clientLabel}>عملاؤنا</div>
        <Reveal stagger className={styles.logoGrid}>
          {CLIENTS.map((c) => (
            <div key={c.img} className={styles.clientTile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/${c.img}`}
                alt={c.alt}
                className={styles.clientTileImg}
              />
            </div>
          ))}
        </Reveal>
      </section>

      <CTABand
        title="هل أنت مستعد لتحديد نطاق مشروعك القادم؟"
        sub="نُجيب على طلبات عروض الأسعار المؤهلة خلال يومَي عمل"
        label="اطلب عرض سعر ←"
        href="/ar/rfq"
      />

      <Footer locale="ar" />
    </>
  );
}
