"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function CountUp({ to, duration = 1.6, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, motionValue]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      <span aria-hidden>{suffix}</span>
      <span className="sr-only">{`${to}${suffix}`}</span>
    </span>
  );
}
