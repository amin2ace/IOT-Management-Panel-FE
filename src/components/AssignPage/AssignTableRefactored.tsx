import { useTranslation } from "react-i18next";
import { DeviceCapabilities } from "@/api";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";
import { DeviceEditState } from "../../hooks/useAssignPage";
import AssignTableRow from "./AssignTableRow";

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

/**
 * AssignTable component - displays unassigned devices in a table format
 * Shows device capabilities and allows configuration
 */
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

  return (
    <div className="overflow-x-auto rounded-t-lg border border-white/10">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="bg-gray-300 dark:bg-gray-600 uppercase sticky top-0">
            <th className="px-4 py-3 font-semibold">{t("table.id")}</th>
            <th className="px-4 py-3 font-semibold">
              {t("table.capabilities")}
            </th>
            <th className="px-4 py-3 font-semibold">
              {t("table.functionality")}
            </th>
            <th className="px-4 py-3 font-semibold">{t("table.baseTopic")}</th>
            <th className="px-4 py-3 font-semibold">{t("table.interval")}</th>
            <th className="px-4 py-3 font-semibold">{t("table.lSetPoint")}</th>
            <th className="px-4 py-3 font-semibold">{t("table.hSetPoint")}</th>
            <th className="px-4 py-3 font-semibold">{t("table.actions")}</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={8} className="p-6 text-center text-gray-400">
                {t("common.loading")}
              </td>
            </tr>
          )}

          {!loading && devices.length === 0 && (
            <tr>
              <td colSpan={8} className="p-6 text-center text-gray-400">
                {t("assign.noDevice")}
              </td>
            </tr>
          )}

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
  );
}
