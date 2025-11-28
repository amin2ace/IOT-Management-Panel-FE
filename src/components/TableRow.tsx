// src/components/TableRow.tsx
import React from "react";
import { DeviceCapabilities } from "@/api";
import { CapabilityChip } from "@/components/CapabilityChip";
import { ValidateNumberInput } from "@/components/ValidateNumberInput";
import { DeviceEditState } from "@/pages";
import { useAssignDevice } from "@/hooks/useAssignDevice";
import { ResponseGetDevice } from "@/api/models/GetSensorResponseDto";

interface TableRowProps {
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

function TableRow({
  device,
  model,
  onUpdate,
  onToggleFunctionality,
  onReset,
  constants,
}: TableRowProps) {
  const { handleAssign, isAssigning } = useAssignDevice();

  if (!model) {
    return (
      <tr className="border-t border-gray-700">
        <td colSpan={8} className="p-4 text-center text-gray-400">
          Loading device configuration...
        </td>
      </tr>
    );
  }

  const handleSend = async () => {
    await handleAssign(device, model);
  };

  return (
    <tr className="border-t border-gray-700">
      {/* Device ID */}
      <td className="px-4 py-3 align-top">
        <div className="font-medium">{device.deviceId}</div>
        <div className="text-xs text-gray-400">{device.deviceHardware}</div>
      </td>

      {/* Capabilities */}
      <td className="px-4 py-3 align-top">
        <div className="flex gap-2 flex-wrap">
          {device?.capabilities?.map((cap) => (
            <span
              key={`${device.deviceId}-cap-${cap}`} // ✅ Key for capabilities
              className="px-2 py-1 bg-indigo-600/30 text-indigo-300 rounded-md text-[11px]"
            >
              {cap}
            </span>
          ))}
        </div>
      </td>

      {/* Functionality Selection */}
      <td className="px-4 py-3 align-top">
        <div className="flex gap-2 flex-wrap">
          {device.capabilities.map((cap) => (
            <CapabilityChip
              key={`${device.deviceId}-func-${cap}`} // ✅ Key for functionality chips
              cap={cap}
              selected={model.functionality.includes(cap)}
              onToggle={() => onToggleFunctionality(device.deviceId, cap)}
            />
          ))}
        </div>
      </td>

      {/* Base Topic */}
      <td className="px-4 py-3 align-top w-64">
        <input
          className="w-full p-2 rounded bg-gray-700 text-sm"
          value={model.publishTopic}
          onChange={(e) =>
            onUpdate(device.deviceId, {
              publishTopic: e.target.value,
            })
          }
        />
      </td>

      {/* Interval */}
      <td className="px-4 py-3 align-top w-40">
        <ValidateNumberInput
          value={model.interval}
          setValue={(v: number) => onUpdate(device.deviceId, { interval: v })}
          min={constants.interval.min}
          max={constants.interval.max}
          step={constants.interval.step}
        />
      </td>

      {/* Low Set Point */}
      <td className="px-4 py-3 align-top w-32">
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
      <td className="px-4 py-3 align-top w-32">
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
      <td className="px-4 py-3 align-top w-36">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSend}
            disabled={isAssigning}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 py-2 rounded transition-colors"
          >
            {isAssigning ? "Assigning..." : "Assign"}
          </button>

          <button
            onClick={() => onReset(device.deviceId)}
            className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
