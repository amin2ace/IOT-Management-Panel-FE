import { useProfile } from "@/hooks/useProfile";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type contentProps = {
  handleIsProfileOpen: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => void;
};

export default function ProfileContent({
  handleIsProfileOpen,
  handleLogout,
}: contentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useProfile();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {t("profile.summary")}
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong>{t("auth.email") + ": "}</strong>{" "}
            {user?.email || "Not provided"}
          </p>
          <p>
            <strong>{t("profile.userId") + ": "}</strong>{" "}
            {user?.userId || "Unknown"}
          </p>
          <p>
            <strong>{t("profile.joined") + ": "}</strong>{" "}
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
            handleIsProfileOpen(false);
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
  );
}
