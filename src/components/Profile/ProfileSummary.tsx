import { useTranslation } from "react-i18next";
import { rolePriority } from "@/context/RolePriority";
import { useProfile } from "@/hooks/useProfile";
import Avatar from "./Avatar";

export default function ProfileSummary() {
  const { data: user } = useProfile();
  const { t } = useTranslation();

  return (
    <>
      <Avatar username={user?.username} size="lg" />
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {user?.username || t("profile.guest", "Guest")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user?.roles && rolePriority(user.roles)}
        </p>
      </div>
    </>
  );
}
