import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";
import CountUpStat from "@/components/CountUpStat";
import CapabilityDomains from "@/components/CapabilityDomains";
import Reveal from "@/components/Reveal";
import { SERVICES, PARTNERS, CLIENTS } from "@/lib/data";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGradient} />
        <HeroCanvas />
        <div className={styles.heroScan} />
        <div className={styles.heroContent}>
          <div className={styles.heroRule} />
          <div>
            <div className={styles.kicker}>
              SYSTEMS INTEGRATION &nbsp;·&nbsp; KINGDOM OF SAUDI ARABIA
            </div>
            <h1 className={styles.h1}>
              Engineering the solutions to tomorrow&apos;s problems.
            </h1>
            <p className={styles.lede}>
              Electrical, IT, security and life-safety systems — designed,
              installed and maintained end to end.
            </p>
            <div className={styles.heroActions}>
              <Link href="/rfq" className={styles.btnPrimary}>
                Request an Offer
              </Link>
              <Link href="/services" className={styles.btnGhost}>
                Our Services
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <div className={styles.statNum}>
              <CountUpStat target={6} />
            </div>
            <div className={styles.statLabel}>SERVICE LINES</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>360°</div>
            <div className={styles.statLabel}>TURNKEY DELIVERY</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>RUH</div>
            <div className={styles.statLabel}>RIYADH HEADQUARTERS</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>05</div>
            <div className={styles.statLabel}>CAPABILITY DOMAINS</div>
          </div>
        </div>
      </section>

      <Reveal as="section" stagger className={styles.mvv}>
        <div className={styles.mvvCol}>
          <div className={styles.mvvHeading}>MISSION</div>
          <p className={styles.mvvBody}>
            To surpass customer expectations in every aspect of our business.
          </p>
        </div>
        <div className={styles.mvvCol}>
          <div className={styles.mvvHeading}>VISION</div>
          <p className={styles.mvvBody}>
            The most valued systems integrator in the Kingdom.
          </p>
        </div>
        <div className={styles.mvvCol}>
          <div className={styles.mvvHeading}>VALUES</div>
          <p className={styles.mvvBody}>
            Abandon limiting assumptions. Operate at the highest ethical
            standard. Keep an environment where our team thrives.
          </p>
        </div>
      </Reveal>

      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNum}>01</span>
          <h2 className={styles.sectionTitle}>What we do</h2>
          <span className={styles.sectionRule} />
          <Link href="/services" className={styles.sectionLink}>
            ALL SERVICES →
          </Link>
        </div>
        <p className={styles.sectionSub}>
          One contractor, first survey to lifetime maintenance.
        </p>
        <Reveal stagger className={styles.specGrid}>
          {SERVICES.map((s) => (
            <Link href="/services" key={s.num} className={styles.specCard}>
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
          <h2 className={styles.sectionTitle}>Capability domains</h2>
          <span className={styles.sectionRule} />
          <span className={styles.sectionLink} style={{ cursor: "default" }}>
            SELECT TO PREVIEW
          </span>
        </div>
        <Reveal>
          <CapabilityDomains />
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNum}>03</span>
          <h2 className={styles.sectionTitle}>Alliances &amp; clients</h2>
          <span className={styles.sectionRule} />
          <span className={styles.sectionLink} style={{ cursor: "default" }}>
            TECHNOLOGY PROVIDERS · REFERENCES
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
        <div className={styles.clientLabel}>OUR CLIENTS</div>
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

      <Footer />
    </>
  );
}
