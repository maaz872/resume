"use client";

import { motion, useInView } from "framer-motion";
import { Rocket, Target, TrendingUp, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { metrics } from "@/data/cv";
import { CountUp } from "@/components/ui/CountUp";

const iconMap = {
  trending: TrendingUp,
  rocket: Rocket,
  target: Target,
  trophy: Trophy,
};

const descriptions: Record<string, string> = {
  "Revenue Growth": "Increased monthly sales revenue 300%+ at LaunchBox Pakistan.",
  "Business Unit Scaling": "Scaled the mobile app business unit by 600%+ in one year.",
  "Conversion Improvement": "Improved sales conversion rates by 40%+ at Meta Frolic Labs.",
  "Target Overperformance": "Consistently beat sales targets by 2× across multiple roles.",
};

// Organic constellation positions (% of stage box)
const POSITIONS = [
  { x: 18, y: 28 },
  { x: 78, y: 22 },
  { x: 24, y: 74 },
  { x: 80, y: 70 },
];

export function ConstellationMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [stageSize, setStageSize] = useState({ w: 1200, h: 480 });
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setStageSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const points = POSITIONS.map((p) => ({
    x: (p.x / 100) * stageSize.w,
    y: (p.y / 100) * stageSize.h,
  }));

  // closed loop: 0→1→3→2→0
  const path = [points[0], points[1], points[3], points[2], points[0]];
  const d = path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <section
      ref={sectionRef}
      id="impact"
      aria-labelledby="impact-heading"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-background/60 backdrop-blur-md overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-8 text-center">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
          Constellation
        </span>
        <h2
          id="impact-heading"
          className="font-display mt-3 text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-[1.05]"
        >
          Numbers that frame the work
        </h2>
        <p className="mt-3 text-muted">Tap or hover any node to read the story behind it.</p>
      </div>

      {/* Stage — same constellation on every viewport, just scales */}
      <div
        ref={stageRef}
        className="relative mt-10 sm:mt-12 mx-auto w-full"
        style={{ height: "clamp(420px, 60vh, 540px)", maxWidth: "min(1100px, 96vw)" }}
        onMouseLeave={() => setHovered(null)}
      >
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${stageSize.w || 1200} ${stageSize.h || 480}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.85" />
            </linearGradient>
            <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d={d || ""}
            fill="none"
            stroke="url(#constellation)"
            strokeWidth={hovered !== null ? 2 : 1.25}
            strokeLinecap="round"
            filter="url(#line-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: hovered !== null ? 0.9 : 0.55 } : {}}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {metrics.map((m, i) => {
          const Icon = iconMap[m.iconKey];
          const isHovered = hovered === i;
          return (
            <motion.div
              key={m.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${POSITIONS[i].x}%`, top: `${POSITIONS[i].y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(i)}
              onClick={() => setHovered((cur) => (cur === i ? null : i))}
              onMouseLeave={() => setHovered((cur) => (cur === i ? null : cur))}
            >
              <motion.div
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="relative rounded-2xl border bg-card/90 backdrop-blur-md cursor-default"
                style={{
                  borderColor: isHovered ? "var(--accent)" : "var(--border)",
                  boxShadow: isHovered
                    ? "0 0 32px rgba(59,130,246,0.35)"
                    : "0 0 0 0 rgba(0,0,0,0)",
                  padding: "clamp(0.75rem, 2vw, 1rem) clamp(0.85rem, 2.4vw, 1.25rem)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center rounded-lg bg-accent-soft text-accent flex-shrink-0"
                    style={{
                      width: "clamp(2rem, 5vw, 2.25rem)",
                      height: "clamp(2rem, 5vw, 2.25rem)",
                    }}
                  >
                    <Icon size={16} aria-hidden />
                  </span>
                  <div className="text-left">
                    <div
                      className="font-display leading-none"
                      style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.5rem)" }}
                    >
                      <CountUp to={m.value} suffix={m.suffix} />
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted mt-1 leading-tight whitespace-nowrap">
                      {m.label}
                    </div>
                  </div>
                </div>

                {/* Hover tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-3 rounded-xl border border-border bg-card/95 backdrop-blur-md px-3 py-2.5 text-[11px] sm:text-xs text-muted leading-relaxed shadow-xl shadow-black/30 z-20"
                  style={{ width: "clamp(180px, 60vw, 256px)" }}
                >
                  {descriptions[m.label]}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
