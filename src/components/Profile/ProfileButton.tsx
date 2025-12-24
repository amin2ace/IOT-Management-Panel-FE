import { rolePriority } from "@/context/RolePriority";
import { useProfile } from "@/hooks/useProfile";
import { Dispatch, SetStateAction } from "react";

type buttonProps = {
  handleIsProfileOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileButton({ handleIsProfileOpen }: buttonProps) {
  const { data: user } = useProfile();

  return (
    <div className="dashboardProfile">
      <div
        className="dashboardProfileImage cursor-pointer hover:scale-105 transition-transform"
        onClick={() => handleIsProfileOpen(true)}
      >
        {user?.username?.[0].toUpperCase() || "G"}
      </div>
      <div className="flex flex-col">
        <span className="dashboardProfileUsername">
          {user?.username || "Guest"}
        </span>
        <span className="dashboardProfileRole">
          {user?.roles && rolePriority(user?.roles)}
        </span>
      </div>
    </div>
  );
}
