import { useTranslation } from "react-i18next";

interface AssignPageHeaderProps {
  deviceCount: number;
  loading: boolean;
}

export default function AssignPageHeader({
  deviceCount,
  loading,
}: AssignPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t("path.assignTab")}
        </h1>
        {!loading && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("assign.deviceCountText", { count: deviceCount })}
          </p>
        )}
      </div>
    </header>
  );
}
