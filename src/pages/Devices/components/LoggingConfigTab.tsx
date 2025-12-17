import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";

type FormData = z.infer<typeof SensorConfigSchema>;

export default function LoggingConfigTab() {
  const { t } = useTranslation();
  const { register } = useFormContext<FormData>();

  const logLevels = ["DEBUG", "INFO", "WARN", "ERROR"];

  return (
    <>
      <div>
        <label htmlFor="log-level" className="block text-sm font-medium mb-1">
          {t("config.logLevel")}
        </label>
        <select
          id="log-level"
          {...register("logging.level")}
          className="input w-full bg-gray-700 text-white"
        >
          {logLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="serial-output"
          {...register("logging.enableSerial")}
          className="w-4 h-4"
        />
        <label
          htmlFor="serial-output"
          className="text-sm font-medium cursor-pointer"
        >
          {t("config.enableSerialOutput")}
        </label>
      </div>

      <div>
        <label htmlFor="baud-rate" className="block text-sm font-medium mb-1">
          {t("config.buadRate")}
        </label>
        <input
          id="baud-rate"
          type="number"
          {...register("logging.buadrate")}
          className="input w-full"
          placeholder="115200"
        />
      </div>

      <div>
        <label
          htmlFor="external-server"
          className="block text-sm font-medium mb-1"
        >
          {t("config.externalServer")}
        </label>
        <input
          id="external-server"
          type="text"
          {...register("logging.externalServer")}
          className="input w-full"
          placeholder="localhost:514"
        />
      </div>
    </>
  );
}
