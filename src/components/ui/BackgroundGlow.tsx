type Props = {
  className?: string;
  variant?: "hero" | "subtle";
};

export function BackgroundGlow({ className = "", variant = "subtle" }: Props) {
  const isHero = variant === "hero";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className={`float-slow absolute rounded-full blur-[120px] ${
          isHero
            ? "top-[-15%] left-[-15%] h-[640px] w-[640px] opacity-70"
            : "top-1/3 left-1/4 h-[420px] w-[420px] opacity-40"
        }`}
        style={{ background: "radial-gradient(circle at 30% 30%, var(--accent-soft), transparent 70%)" }}
      />
      <div
        className={`float-slower absolute rounded-full blur-[120px] ${
          isHero
            ? "bottom-[-20%] right-[-10%] h-[720px] w-[720px] opacity-60"
            : "bottom-1/4 right-1/4 h-[400px] w-[400px] opacity-30"
        }`}
        style={{ background: "radial-gradient(circle at 60% 60%, var(--accent-soft), transparent 70%)" }}
      />
      {isHero && (
        <div
          className="absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full blur-[100px] opacity-25"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.25), transparent 70%)" }}
        />
      )}
    </div>
  );
}
