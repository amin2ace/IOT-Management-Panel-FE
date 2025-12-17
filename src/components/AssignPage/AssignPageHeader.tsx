import { useTranslation } from "react-i18next";
interface AssignPageHeaderProps {
  deviceCount: number;
  loading: boolean;
}

/**
 * Header component for AssignPage
 * Displays title and device statistics
 */
export default function AssignPageHeader({
  deviceCount,
  loading,
}: AssignPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between mb-5 ml-3">
      <div>
        <h1 className="text-2xl font-semibold">{t("path.assignTab")}</h1>
        {!loading && (
          <p className="text-sm text-gray-400 mt-1">
            {deviceCount} {deviceCount === 1 ? "device" : "devices"}{" "}
            {t("common.available")}
          </p>
        )}
      </div>
    </header>
  );
}
