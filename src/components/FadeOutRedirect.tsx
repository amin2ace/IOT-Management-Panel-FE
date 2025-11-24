import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface FadeOutRedirectProps {
  to: string; // target route
  delay?: number; // before animation starts
  duration?: number; // animation duration
  children: ReactNode; // content inside card
  glass?: boolean; // apply glass effect
  pulse?: boolean; // apply pulse effect
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
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setAnimate(true), delay);
    const redirectTimer = setTimeout(
      () => navigate(to, { replace: true }),
      delay + duration
    );

    return () => {
      clearTimeout(startTimer);
      clearTimeout(redirectTimer);
    };
  }, [delay, duration, to, navigate]);

  return (
    <div
      className="flex h-screen items-center justify-center 
      bg-linear-to-b from-slate-700 via-cyan-900/80 to-slate-600
      dark:from-gray-800 dark:to-gray-900"
    >
      <div
        className={`transition-all ease-out ${glass ? "glass-card" : ""} 
          ${animate ? "fade-zoom-out" : "fade-in"} ${pulse ? "pulse" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
