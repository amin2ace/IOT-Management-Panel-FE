// src/components/DashboardHeader.tsx
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useTheme } from "@/hooks/useTheme";

type props = {
  showProfile: boolean;
};

export default function DashboardHeader({ showProfile }: props) {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      toast.success(t("auth.logout.success"));
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(t("auth.logoutFailed"));
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="dashboardHeader">
      {/* Left: User Info */}
      {showProfile && (
        <div className="dashboardProfile">
          <div className="dashboardProfileImage">
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
        {showProfile && (
          <button
            onClick={handleLogout}
            className="dashboardLogoutButton"
            title={t("auth.logout")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
