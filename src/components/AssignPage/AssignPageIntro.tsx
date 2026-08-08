import { useTranslation } from "react-i18next";
import { AlertTriangle, Info } from "lucide-react";

interface AssignPageIntroProps {
  deviceCount: number;
}

export default function AssignPageIntro({ deviceCount }: AssignPageIntroProps) {
  const { t } = useTranslation();
  const noDevices = deviceCount === 0;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border p-3.5 text-sm ${
        noDevices
          ? "border-amber-200 bg-amber-50/80 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
          : "border-indigo-200 bg-indigo-50/80 text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300"
      }`}
    >
      {noDevices ? (
        <AlertTriangle className="h-4 w-4 shrink-0" />
      ) : (
        <Info className="h-4 w-4 shrink-0" />
      )}
      <p>
        {noDevices ? t("assign.noDevice") : t("assign.assignIntro")}
        {!noDevices && (
          <span className="ms-1 font-medium">
            ({t("assign.deviceCountText", { count: deviceCount })})
          </span>
        )}
      </p>
    </div>
  );
}
