import { useState } from "react";
import { useForm, FormProvider, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Save } from "lucide-react";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import DeviceSelector from "../../components/ConfigPage/DeviceSelector";
import ConfigTabsNavigation, {
  ConfigTabs,
} from "../../components/ConfigPage/ConfigTabsNavigation";
import NetworkConfigTab from "../../components/ConfigPage/NetworkConfigTab";
import LoggingConfigTab from "../../components/ConfigPage/LoggingConfigTab";
import OtaConfigTab from "../../components/ConfigPage/OtaConfigTab";
import LocationConfigTab from "../../components/ConfigPage/LocationConfigTab";
import { useLoadDevices } from "../../hooks/useLoadDevices";
import { useConfigureDevice } from "../../hooks/useConfigureDevice";

type FormData = z.infer<typeof SensorConfigSchema>;

export default function ConfigPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { devices, isLoading } = useLoadDevices();
  const { submitConfiguration } = useConfigureDevice();

  const [activeDevice, setActiveDevice] = useState<(typeof devices)[0]>();
  const [activeTab, setActiveTab] = useState<ConfigTabs>(ConfigTabs.NETWORK);

  const methods = useForm<FormData>({
    resolver: zodResolver(SensorConfigSchema) as Resolver<FormData>,
    defaultValues: {
      network: { dhcp: true },
      logging: { enableSerial: true },
      ota: { enabled: false },
    },
    mode: "onBlur",
  });

  const { handleSubmit, setValue, watch, reset, register, formState } = methods;
  const { errors, isSubmitting } = formState;
  const dhcpEnabled = watch("network.dhcp");

  const handleSelectDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDevice = devices.find(
      (device) => device.deviceId === e.target.value,
    );
    setActiveDevice(selectedDevice);
    reset({ deviceId: e.target.value });
  };

  const onSubmit = async (data: FormData) => {
    const result = await submitConfiguration(data);
    if (result.success) {
      setTimeout(() => navigate("/devices/configure"), 500);
    }
  };

  const isSaveDisabled = isLoading || isSubmitting || devices.length === 0;

  return (
    <FormProvider {...methods}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-8"
        >
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            {t("config.deviceConfiguration")}
          </h2>

          <DeviceSelector
            devices={devices}
            register={register("deviceId")}
            onChange={handleSelectDevice}
            error={errors.deviceId?.message}
          />

          <ConfigTabsNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                {activeTab === ConfigTabs.NETWORK && (
                  <NetworkConfigTab
                    dhcpEnabled={dhcpEnabled}
                    activeDevice={activeDevice}
                  />
                )}
                {activeTab === ConfigTabs.LOGGING && <LoggingConfigTab />}
                {activeTab === ConfigTabs.OTA && <OtaConfigTab />}
                {activeTab === ConfigTabs.LOCATION && (
                  <LocationConfigTab setValue={setValue} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            disabled={isSaveDisabled}
            whileHover={!isSaveDisabled ? { y: -1 } : undefined}
            whileTap={!isSaveDisabled ? { scale: 0.98 } : undefined}
            className="mt-8 flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isLoading ? t("common.loading") : t("config.saveConfigurations")}
          </motion.button>
        </form>
      </div>
    </FormProvider>
  );
}
