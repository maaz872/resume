"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { competencies } from "@/data/cv";

export function OrbitalSkills() {
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState({ size: 720, inner: 190, outer: 290 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // Stage size never exceeds viewport. Keep some padding.
      const stageSize = Math.min(w - 24, 720);
      // Outer ring is ~40% of stage radius from centre (so it stays inside)
      const outer = stageSize * 0.4;
      const inner = outer * 0.65;
      setStage({ size: stageSize, inner, outer });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const inner = competencies.slice(0, 6);
  const outer = competencies.slice(6);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative w-full py-20 sm:py-28 bg-background/60 backdrop-blur-md overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-8 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
          Orbit
        </span>
        <h2
          id="skills-heading"
          className="font-display mt-3 text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-[1.05]"
        >
          Skills in motion
        </h2>
        <p className="mt-3 text-muted">The core competencies I lean on day to day.</p>
      </div>

      <div
        className="relative mx-auto mt-12"
        style={{ width: stage.size, maxWidth: "100%", height: stage.size }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused((p) => !p)}
      >
        {/* Centre word */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none px-4">
          <div
            className="font-display tracking-tight leading-tight text-foreground whitespace-nowrap"
            style={{ fontSize: "clamp(0.9rem, 2.4vw, 2rem)" }}
          >
            Sales · Strategy · Execution
          </div>
          <div className="mt-1 text-[10px] sm:text-xs text-muted">12 core competencies</div>
        </div>

        {/* Ring outlines */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60"
          style={{ width: stage.inner * 2, height: stage.inner * 2 }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/40"
          style={{ width: stage.outer * 2, height: stage.outer * 2 }}
        />

        <Ring radius={stage.inner} skills={inner} duration={48} reverse={false} paused={paused} />
        <Ring radius={stage.outer} skills={outer} duration={72} reverse paused={paused} />
      </div>
    </section>
  );
}

function Ring({
  radius,
  skills,
  duration,
  reverse,
  paused,
}: {
  radius: number;
  skills: string[];
  duration: number;
  reverse: boolean;
  paused: boolean;
}) {
  const rotateTo = reverse ? -360 : 360;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: 0, height: 0 }}
      animate={{ rotate: paused ? 0 : rotateTo }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
    >
      {skills.map((s, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const x = Math.round(Math.cos(angle) * radius);
        const y = Math.round(Math.sin(angle) * radius);
        return (
          <motion.div
            key={s}
            className="absolute"
            style={{ left: `${x}px`, top: `${y}px`, transform: "translate(-50%, -50%)" }}
            animate={{ rotate: paused ? 0 : -rotateTo }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <SkillPill label={s} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function SkillPill({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="inline-flex select-none items-center rounded-full border border-border bg-card/90 backdrop-blur text-xs font-medium text-foreground hover:border-accent hover:text-accent hover:shadow-[0_0_18px_rgba(59,130,246,0.35)] transition-colors duration-200 cursor-default whitespace-nowrap"
      style={{
        padding: "clamp(0.3rem, 0.9vw, 0.5rem) clamp(0.7rem, 2vw, 0.95rem)",
        fontSize: "clamp(0.6rem, 1.6vw, 0.75rem)",
      }}
    >
      {label}
    </motion.span>
  );
}
