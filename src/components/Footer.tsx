import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className={styles.top}>
        <div>
          <Image
            src="/assets/eagle-eye-logo-reversed.png"
            alt="Eagle Eye Trading Est."
            width={123}
            height={38}
            className={styles.logo}
          />
          <p className={styles.blurb}>
            Emerging as the most valued integrator of electronic security,
            safety, fire detection and electrical fixtures in the Kingdom of
            Saudi Arabia.
          </p>
        </div>
        <div>
          <div className={styles.heading}>CONTACT</div>
          <div className={styles.list}>
            <span className={styles.mono}>P.O. Box 325934, Riyadh 11371</span>
            <span className={styles.mono}>+966 56 200 0048</span>
            <span className={styles.mono}>sales@eagleeye-est.com</span>
          </div>
        </div>
        <div>
          <div className={styles.heading}>SITEMAP</div>
          <div className={styles.list}>
            <Link href="/"><span className={styles.sans}>Home</span></Link>
            <Link href="/about"><span className={styles.sans}>About Us</span></Link>
            <Link href="/services"><span className={styles.sans}>Our Services</span></Link>
            <Link href="/contact"><span className={styles.sans}>Contact Us</span></Link>
            <Link href="/rfq"><span className={styles.sans}>Request for Offer</span></Link>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.fine}>
          © 2026 EAGLE EYE TRADING EST. · ALL RIGHTS RESERVED
        </span>
        {/* <span className={styles.fine}>
          CR 0000000000 · VAT 300000000000003 · PRIVACY · TERMS
        </span> */}
      </div>
    </footer>
  );
}
