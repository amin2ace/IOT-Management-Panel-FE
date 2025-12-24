import { Dispatch, SetStateAction } from "react";
import ProfileSummary from "./ProfileSummary";

type headerProps = {
  handleIsProfileOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileHeader({ handleIsProfileOpen }: headerProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <ProfileSummary />
      <button
        onClick={() => handleIsProfileOpen(false)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
