import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import clsx from "clsx";

interface FadeOutRedirectProps {
  to: string;
  delay?: number;
  duration?: number;
  children: ReactNode;
  glass?: boolean;
  pulse?: boolean;
}

export default function FadeOutRedirect({
  to,
  delay = 1500,
  duration = 800,
  children,
  glass = true,
  pulse = false,
}: FadeOutRedirectProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), delay);
    const redirectTimer = setTimeout(
      () => navigate(to, { replace: true }),
      delay + duration,
    );
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(redirectTimer);
    };
  }, [delay, duration, to, navigate]);

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Ambient background — same recipe as the dashboard's glass background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 start-1/4 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl dark:bg-indigo-500/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 end-1/4 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15"
      />

      <AnimatePresence>
        {phase === "enter" && (
          <motion.div
            key="splash"
            initial={{
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 0.96,
              y: 8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              ...(pulse && !prefersReducedMotion
                ? { scale: [1, 1.015, 1] }
                : {}),
            }}
            exit={{
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 1.04,
              y: -8,
            }}
            transition={{
              opacity: { duration: duration / 1000, ease: "easeOut" },
              scale: pulse
                ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                : { duration: duration / 1000, ease: "easeOut" },
              y: { duration: duration / 1000, ease: "easeOut" },
            }}
            role="status"
            aria-live="polite"
            className={clsx(
              "relative flex flex-col items-center rounded-3xl px-10 py-12 text-center",
              glass &&
                "border border-white/40 bg-white/60 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50",
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
