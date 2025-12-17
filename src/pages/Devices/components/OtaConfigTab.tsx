import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";

type FormData = z.infer<typeof SensorConfigSchema>;

export default function OtaConfigTab() {
  const { t } = useTranslation();
  const { register } = useFormContext<FormData>();

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="ota-enabled"
          {...register("ota.enabled")}
          className="w-4 h-4"
        />
        <label
          htmlFor="ota-enabled"
          className="text-sm font-medium cursor-pointer"
        >
          {t("config.enableOtaUpdates")}
        </label>
      </div>

      <div>
        <label
          htmlFor="firmware-url"
          className="block text-sm font-medium mb-1"
        >
          {t("config.firmwareUrl")}
        </label>
        <input
          id="firmware-url"
          type="url"
          {...register("ota.url")}
          className="input w-full"
          placeholder="ftp://firmware-server.com/latest.bin"
        />
      </div>

      <div>
        <label
          htmlFor="check-interval"
          className="block text-sm font-medium mb-1"
        >
          {t("config.checkInterval")}
        </label>
        <div className="flex items-center gap-2">
          <input
            id="check-interval"
            type="number"
            {...register("ota.checkInterval")}
            className="input flex-1"
            placeholder="3600"
          />
          <span className="text-xs text-gray-400">{t("common.seconds")}</span>
        </div>
      </div>
    </>
  );
}
