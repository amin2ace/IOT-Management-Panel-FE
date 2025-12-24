import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

interface LogoutButton {
  onProfileClick: () => void;
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButton) {
  const { user: authUser } = useAuth();
  const { t } = useTranslation();

  if (!authUser) return null;
  return (
    <>
      <button
        onClick={onLogout}
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
    </>
  );
}
