import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { useRef } from "react";

export type StatVariant = "neutral" | "success" | "warning" | "danger";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: StatVariant;
  progress?: number;
  isLoading?: boolean;
};

const variantStyles: Record<
  StatVariant,
  { icon: string; bar: string; glow: string }
> = {
  neutral: {
    icon: "bg-gray-100/80 text-gray-600 dark:bg-gray-800/80 dark:text-gray-300",
    bar: "bg-gray-400 dark:bg-gray-500",
    glow: "180,180,190",
  },
  success: {
    icon: "bg-emerald-50/80 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    bar: "bg-emerald-500",
    glow: "16,185,129",
  },
  warning: {
    icon: "bg-amber-50/80 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    bar: "bg-amber-500",
    glow: "245,158,11",
  },
  danger: {
    icon: "bg-red-50/80 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    bar: "bg-red-500",
    glow: "239,68,68",
  },
};

export const statCardMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const TILT_RANGE = 6; // degrees, kept subtle intentionally

export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = "neutral",
  progress,
  isLoading = false,
}: StatCardProps) {
  const styles = variantStyles[variant];
  const ref = useRef<HTMLDivElement>(null);

  // Raw pointer position within the card, 0–1 on each axis
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Smooth out the tilt so it trails the cursor slightly instead of snapping
  const springConfig = { stiffness: 200, damping: 20, mass: 0.3 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [TILT_RANGE, -TILT_RANGE]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-TILT_RANGE, TILT_RANGE]),
    springConfig,
  );

  // Spotlight position in percent, for the CSS radial-gradient background
  const spotlightX = useTransform(px, (v) => `${v * 100}%`);
  const spotlightY = useTransform(py, (v) => `${v * 100}%`);
  const background = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(${styles.glow},0.14), transparent 70%)`,
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      variants={statCardMotion}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-shadow duration-200 hover:shadow-lg dark:border-white/10 dark:bg-gray-900/50"
    >
      {/* Cursor-follow spotlight, sits under the content */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background }}
      />

      {/* Top hairline highlight for glass edge definition */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/20" />

      <div className="relative flex items-start justify-between">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h2>
        <span
          className={clsx(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            styles.icon,
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>

      {isLoading ? (
        <div className="relative mt-3 h-8 w-20 animate-pulse rounded-md bg-gray-200/70 dark:bg-gray-800/70" />
      ) : (
        <p className="relative mt-2 text-3xl font-semibold tabular-nums text-gray-900 dark:text-white">
          {value}
        </p>
      )}

      {typeof progress === "number" && !isLoading && (
        <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200/60 dark:bg-gray-800/60">
          <motion.div
            className={clsx("h-full rounded-full", styles.bar)}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          />
        </div>
      )}
    </motion.div>
  );
}
