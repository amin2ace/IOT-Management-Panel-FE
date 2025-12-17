import { useFormContext, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import TimezoneSelect from "@/components/TimeZoneSelect";

type FormData = z.infer<typeof SensorConfigSchema>;

interface LocationConfigTabProps {
  setValue: UseFormSetValue<FormData>;
}

export default function LocationConfigTab({
  setValue,
}: LocationConfigTabProps) {
  const { t } = useTranslation();
  const { register } = useFormContext<FormData>();

  return (
    <>
      <div>
        <label
          htmlFor="location-site"
          className="block text-sm font-medium mb-1"
        >
          {t("config.locationSite")}
        </label>
        <input
          id="location-site"
          type="text"
          {...register("location.site")}
          className="input w-full"
          placeholder="Building A"
        />
      </div>

      <div>
        <label
          htmlFor="location-floor"
          className="block text-sm font-medium mb-1"
        >
          {t("config.locationFloor")}
        </label>
        <input
          id="location-floor"
          type="number"
          {...register("location.floor")}
          className="input w-full"
          placeholder="1"
        />
      </div>

      <div>
        <label
          htmlFor="location-unit"
          className="block text-sm font-medium mb-1"
        >
          {t("config.locationUnit")}
        </label>
        <input
          id="location-unit"
          type="text"
          {...register("location.unit")}
          className="input w-full"
          placeholder="Room 101"
        />
      </div>

      <div>
        <TimezoneSelect register={register} setValue={setValue} />
      </div>
    </>
  );
}
