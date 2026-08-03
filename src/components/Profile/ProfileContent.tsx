import { Dispatch, SetStateAction } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Hash, CalendarDays, PencilLine, LogOut } from "lucide-react";

type ContentProps = {
  handleIsProfileOpen: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => void;
};

export default function ProfileContent({
  handleIsProfileOpen,
  handleLogout,
}: ContentProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useProfile();

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(i18n.language)
    : t("profile.unknown", "Unknown");

  const rows = [
    {
      icon: Mail,
      label: t("auth.email"),
      value: user?.email || t("profile.notProvided", "Not provided"),
    },
    {
      icon: Hash,
      label: t("profile.userId"),
      value: user?.userId || t("profile.unknown", "Unknown"),
    },
    { icon: CalendarDays, label: t("profile.joined"), value: joinedDate },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/40 bg-white/50 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          {t("profile.summary")}
        </h3>
        <div className="space-y-2.5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center gap-2.5 text-sm">
              <row.icon className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
              <span className="font-medium text-gray-500 dark:text-gray-400">
                {row.label}:
              </span>
              <span className="truncate text-gray-800 dark:text-gray-200">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            navigate("/profile");
            handleIsProfileOpen(false);
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PencilLine className="h-4 w-4" />
          {t("profile.edit")}
        </motion.button>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm font-medium text-red-600 backdrop-blur-sm transition-colors hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
        >
          <LogOut className="h-4 w-4" />
          {t("auth.logout")}
        </motion.button>
      </div>
    </div>
  );
}
