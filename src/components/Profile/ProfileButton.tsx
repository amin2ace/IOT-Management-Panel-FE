import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { rolePriority } from "@/context/RolePriority";
import { useProfile } from "@/hooks/useProfile";
import Avatar from "./Avatar";

type ButtonProps = {
  handleIsProfileOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileButton({ handleIsProfileOpen }: ButtonProps) {
  const { data: user } = useProfile();
  const { t } = useTranslation();
  const displayName = user?.username || t("profile.guest", "Guest");

  return (
    <motion.button
      type="button"
      onClick={() => handleIsProfileOpen(true)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-start transition-colors hover:bg-gray-100/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:hover:bg-white/5"
      aria-label={t("profile.openLabel", "Open profile for {{name}}", {
        name: displayName,
      })}
    >
      <Avatar username={user?.username} size="sm" />
      <div className="hidden flex-col sm:flex">
        <span className="text-sm font-semibold leading-tight text-gray-900 dark:text-white">
          {displayName}
        </span>
        <span className="text-xs leading-tight text-gray-500 dark:text-gray-400">
          {user?.roles && rolePriority(user.roles)}
        </span>
      </div>
    </motion.button>
  );
}
