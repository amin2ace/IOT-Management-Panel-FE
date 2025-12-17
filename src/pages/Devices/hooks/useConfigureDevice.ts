import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { DevicesService } from "@/api";
import { SensorConfigDto } from "@/api/models/device/SensorConfigDto";
import { z } from "zod";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";

type FormData = z.infer<typeof SensorConfigSchema>;

/**
 * Hook to handle device configuration submission
 * Handles validation and API calls
 */
export function useConfigureDevice() {
  const { t } = useTranslation();

  const submitConfiguration = async (data: FormData) => {
    const payload: SensorConfigDto = {
      deviceId: data.deviceId,
      baseTopic: data.baseTopic,
      threshold: data.threshold,
      configVersion: data.configVersion,
      interval: data.interval,
      network: {
        mac: data.network?.mac,
        wifiSsid: data.network?.wifiSsid ?? "null",
        wifiPassword: data.network?.wifiPassword ?? "null",
        dhcp: data.network?.dhcp,
        ip: data.network?.ip,
        subnetMask: data.network?.subnetMask,
        gateway: data.network?.gateway,
        dnsServer1: data.network?.dnsServer1,
        dnsServer2: data.network?.dnsServer2,
        accessPointSsid: data.network?.accessPointSsid || "null",
        accessPointPassword: data.network?.accessPointPassword || "null",
      },
      logging: {
        level: data.logging?.level,
        enableSerial: data.logging?.enableSerial,
        buadrate: data.logging?.buadrate,
        externalServer: data.logging?.externalServer,
      },
      ota: {
        enabled: data.ota?.enabled,
        url: data.ota?.url,
        checkInterval: data.ota?.checkInterval,
      },
      location: {
        site: data.location?.site,
        floor: data.location?.floor,
        unit: data.location?.unit,
      },
      protocol: data.protocol,
      timezone: data.timezone,
    };

    try {
      await DevicesService.deviceControllerReconfigureDevice(payload);
      toast.success(t("config.configurationSentToDevice"));
      return { success: true };
    } catch (error) {
      toast.error(t("config.configurationSentError"));
      console.error(error);
      return { success: false, error };
    }
  };

  return { submitConfiguration };
}
