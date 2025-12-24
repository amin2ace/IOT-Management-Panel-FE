// src/components/DashboardHeader.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/Header/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
import { LogoutButton } from "../LogoutButton";
import ProfileButton from "../Profile/ProfileButton";
import ProfileContent from "../Profile/ProfileContent";
import ProfileHeader from "../Profile/ProfileHeader";

type props = {
  showProfile: boolean;
};

export default function DashboardHeader({ showProfile }: props) {
  const { user, logout } = useAuth();

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
        {showProfile && user && (
          <ProfileButton handleIsProfileOpen={setIsProfileOpen} />
        )}

        {/* Right: Theme toggle + language selector */}
        <div className="flex items-center gap-3 ">
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
            <ProfileHeader handleIsProfileOpen={setIsProfileOpen} />
            <ProfileContent
              handleIsProfileOpen={setIsProfileOpen}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      )}
    </>
  );
}
