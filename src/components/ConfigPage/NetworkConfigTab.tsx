import { useFormContext } from "react-hook-form";
import { SensorDto } from "@/api/models/device/SensorDto";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";

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
  const { register } = useFormContext<FormData>();

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("config.wifiSsid")}
        </label>
        <input
          {...register("network.wifiSsid")}
          className="input w-full"
          defaultValue={activeDevice?.configuration?.network?.wifiSsid}
          placeholder="Your WiFi network name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("config.wifiPassword")}
        </label>
        <input
          type="password"
          {...register("network.wifiPassword")}
          className="input w-full"
          defaultValue={activeDevice?.configuration?.network?.wifiPassword}
          placeholder="Your WiFi password"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="dhcp-toggle"
          {...register("network.dhcp")}
          className="w-4 h-4"
        />
        <label
          htmlFor="dhcp-toggle"
          className="text-sm font-medium cursor-pointer"
        >
          {t("config.dhcpEnabled")}
        </label>
      </div>

      {!dhcpEnabled && (
        <div className="mt-4 p-4 bg-gray-800 rounded space-y-4">
          <p className="text-sm text-gray-400 mb-4">
            {t("config.staticIpSettings")}
          </p>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("config.selectIP")}
            </label>
            <input
              type="text"
              {...register("network.ip")}
              className="input w-full"
              placeholder="192.168.1.100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("config.subnetMask")}
            </label>
            <input
              type="text"
              {...register("network.subnetMask")}
              className="input w-full"
              placeholder="255.255.255.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("config.gateway")}
            </label>
            <input
              type="text"
              {...register("network.gateway")}
              className="input w-full"
              placeholder="192.168.1.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("config.dns1")}
            </label>
            <input
              type="text"
              {...register("network.dnsServer1")}
              className="input w-full"
              placeholder="8.8.8.8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("config.dns2")}
            </label>
            <input
              type="text"
              {...register("network.dnsServer2")}
              className="input w-full"
              placeholder="8.8.4.4"
            />
          </div>
        </div>
      )}
    </>
  );
}
