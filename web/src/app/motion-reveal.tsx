"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./page.module.css";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Scroll-triggered section entrance that remains fully visible without JavaScript. */
export function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsReady(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const classes = [className, isReady ? styles.motionReady : "", isVisible ? styles.motionVisible : ""].filter(Boolean).join(" ");

  return <section ref={elementRef} className={classes} style={{ "--motion-delay": `${delay}ms` } as CSSProperties}>{children}</section>;
}
