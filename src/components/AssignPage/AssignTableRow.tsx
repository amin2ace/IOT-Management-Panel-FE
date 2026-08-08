import { DeviceCapabilities } from "@/api";
import { CapabilityChip } from "@/components/CapabilityChip";
import { ValidateNumberInput } from "@/components/ValidateNumberInput";
import { useAssignDevice } from "@/hooks/useAssignDevice";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";
import { DeviceEditState } from "../../hooks/useAssignPage";
import { useTranslation } from "react-i18next";
import { Loader2, RotateCcw, Check } from "lucide-react";
import toast from "react-hot-toast";

interface AssignTableRowProps {
  device: ResponseGetDevice;
  model: DeviceEditState;
  onUpdate: (deviceId: string, patch: Partial<DeviceEditState>) => void;
  onToggleFunctionality: (deviceId: string, cap: DeviceCapabilities) => void;
  onReset: (deviceId: string) => void;
  constants: {
    interval: { min: number; max: number; step: number };
    lowSetPoint: { min: number; max: number; step: number };
    highSetPoint: { min: number; max: number; step: number };
  };
}

export default function AssignTableRow({
  device,
  model,
  onUpdate,
  onToggleFunctionality,
  onReset,
  constants,
}: AssignTableRowProps) {
  const { t } = useTranslation();
  const { handleAssign, isAssigning } = useAssignDevice();

  if (!model) {
    return (
      <tr className="border-t border-gray-200 dark:border-gray-800">
        <td
          colSpan={8}
          className="p-4 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          {t("assign.loading")}
        </td>
      </tr>
    );
  }

  const handleAssignClick = async () => {
    if (model.functionality.length === 0) {
      toast.error(t("assign.functionalityNotSelected"));
      return;
    }
    await handleAssign(device, model);
  };

  return (
    <tr className="border-t border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/5">
      <td className="px-4 py-3 align-top">
        <div className="font-medium text-gray-900 dark:text-white">
          {device.deviceId}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {device.deviceHardware}
        </div>
      </td>

      <td className="px-4 py-3 align-top">
        <div className="flex flex-wrap gap-1.5">
          {device?.capabilities?.map((cap) => (
            <span
              key={`cap-${cap}`}
              className="whitespace-nowrap rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
            >
              {cap}
            </span>
          ))}
        </div>
      </td>

      <td className="px-4 py-3 align-top">
        <div className="flex flex-wrap gap-2">
          {device.capabilities.map((cap) => (
            <CapabilityChip
              key={`func-${cap}`}
              cap={cap}
              selected={model.functionality.includes(cap)}
              onToggle={() => onToggleFunctionality(device.deviceId, cap)}
            />
          ))}
        </div>
      </td>

      <td className="px-4 py-3 align-top">
        <input
          type="text"
          className="w-full rounded-lg border border-gray-200 bg-white/70 px-2 py-1.5 text-xs text-gray-900 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-100"
          value={model.publishTopic}
          onChange={(e) =>
            onUpdate(device.deviceId, { publishTopic: e.target.value })
          }
          placeholder="topic/path"
        />
      </td>

      <td className="px-4 py-3 align-top">
        <ValidateNumberInput
          value={model.interval}
          setValue={(v: number) => onUpdate(device.deviceId, { interval: v })}
          min={constants.interval.min}
          max={constants.interval.max}
          step={constants.interval.step}
        />
      </td>

      <td className="px-4 py-3 align-top">
        <ValidateNumberInput
          value={model.lowSetPoint}
          setValue={(v: number) =>
            onUpdate(device.deviceId, { lowSetPoint: v })
          }
          min={constants.lowSetPoint.min}
          max={constants.lowSetPoint.max}
          step={constants.lowSetPoint.step}
        />
      </td>

      <td className="px-4 py-3 align-top">
        <ValidateNumberInput
          value={model.highSetPoint}
          setValue={(v: number) =>
            onUpdate(device.deviceId, { highSetPoint: v })
          }
          min={constants.highSetPoint.min}
          max={constants.highSetPoint.max}
          step={constants.highSetPoint.step}
        />
      </td>

      <td className="px-4 py-3 align-top">
        <div className="flex gap-2">
          <button
            onClick={handleAssignClick}
            disabled={isAssigning}
            title={
              model.functionality.length === 0
                ? t("assign.functionalityNotSelected")
                : undefined
            }
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {isAssigning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            {t("assign.provisionButton")}
          </button>

          <button
            onClick={() => onReset(device.deviceId)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("assign.reset")}
          </button>
        </div>
      </td>
    </tr>
  );
}
