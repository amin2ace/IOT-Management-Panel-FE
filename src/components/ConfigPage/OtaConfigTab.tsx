import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import { TextField, CheckboxField } from "@/components/UI/FormFields";

type FormData = z.infer<typeof SensorConfigSchema>;

export default function OtaConfigTab() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div
      role="tabpanel"
      id="ota-panel"
      aria-labelledby="ota-tab"
      className="space-y-4"
    >
      <CheckboxField
        label={t("config.enableOtaUpdates")}
        {...register("ota.enabled")}
      />

      <TextField
        label={t("config.firmwareUrl")}
        type="url"
        {...register("ota.url")}
        placeholder="ftp://firmware-server.com/latest.bin"
        error={errors.ota?.url?.message}
      />

      <TextField
        label={t("config.checkInterval")}
        type="number"
        {...register("ota.checkInterval")}
        placeholder="3600"
        hint={t("common.seconds")}
        error={errors.ota?.checkInterval?.message}
      />
    </div>
  );
}
