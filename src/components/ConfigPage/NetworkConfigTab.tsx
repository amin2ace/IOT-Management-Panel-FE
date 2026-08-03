import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SensorDto } from "@/api/models/device/SensorDto";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import { TextField, CheckboxField } from "@/components/UI/FormFields";

interface NetworkConfigTabProps {
  dhcpEnabled: boolean | undefined;
  activeDevice?: SensorDto;
}

type FormData = z.infer<typeof SensorConfigSchema>;

export default function NetworkConfigTab({
  dhcpEnabled,
  activeDevice,
}: NetworkConfigTabProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      role="tabpanel"
      id="network-panel"
      aria-labelledby="network-tab"
      className="space-y-4"
    >
      <TextField
        label={t("config.wifiSsid")}
        {...register("network.wifiSsid")}
        defaultValue={activeDevice?.configuration?.network?.wifiSsid}
        placeholder="Your WiFi network name"
        error={errors.network?.wifiSsid?.message}
      />

      <div className="relative">
        <TextField
          label={t("config.wifiPassword")}
          type={showPassword ? "text" : "password"}
          {...register("network.wifiPassword")}
          defaultValue={activeDevice?.configuration?.network?.wifiPassword}
          placeholder="Your WiFi password"
          error={errors.network?.wifiPassword?.message}
          className="pe-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute end-3 top-[34px] text-gray-400 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-500 dark:hover:text-gray-300"
          aria-label={
            showPassword
              ? t("common.hide", "Hide password")
              : t("common.show", "Show password")
          }
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      <CheckboxField
        label={t("config.dhcpEnabled")}
        {...register("network.dhcp")}
      />

      <AnimatePresence initial={false}>
        {!dhcpEnabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4 backdrop-blur-sm dark:border-gray-800 dark:bg-white/5">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("config.staticIpSettings")}
              </p>

              <TextField
                label={t("config.selectIP")}
                {...register("network.ip")}
                placeholder="192.168.1.100"
                error={errors.network?.ip?.message}
              />
              <TextField
                label={t("config.subnetMask")}
                {...register("network.subnetMask")}
                placeholder="255.255.255.0"
                error={errors.network?.subnetMask?.message}
              />
              <TextField
                label={t("config.gateway")}
                {...register("network.gateway")}
                placeholder="192.168.1.1"
                error={errors.network?.gateway?.message}
              />
              <TextField
                label={t("config.dns1")}
                {...register("network.dnsServer1")}
                placeholder="8.8.8.8"
                error={errors.network?.dnsServer1?.message}
              />
              <TextField
                label={t("config.dns2")}
                {...register("network.dnsServer2")}
                placeholder="8.8.4.4"
                error={errors.network?.dnsServer2?.message}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
