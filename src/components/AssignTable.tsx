// src/components/AssignTable.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { DeviceCapabilities } from "@/api";
import { DeviceEditState } from "@/pages";
import TableRow from "./TableRow";
import { ResponseGetDevice } from "@/api/models/GetSensorResponseDto";

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

export default function AssignTable({
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
    <div className="overflow-x-auto rounded-t-lg">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-gray-300 dark:bg-gray-600 text-sm uppercase">
            <th className="px-4 py-2">{t("table.id")}</th>
            <th className="px-4 py-2">{t("table.capabilities")}</th>
            <th className="px-4 py-2">{t("table.functionality")}</th>
            <th className="px-4 py-2">{t("table.baseTopic")}</th>
            <th className="px-4 py-2">{t("table.interval")}</th>
            <th className="px-4 py-2">{t("table.lSetPoint")}</th>
            <th className="px-4 py-2">{t("table.hSetPoint")}</th>
            <th className="px-4 py-2">{t("common.actions")}</th>
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

          {devices.map((device, index) => {
            const model = editState[device.deviceId];

            return (
              <TableRow
                key={`${device.deviceId}-${index}`} // ✅ Fallback to index if deviceId might not be unique
                device={device}
                model={model}
                onUpdate={onUpdate}
                onToggleFunctionality={onToggleFunctionality}
                onReset={onReset}
                constants={constants}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
