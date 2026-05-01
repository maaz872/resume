"use client";

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";

type LoadingContextValue = {
  loading: boolean;
};

const LoadingContext = createContext<LoadingContextValue>({ loading: true });

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable browser scroll restoration so reloads don't land mid-page,
    // and clear any leftover hash from earlier anchor clicks in the same session.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const minDuration = 1400;
    const maxDuration = 2000;
    const start = performance.now();

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    const timeout = window.setTimeout(() => setLoading(false), maxDuration);

    // Lock scroll while loading
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.removeEventListener("load", finish);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Once loading finishes, release scroll AND force position to top.
  useEffect(() => {
    if (loading) return;
    document.body.style.overflow = "";
    // Disable smooth scroll for this jump so we land at 0 instantly with no animation.
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = prev;
    });
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading }}>
      <LoadingScreen show={loading} />
      {children}
    </LoadingContext.Provider>
  );
}

function LoadingScreen({ show }: { show: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    if (!show) return;
    const controls = animate(count, 100, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [show, count]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--accent-soft), transparent 60%)",
            }}
          />
          <div className="relative text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted">
              Loading career data
            </div>
            <div className="mt-5 font-display text-[clamp(4rem,16vw,9rem)] leading-none text-foreground">
              <motion.span>{rounded}</motion.span>
              <span className="text-accent">%</span>
            </div>
            <div className="mx-auto mt-6 h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
