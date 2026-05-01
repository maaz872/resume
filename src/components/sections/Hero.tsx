"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, Linkedin, ArrowDown } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { profile } from "@/data/cv";

type Star = {
  x: number; // %
  y: number; // %
  size: number; // px
  delay: number;
  hue: "white" | "blue" | "cyan";
};

function makeStars(count: number, seed = 1): Star[] {
  // Simple LCG for stable positions
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: Star[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: rand() * 100,
      y: rand() * 100,
      size: 1.5 + rand() * 2.5,
      delay: rand() * 4,
      hue: rand() > 0.7 ? "cyan" : rand() > 0.4 ? "blue" : "white",
    });
  }
  return out;
}

const HUE_GLOW = {
  white: "rgba(255,255,255,0.6)",
  blue: "rgba(96,165,250,0.7)",
  cyan: "rgba(34,211,238,0.7)",
};
const HUE_FILL = {
  white: "#f8fafc",
  blue: "#93c5fd",
  cyan: "#67e8f9",
};

export function Hero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });

  // Mouse parallax (desktop only)
  const mouseTx1 = useTransform(sx, (v) => (v - 0.5) * 8);
  const mouseTy1 = useTransform(sy, (v) => (v - 0.5) * 8);
  const mouseTx2 = useTransform(sx, (v) => (v - 0.5) * 18);
  const mouseTy2 = useTransform(sy, (v) => (v - 0.5) * 18);
  const mouseTx3 = useTransform(sx, (v) => (v - 0.5) * 32);
  const mouseTy3 = useTransform(sy, (v) => (v - 0.5) * 32);

  // Scroll parallax (works on touch + desktop) — depth layers move at different rates as user scrolls past hero
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const scrollContentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scrollStarsY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scrollGlowY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  // Combined Y for centre content (mouse + scroll)
  const contentY = useTransform([mouseTy1, scrollContentY], ([m, s]) => (m as number) + (s as number));

  const stars = useMemo(() => makeStars(28, 7), []);
  const starsMobile = useMemo(() => makeStars(18, 3), []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => {
      mx.set(0.5);
      my.set(0.5);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <section
      ref={wrapperRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background/30 backdrop-blur-[2px]"
    >
      {/* Glow layer (deepest parallax) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ x: mouseTx3, y: scrollGlowY, opacity: heroOpacity }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[720px] w-[720px] rounded-full blur-[120px] opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25), rgba(59,130,246,0.18) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Star cluster (mid parallax) — desktop */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ x: mouseTx2, y: scrollStarsY }}
      >
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: HUE_FILL[s.hue],
              boxShadow: `0 0 ${s.size * 4}px ${HUE_GLOW[s.hue]}`,
            }}
            animate={{
              y: [0, -6, 0, 4, 0],
              opacity: [0.5, 1, 0.7, 1, 0.5],
            }}
            transition={{
              duration: 6 + s.delay,
              delay: s.delay,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* Star cluster (mobile — gets scroll-driven parallax) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{ y: scrollStarsY }}
      >
        {starsMobile.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: HUE_FILL[s.hue],
              boxShadow: `0 0 ${s.size * 3}px ${HUE_GLOW[s.hue]}`,
            }}
            animate={{ opacity: [0.4, 0.95, 0.4] }}
            transition={{
              duration: 5 + s.delay,
              delay: s.delay,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* Centre content (lightest parallax — combines mouse + scroll) */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-2xl px-5 sm:px-6 md:px-8 text-center"
        style={{ x: mouseTx1, y: contentY }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-500 pulse-dot" aria-hidden />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {profile.badge}
        </motion.span>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display mt-6 text-[clamp(3rem,9vw,6.25rem)] tracking-[-0.025em] leading-[1.02] text-foreground"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-base sm:text-lg font-semibold text-accent"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-5 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
        >
          I help companies scale mobile app and SaaS revenue through strategy, consultation, and
          execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent text-white font-semibold px-5 py-3.5 shadow-lg shadow-accent/25 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/35 transition-all duration-200 min-h-[48px]"
          >
            <Mail size={18} aria-hidden />
            Email Me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 backdrop-blur text-foreground font-semibold px-5 py-3.5 hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200 min-h-[48px]"
          >
            <Linkedin size={18} aria-hidden />
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row sm:items-center justify-center gap-y-2 gap-x-6 text-sm text-muted"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center gap-2 hover:text-accent transition-colors"
          >
            <Mail size={14} aria-hidden />
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phoneTel}`}
            className="inline-flex items-center justify-center gap-2 hover:text-accent transition-colors"
          >
            <Phone size={14} aria-hidden />
            {profile.phoneDisplay}
          </a>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          href="#impact"
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 sm:-bottom-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted hover:text-accent transition-colors"
        >
          Begin journey
          <ArrowDown size={12} className="animate-bounce" aria-hidden />
        </motion.a>
      </motion.div>
    </section>
  );
}
