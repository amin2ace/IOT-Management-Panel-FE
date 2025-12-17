import { useTranslation } from "react-i18next";

interface AssignPageIntroProps {
  deviceCount: number;
}

/**
 * Introduction section for AssignPage
 * Displays helpful instructions for user
 */
export default function AssignPageIntro({ deviceCount }: AssignPageIntroProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10 mb-4">
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {deviceCount === 0 ? (
          <span className="text-amber-400">
            {t("assign.noDevice") || "No unassigned devices available"}
          </span>
        ) : (
          <>
            {t("assign.assignIntro") ||
              "Assign functionalities to unassigned sensors"}
            {deviceCount > 0 && (
              <span className="ml-2 text-indigo-400">
                ({deviceCount} {deviceCount === 1 ? "device" : "devices"})
              </span>
            )}
          </>
        )}
      </p>
    </div>
  );
}
