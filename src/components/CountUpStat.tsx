"use client";

import { useEffect, useState } from "react";

export default function CountUpStat({ target }: { target: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(target);
      return;
    }
    let count = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const start = setTimeout(function step() {
      count += 1;
      setN(Math.min(count, target));
      if (count < target) timeout = setTimeout(step, 90);
    }, 500);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [target]);

  return <>{String(n).padStart(2, "0")}</>;
}
