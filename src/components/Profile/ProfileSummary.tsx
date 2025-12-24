import { rolePriority } from "@/context/RolePriority";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileSummary() {
  const { data: user } = useProfile();

  return (
    <>
      <div className="dashboardProfileImage text-xl">
        {user?.username?.[0].toUpperCase() || "G"}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {user?.username || "Guest"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {user?.roles && rolePriority(user?.roles)}
        </p>
      </div>
    </>
  );
}
