import { DeviceCapabilities } from "@/api";
import { CapabilityChip } from "@/components/CapabilityChip";
import { ValidateNumberInput } from "@/components/ValidateNumberInput";
import { useAssignDevice } from "@/hooks/useAssignDevice";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";
import { DeviceEditState } from "../../hooks/useAssignPage";
import { useTranslation } from "react-i18next";

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

/**
 * Single row in the AssignTable
 * Displays device info and configuration fields
 */
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
      <tr className="border-t border-gray-700">
        <td colSpan={8} className="p-4 text-center text-gray-400 text-sm">
          {t("assign.loading")}
        </td>
      </tr>
    );
  }

  const handleAssignClick = async () => {
    if (model.functionality.length === 0) {
      alert(t("assign.functionalityNotSelected"));
      return;
    }
    await handleAssign(device, model);
  };

  return (
    <tr className="border-t border-gray-700 hover:bg-gray-800/30 transition-colors">
      {/* Device ID & Hardware */}
      <td className="px-4 py-3 align-top">
        <div className="font-medium">{device.deviceId}</div>
        <div className="text-xs text-gray-400">{device.deviceHardware}</div>
      </td>

      {/* Available Capabilities */}
      <td className="px-4 py-3 align-top">
        <div className="flex gap-2 flex-wrap">
          {device?.capabilities?.map((cap) => (
            <span
              key={`cap-${cap}`}
              className="px-2 py-1 bg-indigo-600/30 text-indigo-300 rounded text-xs whitespace-nowrap"
            >
              {cap}
            </span>
          ))}
        </div>
      </td>

      {/* Selected Functionality */}
      <td className="px-4 py-3 align-top">
        <div className="flex gap-2 flex-wrap">
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

      {/* Publish Topic */}
      <td className="px-4 py-3 align-top">
        <input
          type="text"
          className="w-full px-2 py-1 rounded bg-gray-700 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={model.publishTopic}
          onChange={(e) =>
            onUpdate(device.deviceId, {
              publishTopic: e.target.value,
            })
          }
          placeholder="topic/path"
        />
      </td>

      {/* Interval */}
      <td className="px-4 py-3 align-top">
        <ValidateNumberInput
          value={model.interval}
          setValue={(v: number) => onUpdate(device.deviceId, { interval: v })}
          min={constants.interval.min}
          max={constants.interval.max}
          step={constants.interval.step}
        />
      </td>

      {/* Low Set Point */}
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

      {/* High Set Point */}
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

      {/* Actions */}
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
            className="flex-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed rounded text-white text-xs font-medium transition-colors"
          >
            {isAssigning ? "..." : t("assign.provisionButton")}
          </button>

          <button
            onClick={() => onReset(device.deviceId)}
            className="flex-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </td>
    </tr>
  );
}
