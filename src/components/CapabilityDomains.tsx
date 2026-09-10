"use client";

import { useEffect, useRef, useState } from "react";
import { DOMAINS } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./CapabilityDomains.module.css";

export default function CapabilityDomains() {
  const [active, setActive] = useState(0);
  const domain = DOMAINS[active];
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [active]);

  return (
    <div>
      <div className={styles.tabs} role="tablist">
        {DOMAINS.map((d, i) => (
          <button
            key={d.label}
            role="tab"
            aria-selected={i === active}
            className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
            onClick={() => setActive(i)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className={styles.grid} ref={gridRef}>
        <div>
          <h3 className={styles.title}>{domain.title}</h3>
          <p className={styles.intro}>{domain.intro}</p>
          <div className={styles.items}>
            {domain.items.map((it) => (
              <div key={it.t} className={styles.item}>
                <div className={styles.itemTitle}>{it.t}</div>
                <p className={styles.itemBody}>{it.b}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.images}>
          <div
            className={styles.imgBig}
            style={{ backgroundImage: `url(/assets/${domain.img1})` }}
          />
          <div
            className={styles.imgSmall}
            style={{ backgroundImage: `url(/assets/${domain.img2})` }}
          />
        </div>
      </div>
    </div>
  );
}
