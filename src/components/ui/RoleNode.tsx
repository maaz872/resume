"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { ExperienceItem } from "@/data/cv";

type Props = {
  job: ExperienceItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

export function RoleNode({ job, index, total, scrollYProgress }: Props) {
  const slice = 1 / total;
  const start = index * slice;
  const peak = start + slice / 2;
  const end = start + slice;

  const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, peak, end], [0.7, 1, 0.85]);
  const y = useTransform(scrollYProgress, [start, peak, end], [80, 0, -50]);
  const blur = useTransform(scrollYProgress, [start, peak, end], [4, 0, 4]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      style={{ opacity, scale, y, filter }}
      className="absolute inset-0 m-auto h-fit w-full max-w-xl mx-auto px-5"
    >
      <div className="relative rounded-3xl border border-border bg-card/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/40">
        {/* Glow halo */}
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.25), rgba(139,92,246,0.15) 50%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft text-accent text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1">
            <Briefcase size={12} aria-hidden />
            {job.period}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-subtle">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight text-foreground">
          {job.company}
        </h3>
        <p className="mt-1.5 text-sm sm:text-base text-accent font-semibold">{job.role}</p>

        <ul className="mt-4 space-y-2 text-sm text-muted leading-relaxed">
          {job.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5">
              <span
                aria-hidden
                className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
