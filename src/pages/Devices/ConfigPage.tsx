import { useState } from "react";
import { useForm, FormProvider, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import DeviceSelector from "./components/DeviceSelector";
import ConfigTabsNavigation, {
  ConfigTabs,
} from "./components/ConfigTabsNavigation";
import NetworkConfigTab from "./components/NetworkConfigTab";
import LoggingConfigTab from "./components/LoggingConfigTab";
import OtaConfigTab from "./components/OtaConfigTab";
import LocationConfigTab from "./components/LocationConfigTab";
import { useLoadDevices } from "./hooks/useLoadDevices";
import { useConfigureDevice } from "./hooks/useConfigureDevice";

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

  const { handleSubmit, setValue, watch, reset, register } = methods;
  const dhcpEnabled = watch("network.dhcp");

  const handleSelectDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDevice = devices.find(
      (device) => device.deviceId === e.target.value
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

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dashboardConfigContainer"
      >
        <h2 className="text-2xl font-semibold mb-6">
          {t("config.deviceConfiguration")}
        </h2>

        {/* Device Selector */}
        <DeviceSelector
          devices={devices}
          register={register("deviceId")}
          onChange={handleSelectDevice}
        />

        {/* Configuration Tabs Navigation */}
        <ConfigTabsNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Contents */}
        <div className="mt-4 space-y-4">
          {activeTab === ConfigTabs.NETWORK && dhcpEnabled && (
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || devices.length === 0}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded font-medium transition-colors"
        >
          {isLoading ? t("common.loading") : t("config.saveConfigurations")}
        </button>
      </form>
    </FormProvider>
  );
}
