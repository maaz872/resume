"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Cpu, GraduationCap, Handshake, Languages, LineChart, Quote } from "lucide-react";
import { education, experience, strengths, summary } from "@/data/cv";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const strengthIcons = {
  handshake: Handshake,
  cpu: Cpu,
  chart: LineChart,
};

export function PlainCV() {
  return (
    <SectionWrapper
      id="plain-cv"
      ariaLabelledBy="plain-cv-heading"
      tone="surface"
      number=""
      eyebrow="For the skim-readers"
    >
      <div className="text-center">
        <h2
          id="plain-cv-heading"
          className="font-display text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-[1.05]"
        >
          The plain version
        </h2>
        <p className="mt-3 text-muted">All the same content, no animations. Just the CV.</p>
      </div>

      {/* Summary */}
      <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-border bg-card p-7 sm:p-8 relative overflow-hidden">
        <Quote
          size={56}
          className="absolute -top-3 -left-2 text-accent/15 pointer-events-none"
          aria-hidden
          strokeWidth={1.25}
        />
        <p className="relative text-base sm:text-lg leading-relaxed text-foreground">{summary}</p>
      </div>

      {/* Experience full list */}
      <div className="mt-14">
        <h3 className="font-display text-2xl sm:text-3xl tracking-tight">Experience</h3>
        <ol className="mt-6 space-y-4">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-display text-xl sm:text-2xl tracking-tight text-foreground leading-tight">
                    {job.company}
                  </h4>
                  <p className="mt-0.5 text-sm sm:text-base text-accent font-semibold">{job.role}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft text-accent text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 self-start whitespace-nowrap">
                  <Briefcase size={12} aria-hidden />
                  {job.period}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted leading-relaxed list-disc pl-5">
                {job.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Strengths */}
      <div className="mt-14">
        <h3 className="font-display text-2xl sm:text-3xl tracking-tight">Sales approach</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s) => {
            const Icon = strengthIcons[s.iconKey];
            return (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={20} aria-hidden />
                </div>
                <h4 className="font-display mt-4 text-lg tracking-tight text-foreground">
                  {s.title}
                </h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Education */}
      <div className="mt-14">
        <h3 className="font-display text-2xl sm:text-3xl tracking-tight">Education & certifications</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card icon={GraduationCap} label="Education">
            <span className="font-semibold text-foreground">{education.university.name}</span>
            <span className="block text-muted text-sm mt-0.5">{education.university.degree}</span>
          </Card>
          <Card icon={Award} label="Certification">
            <span className="font-semibold text-foreground">{education.certification.name}</span>
            <span className="block text-muted text-sm mt-0.5">{education.certification.detail}</span>
          </Card>
          <Card icon={Languages} label="Languages">
            {education.languages.map((l) => (
              <span key={l.name} className="block">
                <span className="font-semibold text-foreground">{l.name}</span>
                <span className="text-muted text-sm"> — {l.level}</span>
              </span>
            ))}
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}

function Card({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Award;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon size={20} aria-hidden />
      </div>
      <h4 className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</h4>
      <div className="mt-2 space-y-1 text-base">{children}</div>
    </div>
  );
}
