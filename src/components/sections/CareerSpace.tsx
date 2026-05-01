"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/cv";
import { RoleNode } from "@/components/ui/RoleNode";

export function CareerSpace() {
  const outerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const [vhPerRole, setVhPerRole] = useState(100);

  useEffect(() => {
    const update = () => {
      // Mobile gets a faster sticky pace so users aren't swiping forever
      setVhPerRole(window.innerWidth < 768 ? 65 : 100);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = experience.length;

  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(total - 1, Math.max(0, Math.floor(v * total)))
  );

  return (
    <section
      ref={outerRef}
      aria-labelledby="career-heading"
      className="relative w-full"
      style={{ height: `${total * vhPerRole}vh` }}
    >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-background/40 backdrop-blur-[2px]">
          {/* Section label */}
          <div className="pointer-events-none absolute top-8 sm:top-12 left-0 right-0 z-10 text-center px-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
              Career space
            </span>
            <h2
              id="career-heading"
              className="font-display mt-2 text-[clamp(1.5rem,3.6vw,2.75rem)] tracking-tight leading-tight"
            >
              A track record of scaling sales
            </h2>
          </div>

          {/* Background ambient */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18), transparent 60%)",
            }}
          />

          {/* Constellation rail (right side, desktop+) */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 right-3 sm:right-6 lg:right-10 hidden sm:flex flex-col items-center justify-center gap-3 z-10"
          >
            {experience.map((job, i) => (
              <RailDot
                key={i}
                index={i}
                period={job.period}
                activeIndex={activeIndex}
              />
            ))}
          </div>

          {/* Mobile compact rail */}
          <div
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 right-2 flex sm:hidden flex-col items-center gap-2 z-10"
          >
            {experience.map((_job, i) => (
              <CompactRailDot key={i} index={i} activeIndex={activeIndex} />
            ))}
          </div>

          {/* Role cards stack */}
          <div className="relative h-full w-full">
            {experience.map((job, i) => (
              <RoleNode
                key={`${job.company}-${i}`}
                job={job}
                index={i}
                total={total}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Scroll progress bar */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted">
            <span className="hidden sm:inline">Scroll</span>
            <div className="h-px w-24 sm:w-32 bg-border overflow-hidden">
              <motion.div
                className="h-full bg-accent origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="hidden sm:inline">Continue</span>
          </div>
        </div>
    </section>
  );
}

function RailDot({
  index,
  period,
  activeIndex,
}: {
  index: number;
  period: string;
  activeIndex: MotionValue<number>;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const unsub = activeIndex.on("change", (v) => setActive(v === index));
    return () => unsub();
  }, [activeIndex, index]);

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] font-medium tracking-wider transition-colors duration-300"
        style={{ color: active ? "var(--accent)" : "var(--subtle)" }}
      >
        {period.split(" ")[0]}
      </span>
      <span
        className="block rounded-full transition-all duration-300"
        style={{
          width: active ? 12 : 6,
          height: active ? 12 : 6,
          background: active ? "var(--accent)" : "var(--border-strong)",
          boxShadow: active ? "0 0 16px var(--accent)" : "none",
        }}
      />
    </div>
  );
}

function CompactRailDot({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const unsub = activeIndex.on("change", (v) => setActive(v === index));
    return () => unsub();
  }, [activeIndex, index]);

  return (
    <span
      className="block rounded-full transition-all duration-300"
      style={{
        width: active ? 8 : 4,
        height: active ? 8 : 4,
        background: active ? "var(--accent)" : "var(--border-strong)",
        boxShadow: active ? "0 0 12px var(--accent)" : "none",
      }}
    />
  );
}
