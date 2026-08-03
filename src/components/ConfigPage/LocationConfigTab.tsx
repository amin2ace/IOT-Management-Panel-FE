import { useFormContext, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import TimezoneSelect from "@/components/TimeZoneSelect";
import { TextField } from "@/components/UI/FormFields";

type FormData = z.infer<typeof SensorConfigSchema>;

interface LocationConfigTabProps {
  setValue: UseFormSetValue<FormData>;
}

export default function LocationConfigTab({
  setValue,
}: LocationConfigTabProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div
      role="tabpanel"
      id="location-panel"
      aria-labelledby="location-tab"
      className="space-y-4"
    >
      <TextField
        label={t("config.locationSite")}
        {...register("location.site")}
        placeholder="Building A"
        error={errors.location?.site?.message}
      />
      <TextField
        label={t("config.locationFloor")}
        type="number"
        {...register("location.floor")}
        placeholder="1"
        error={errors.location?.floor?.message}
      />
      <TextField
        label={t("config.locationUnit")}
        {...register("location.unit")}
        placeholder="Room 101"
        error={errors.location?.unit?.message}
      />
      <TimezoneSelect register={register} setValue={setValue} />
    </div>
  );
}
