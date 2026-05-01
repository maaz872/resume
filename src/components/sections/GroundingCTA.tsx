"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { profile } from "@/data/cv";

export function GroundingCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-surface py-24 sm:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 sm:px-6 md:px-8 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
          Let&apos;s talk
        </span>
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="font-display mt-3 text-[clamp(2rem,6vw,3.5rem)] tracking-tight leading-[1.05]"
        >
          Let&apos;s build something impactful together
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 h-px w-32 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-base sm:text-lg text-muted leading-relaxed"
        >
          Open to roles in mobile app sales, SaaS sales, and tech business development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-accent text-white font-semibold px-6 py-4 shadow-lg shadow-accent/25 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30 transition-all duration-200 min-h-[52px]"
          >
            <Mail size={18} aria-hidden />
            Email Me
            <ArrowRight
              size={16}
              aria-hidden
              className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
            />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card text-foreground font-semibold px-6 py-4 hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200 min-h-[52px]"
          >
            <Linkedin size={18} aria-hidden />
            View LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
