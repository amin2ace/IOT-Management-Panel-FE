// src/components/DashboardHeader.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/Header/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
import { useProfile } from "@/hooks/useProfile";
import { useTranslation } from "react-i18next";
import { UserProfileSection } from "../UserProfileSection";

type props = {
  showProfile: boolean;
};

export default function DashboardHeader({ showProfile }: props) {
  const { user: authUser, logout } = useAuth();
  const { data: user } = useProfile({
    enabled: !!authUser,
  });
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Close profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <>
      <header className="dashboardHeader">
        {/* Left: User Info */}
        {showProfile && authUser && (
          <div className="dashboardProfile">
            <div
              className="dashboardProfileImage cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setIsProfileOpen(true)}
            >
              {user?.username?.[0].toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="dashboardProfileUsername">
                {user?.username || "Guest"}
              </span>
              <span className="dashboardProfileRole">
                {user?.roles || "Viewer"}
              </span>
            </div>
          </div>
        )}

        {/* Right: Theme toggle + language selector */}
        <div className="flex items-center gap-3 ">
          <ThemeToggle />
          <LanguageSelector />
          {showProfile && authUser && (
            <UserProfileSection
              onProfileClick={() => setIsProfileOpen(true)}
              onLogout={handleLogout}
            />
          )}
        </div>
      </header>

      {/* Profile Overlay */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50">
          {/* Blur Background */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

          {/* Profile Modal */}
          <div
            ref={profileRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 animate-in fade-in-90 zoom-in-90"
          >
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="dashboardProfileImage text-xl">
                {user?.username?.[0].toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user?.username || "Guest"}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {user?.roles || "Viewer"}
                </p>
              </div>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Profile Content */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t("profile.summary")}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>{t("auth.email")}</strong>{" "}
                    {user?.email || "Not provided"}
                  </p>
                  <p>
                    <strong>{t("profile.userId")}</strong>{" "}
                    {user?.userId || "Unknown"}
                  </p>
                  <p>
                    <strong>{t("profile.joined")}</strong>{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsProfileOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {t("profile.edit")}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {t("auth.logout")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
