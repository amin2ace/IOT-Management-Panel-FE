import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import {
  TextField,
  SelectField,
  CheckboxField,
} from "@/components/UI/FormFields";

type FormData = z.infer<typeof SensorConfigSchema>;

export default function LoggingConfigTab() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  const logLevels = ["DEBUG", "INFO", "WARN", "ERROR"];

  return (
    <div
      role="tabpanel"
      id="logging-panel"
      aria-labelledby="logging-tab"
      className="space-y-4"
    >
      <SelectField label={t("config.logLevel")} {...register("logging.level")}>
        {logLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </SelectField>

      <CheckboxField
        label={t("config.enableSerialOutput")}
        {...register("logging.enableSerial")}
      />

      <TextField
        label={t("config.buadRate")}
        type="number"
        {...register("logging.buadrate")}
        placeholder="115200"
        error={errors.logging?.buadrate?.message}
      />

      <TextField
        label={t("config.externalServer")}
        {...register("logging.externalServer")}
        placeholder="localhost:514"
        error={errors.logging?.externalServer?.message}
      />
    </div>
  );
}
