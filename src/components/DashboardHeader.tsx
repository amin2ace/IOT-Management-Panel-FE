// src/components/DashboardHeader.tsx
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { LanguageSelector } from "./LanguageSelector";

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between p-4  text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 shadow-md ">
      {/* Left: User Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          {user?.username?.[0].toUpperCase() || "U"}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {user?.username || "Guest"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.roles || ""}
          </span>
        </div>
      </div>

      {/* Right: Theme toggle + language selector */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </header>
  );
}
