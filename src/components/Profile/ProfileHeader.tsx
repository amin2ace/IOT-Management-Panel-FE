import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProfileSummary from "./ProfileSummary";

type HeaderProps = {
  handleIsProfileOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileHeader({ handleIsProfileOpen }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-6 flex items-center gap-4">
      <ProfileSummary />
      <button
        type="button"
        onClick={() => handleIsProfileOpen(false)}
        className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100/70 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label={t("common.close", "Close")}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
