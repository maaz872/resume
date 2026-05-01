"use client";

import { useEffect, useState } from "react";
import { Mail, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/cv";
import { useTheme } from "@/components/theme/ThemeProvider";

export function StickyMiniBar() {
  const [show, setShow] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-40 safe-top"
        >
          <div className="mx-auto max-w-6xl px-3 sm:px-5 pt-3">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/85 backdrop-blur-xl shadow-lg shadow-black/20 px-3 py-2.5 sm:px-4">
              <a
                href="#hero"
                className="flex items-center gap-2.5 group min-w-0"
                aria-label="Back to top"
              >
                <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-accent text-white text-xs font-bold tracking-wider shadow-sm shadow-accent/30 group-hover:scale-105 transition-transform">
                  MA
                </span>
                <span className="hidden sm:inline-flex flex-col leading-tight min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {profile.name}
                  </span>
                  <span className="text-[11px] text-muted truncate">Mobile App Sales</span>
                </span>
              </a>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-accent text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-accent-hover active:scale-95 transition-all min-h-[40px]"
                >
                  <Mail size={14} aria-hidden />
                  <span>Email</span>
                </a>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border bg-background hover:border-accent hover:text-accent transition-colors"
                >
                  {isDark ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
