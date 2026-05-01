"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Tone = "background" | "surface";

type Props = {
  id?: string;
  ariaLabelledBy?: string;
  className?: string;
  tone?: Tone;
  number?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function SectionWrapper({
  id,
  ariaLabelledBy,
  className = "",
  tone = "background",
  number,
  eyebrow,
  children,
}: Props) {
  const toneClass =
    tone === "surface"
      ? "bg-surface/70 backdrop-blur-md"
      : "bg-background/65 backdrop-blur-md";
  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`noise relative w-full py-20 sm:py-24 md:py-32 ${toneClass} ${className}`}
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-8">
        {(number || eyebrow) && (
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {number && <span className="text-accent">{number}</span>}
            {number && eyebrow && <span className="text-border-strong">·</span>}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
