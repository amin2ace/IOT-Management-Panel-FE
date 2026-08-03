import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/Header/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
import { LogoutButton } from "../LogoutButton";
import ProfileButton from "../Profile/ProfileButton";
import ProfileContent from "../Profile/ProfileContent";
import ProfileHeader from "../Profile/ProfileHeader";

type Props = {
  showProfile: boolean;
};

export default function DashboardHeader({ showProfile }: Props) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const closeProfile = () => setIsProfileOpen(false);

  // Close on outside click
  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        closeProfile();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  // Close on Escape + lock scroll + return focus to trigger
  useEffect(() => {
    if (!isProfileOpen) return;

    triggerRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProfile();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [isProfileOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 sm:px-6">
        {showProfile && user ? (
          <ProfileButton handleIsProfileOpen={setIsProfileOpen} />
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageSelector />
          {showProfile && user && (
            <LogoutButton
              onProfileClick={() => setIsProfileOpen(true)}
              onLogout={handleLogout}
            />
          )}
        </div>
      </header>

      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-md"
            />

            <motion.div
              ref={profileRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 top-1/2 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
            >
              <ProfileHeader handleIsProfileOpen={setIsProfileOpen} />
              <ProfileContent
                handleIsProfileOpen={setIsProfileOpen}
                handleLogout={handleLogout}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
