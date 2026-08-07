import { UseFormRegisterReturn } from "react-hook-form";
import { SensorDto } from "@/api/models/device/SensorDto";
import { useTranslation } from "react-i18next";
import { Cpu, ChevronDown } from "lucide-react";

interface DeviceSelectorProps {
  devices: SensorDto[];
  register: UseFormRegisterReturn;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export default function DeviceSelector({
  devices,
  register,
  onChange,
  error,
}: DeviceSelectorProps) {
  const { t } = useTranslation();

  return (
    <div>
      <label
        htmlFor="device-select"
        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {t("config.selectDevice")}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex w-9 items-center justify-center">
          <Cpu className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>{" "}
        <select
          id="device-select"
          {...register}
          onChange={onChange}
          aria-invalid={!!error}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-white/70 py-2 ps-9 pe-9 text-sm text-gray-900 backdrop-blur-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-100"
        >
          <option value="">{t("config.chooseDevice")}</option>
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.deviceId}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
