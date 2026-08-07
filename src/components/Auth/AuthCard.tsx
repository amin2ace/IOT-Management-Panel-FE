import { ReactNode } from "react";
import { motion } from "framer-motion";
import DashboardHeader from "@/components/Header/DashboardHeader";

type AuthCardProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthCard({ title, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <DashboardHeader showProfile={false} />

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 start-1/4 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl dark:bg-indigo-500/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 end-1/4 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50"
        >
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {children}
          {footer && (
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              {footer}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
