import styles from "./SectionHero.module.css";

export default function SectionHero({
  kicker,
  title,
  lede,
  image,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`${styles.wrap} ${image ? styles.wrapWithImage : ""}`}>
      {image && (
        <>
          <div
            className={styles.bg}
            style={{ backgroundImage: `url(/assets/${image})` }}
          />
          <div className={styles.gradient} />
        </>
      )}
      <div className={styles.rule} />
      <div className={styles.content}>
        <div className={styles.kicker}>{kicker}</div>
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {children}
      </div>
    </div>
  );
}
