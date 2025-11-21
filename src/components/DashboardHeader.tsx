// src/components/DashboardHeader.tsx
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
// import { useTheme } from "@/hooks/useTheme";

type props = {
  showProfile: boolean;
};

export default function DashboardHeader({ showProfile }: props) {
  const { user } = useAuth();
  // const { theme } = useTheme(); // To show current theme

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
      </div>
    </header>
  );
}
