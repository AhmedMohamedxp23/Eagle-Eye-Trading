"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Reveal({
  children,
  stagger = false,
  y = 26,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  stagger?: boolean;
  y?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets: Element | Element[] = stagger
      ? Array.from(el.children)
      : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
