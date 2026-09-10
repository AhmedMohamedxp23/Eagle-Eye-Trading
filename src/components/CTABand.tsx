import Link from "next/link";
import styles from "./CTABand.module.css";

export default function CTABand({
  title,
  sub = "QUALIFIED RFQs ANSWERED WITHIN TWO BUSINESS DAYS",
  label = "Request an Offer →",
  href = "/rfq",
}: {
  title: string;
  sub?: string;
  label?: string;
  href?: string;
}) {
  return (
    <div className={styles.cta}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.sub}>{sub}</div>
      </div>
      <Link href={href} className={styles.btn}>
        {label}
      </Link>
    </div>
  );
}
