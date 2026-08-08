import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Loader2, RotateCcw, Check } from "lucide-react";
import toast from "react-hot-toast";
import { DeviceCapabilities } from "@/api";
import { CapabilityChip } from "@/components/CapabilityChip";
import { ValidateNumberInput } from "@/components/ValidateNumberInput";
import { useAssignDevice } from "@/hooks/useAssignDevice";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";
import { DeviceEditState } from "../../hooks/useAssignPage";

interface AssignDeviceCardProps {
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

export default function AssignDeviceCard({
  device,
  model,
  onUpdate,
  onToggleFunctionality,
  onReset,
  constants,
}: AssignDeviceCardProps) {
  const { t } = useTranslation();
  const { handleAssign, isAssigning } = useAssignDevice();

  if (!model) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white/70 p-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
        {t("assign.loading")}
      </div>
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/40"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {device.deviceId}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {device.deviceHardware}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {t("table.capabilities")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {device?.capabilities?.map((cap) => (
            <span
              key={`cap-${cap}`}
              className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {t("table.functionality")}
        </p>
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
      </div>

      <div className="mb-3">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {t("table.baseTopic")}
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-100"
          value={model.publishTopic}
          onChange={(e) =>
            onUpdate(device.deviceId, { publishTopic: e.target.value })
          }
          placeholder="topic/path"
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <ValidateNumberInput
          label={t("table.interval")}
          value={model.interval}
          setValue={(v: number) => onUpdate(device.deviceId, { interval: v })}
          min={constants.interval.min}
          max={constants.interval.max}
          step={constants.interval.step}
        />
        <ValidateNumberInput
          label={t("table.lSetPoint")}
          value={model.lowSetPoint}
          setValue={(v: number) =>
            onUpdate(device.deviceId, { lowSetPoint: v })
          }
          min={constants.lowSetPoint.min}
          max={constants.lowSetPoint.max}
          step={constants.lowSetPoint.step}
        />
        <ValidateNumberInput
          label={t("table.hSetPoint")}
          value={model.highSetPoint}
          setValue={(v: number) =>
            onUpdate(device.deviceId, { highSetPoint: v })
          }
          min={constants.highSetPoint.min}
          max={constants.highSetPoint.max}
          step={constants.highSetPoint.step}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAssignClick}
          disabled={isAssigning}
          title={
            model.functionality.length === 0
              ? t("assign.functionalityNotSelected")
              : undefined
          }
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {isAssigning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {t("assign.provisionButton")}
        </button>
        <button
          onClick={() => onReset(device.deviceId)}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <RotateCcw className="h-4 w-4" />
          {t("assign.reset")}
        </button>
      </div>
    </motion.div>
  );
}
