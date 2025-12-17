import { UseFormRegisterReturn } from "react-hook-form";
import { SensorDto } from "@/api/models/device/SensorDto";
import { useTranslation } from "react-i18next";

interface DeviceSelectorProps {
  devices: SensorDto[];
  register: UseFormRegisterReturn;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DeviceSelector({
  devices,
  register,
  onChange,
}: DeviceSelectorProps) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block mb-2">{t("config.selectDevice")}</label>
      <select
        {...register}
        onChange={onChange}
        className="p-2 rounded bg-gray-700 text-white w-full"
      >
        <option value="">{t("config.chooseDevice")}</option>
        {devices.map((d) => (
          <option key={d.deviceId} value={d.deviceId}>
            {d.deviceId}
          </option>
        ))}
      </select>
    </div>
  );
}
