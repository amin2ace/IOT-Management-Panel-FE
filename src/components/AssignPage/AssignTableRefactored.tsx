import { useTranslation } from "react-i18next";
import { DeviceCapabilities } from "@/api";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";
import { DeviceEditState } from "../../hooks/useAssignPage";
import AssignTableRow from "./AssignTableRow";
import AssignDeviceCard from "./AssignDeviceCard";
import { Loader2 } from "lucide-react";

interface AssignTableProps {
  devices: ResponseGetDevice[];
  loading: boolean;
  editState: Record<string, DeviceEditState>;
  onUpdate: (deviceId: string, patch: Partial<DeviceEditState>) => void;
  onToggleFunctionality: (deviceId: string, cap: DeviceCapabilities) => void;
  onReset: (deviceId: string) => void;
  constants: {
    interval: { min: number; max: number; step: number };
    lowSetPoint: { min: number; max: number; step: number };
    highSetPoint: { min: number; max: number; step: number };
  };
}

export default function AssignTableRefactored({
  devices,
  loading,
  editState,
  onUpdate,
  onToggleFunctionality,
  onReset,
  constants,
}: AssignTableProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500 dark:text-gray-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">{t("common.loading")}</span>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
        {t("assign.noDevice")}
      </div>
    );
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="grid grid-cols-1 gap-3 p-4 md:hidden">
        {devices.map((device) => (
          <AssignDeviceCard
            key={device.deviceId}
            device={device}
            model={editState[device.deviceId]}
            onUpdate={onUpdate}
            onToggleFunctionality={onToggleFunctionality}
            onReset={onReset}
            constants={constants}
          />
        ))}
      </div>

      {/* Desktop/tablet: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="sticky top-0 bg-gray-50/95 backdrop-blur-sm dark:bg-gray-900/95">
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.id")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.capabilities")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.functionality")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.baseTopic")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.interval")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.lSetPoint")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.hSetPoint")}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
              >
                {t("table.actions")}
              </th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device) => (
              <AssignTableRow
                key={device.deviceId}
                device={device}
                model={editState[device.deviceId]}
                onUpdate={onUpdate}
                onToggleFunctionality={onToggleFunctionality}
                onReset={onReset}
                constants={constants}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
