"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, X } from "lucide-react";
import { useEffect } from "react";
import type { ExperienceItem } from "@/data/cv";

type Props = {
  job: ExperienceItem | null;
  onClose: () => void;
};

export function FocusModal({ job, onClose }: Props) {
  useEffect(() => {
    if (!job) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [job, onClose]);

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/85 backdrop-blur-md p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="focus-title"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl shadow-black/40 p-6 sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-card-hover hover:text-foreground transition-colors"
            >
              <X size={18} aria-hidden />
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft text-accent text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1">
              <Briefcase size={12} aria-hidden />
              {job.period}
            </span>
            <h3 id="focus-title" className="font-display mt-3 text-3xl sm:text-4xl tracking-tight leading-tight text-foreground">
              {job.company}
            </h3>
            <p className="mt-1.5 text-base text-accent font-semibold">{job.role}</p>

            <ul className="mt-5 space-y-2.5 text-sm sm:text-base text-muted leading-relaxed">
              {job.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
