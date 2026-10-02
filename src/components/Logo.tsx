import Image from "next/image";
import styles from "./Logo.module.css";

export default function Logo({
  variant = "header",
  priority = false,
}: {
  variant?: "header" | "footer";
  priority?: boolean;
}) {
  return (
    <span className={`${styles.logo} ${styles[variant]}`}>
      <Image
        src="/assets/eagle-eye-mark-reversed.png"
        alt=""
        width={460}
        height={319}
        className={styles.mark}
        priority={priority}
      />
      <span className={styles.text}>
        <span className={styles.name}>
          Eagle Eye <span className={styles.accent}>Trading Est.</span>
        </span>
        <span className={styles.ar} lang="ar" dir="rtl">
          مؤسسه عين النسر
        </span>
      </span>
    </span>
  );
}
