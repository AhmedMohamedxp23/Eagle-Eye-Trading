import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Eagle Eye Est is a premier provider of electrical, IT, security and safety systems solutions, with an in-Kingdom engineering team and 26+ technology partners.",
};

const STATS = [
  { num: "360°", label: "TURNKEY SCOPE" },
  { num: "IN-KSA", label: "ENGINEERING TEAM" },
  { num: "26+", label: "TECHNOLOGY PARTNERS" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <SectionHero
        kicker="ABOUT US"
        title="A premier provider of electrical, IT, security and safety systems solutions."
        image="about-hero.jpg"
      />

      <Reveal as="section" className={styles.intro}>
        <div className={styles.copy}>
          <p>
            A premier provider of electrical, IT, security and safety
            systems — engineered in-Kingdom, built on partnerships with
            leading global technology providers.
          </p>
          <div className={styles.stats}>
            {STATS.map((s) => (
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
          <div className={styles.mvvHeading}>OUR MISSION</div>
          <p className={styles.mvvBody}>
            Surpass customer expectations, dealing fairly with everyone.
          </p>
        </div>
        <div
          className={styles.mvvCol}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(28,34,38,.1) 0%, rgba(28,34,38,.5) 100%), url(/assets/riyadh-tower-vision.jpg)",
          }}
        >
          <div className={styles.mvvHeading}>OUR VISION</div>
          <p className={styles.mvvBody}>
            The most valued systems integrator in the Kingdom.
          </p>
        </div>
        <div
          className={styles.mvvCol}
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(28,34,38,.1) 0%, rgba(28,34,38,.5) 100%), url(/assets/values-team-discussion.jpg)",
          }}
        >
          <div className={styles.mvvHeading}>OUR VALUES</div>
          <p className={styles.mvvBody}>
            Bold ideas. Honest communication. Highest ethical standard.
          </p>
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
