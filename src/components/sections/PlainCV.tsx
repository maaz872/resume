"use client";

import { Award, Cpu, GraduationCap, Handshake, Languages, LineChart, Quote } from "lucide-react";
import { education, strengths, summary } from "@/data/cv";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const strengthIcons = {
  handshake: Handshake,
  cpu: Cpu,
  chart: LineChart,
};

export function PlainCV() {
  return (
    <SectionWrapper id="plain-cv" tone="surface">
      {/* Summary */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-7 sm:p-8 relative overflow-hidden">
        <Quote
          size={56}
          className="absolute -top-3 -left-2 text-accent/15 pointer-events-none"
          aria-hidden
          strokeWidth={1.25}
        />
        <p className="relative text-base sm:text-lg leading-relaxed text-foreground">{summary}</p>
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
