import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevicesService } from "@/api";
import TimezoneSelect from "@/components/TimeZoneSelect";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { GetAllDevicesDto } from "@/api/models/device/QueryAllDevicesDto";
import { useTranslation } from "react-i18next";
import { redirect } from "react-router-dom";
import { SensorConfigDto } from "@/api/models/device/SensorConfigDto";
import { SensorConfigSchema } from "@/schema/SensorConfigSchema";
import { SensorDto } from "@/api/models/device/SensorDto";

// const schema = z.object({
//   deviceId: z.string().min(1, "Device is required"),
//   network: z
//     .object({
//       mac: z.string().optional().default("null"),
//       wifiSsid: z.string().optional().default("null"),
//       wifiPassword: z.string().optional().default("null"),
//       dhcp: z.boolean().optional().default(true),
//       ip: z.string().optional().default("null"),
//       subnetMask: z.string().optional().default("null"),
//       gateway: z.string().optional().default("null"),
//       dnsServer1: z.string().optional().default("null"),
//       dnsServer2: z.string().optional().default("null"),
//       accessPointSsid: z.string().optional().default("null"),
//       accessPointPassword: z.string().optional().default("null"),
//     })
//     .superRefine((net, ctx) => {
//       if (net.dhcp === false) {
//         if (!net.ip) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             path: ["ip"],
//             message: "Static IP is required when DHCP is disabled",
//           });
//         }
//         if (!net.subnetMask) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             path: ["subnetMask"],
//             message: "Subnet mask is required when DHCP is disabled",
//           });
//         }
//         if (!net.gateway) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             path: ["gateway"],
//             message: "Gateway is required when DHCP is disabled",
//           });
//         }
//       }
//     }),
//   logging: z
//     .object({
//       level: z.enum(LogLevel).optional().default(LogLevel.ERROR),
//       enableSerial: z.boolean().optional().default(true),
//       buadrate: z.number().int().optional().default(1000),
//       externalServer: z.string().optional().default("null"),
//     })
//     .optional(),
//   ota: z
//     .object({
//       enabled: z.boolean().optional().default(false),
//       url: z.string().url().optional().default("null"),
//       checkInterval: z.number().optional().default(-1),
//     })
//     .optional(),
//   location: z
//     .object({
//       site: z.string().optional().default("null"),
//       floor: z.number().int().optional().default(-1),
//       unit: z.string().optional().default("null"),
//     })
//     .optional(),
//   protocol: z.enum(Protocol).optional().default(Protocol.MQTT),
//   timezone: z.string().optional().default("null"),
// });

enum ConfigTabs {
  "NETWORK" = "network",
  "LOGGING" = "logging",
  "OTA" = "ota",
  "LOCATION" = "location",
}

// Component: Sensor Configuration Page 'READ_ONLY'
export default function ConfigPage() {
  const [devices, setDevices] = useState<SensorDto[]>([]);
  const { socket } = useSocket();
  const { t } = useTranslation();

  const [activeDevice, setActiveDevice] = useState<SensorDto>();
  const [activeTab, setActiveTab] = useState<ConfigTabs>(ConfigTabs.NETWORK);
  const methods = useForm({
    resolver: zodResolver(SensorConfigSchema),
    defaultValues: {
      network: { dhcp: true },
      logging: { enableSerial: true },
      ota: { enabled: false },
    },
  });
  const { register, handleSubmit, setValue, watch, reset } = methods;
  const dhcp = watch("network.dhcp");

  useEffect(() => {
    // useDevices()
    if (!socket) return;

    const listener = (res: GetAllDevicesDto) => {
      console.log({ res });
      if (!res) {
        toast.error(t("config.getAllSensorsError"));
        return;
      }
      toast.success(t("config.getAllSensorsSuccess"));
      setDevices((old) => [...old, ...res.data]);
    };
    socket.emit("react/message/query/devices/all/request");
    socket.on("ws/message/query/devices/all/response", listener);
  }, [socket]);

  const handleSelectDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveDevice(
      devices.find((device) => device.deviceId === e.target.value)
    );
    reset({ deviceId: e.target.value });
  };
  const onSubmit = async (data: z.infer<typeof SensorConfigSchema>) => {
    console.log({ activeDevice, devices });
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
      redirect("/devices/configure");
    } catch (error) {
      toast.error(t("config.configurationSentError"));
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dashboardConfigContainer"
      >
        <h2 className=" text-2xl font-semibold mb-4">
          {t("config.deviceConfiguration")}
        </h2>

        {/* Device selector */}
        <div>
          <label className="block mb-2">{t("config.selectDevice")}</label>
          <select
            {...register("deviceId")}
            onChange={handleSelectDevice}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">{t("config.chooseDevice")}</option>
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.deviceId}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 flex gap-4 mt-6">
          {["network", "logging", "ota", "location"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab as ConfigTabs)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-indigo-500 text-indigo-400"
                  : "text-gray-400"
              }`}
            >
              {t(`config.tab.${tab}`)}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="mt-4 space-y-4">
          {activeTab === "network" && (
            <>
              <div>
                <label>{t("config.wifiSsid")}</label>
                <input
                  {...register("network.wifiSsid")}
                  className="input"
                  defaultValue={activeDevice?.configuration?.network?.wifiSsid}
                />
              </div>
              <div>
                <label>{t("config.wifiPassword")}</label>
                <input
                  {...register("network.wifiPassword")}
                  className="input"
                  defaultValue={
                    activeDevice?.configuration?.network?.wifiPassword
                  }
                />
              </div>
              <div>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("network.dhcp")} />{" "}
                  {t("config.dhcpEnabled")}
                </label>
              </div>
              {!dhcp && (
                <>
                  <div>
                    <label>{t("config.selectIP")}</label>
                    <input {...register("network.ip")} className="input" />
                  </div>
                  <div>
                    <label>{t("config.subnetMask")}</label>
                    <input
                      {...register("network.subnetMask")}
                      className="input"
                    />
                  </div>
                  <div>
                    <label>{t("config.gateway")}</label>
                    <input {...register("network.gateway")} className="input" />
                  </div>
                  <div>
                    <label>{t("config.dns1")}</label>
                    <input
                      {...register("network.dnsServer1")}
                      className="input"
                    />
                  </div>
                  <div>
                    <label>{t("config.dns2")}</label>
                    <input
                      {...register("network.dnsServer2")}
                      className="input"
                    />
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "logging" && (
            <>
              <div>
                <label>{t("config.logLevel")}</label>
                <select {...register("logging.level")} className="input">
                  <option value="DEBUG">DEBUG</option>
                  <option value="INFO">INFO</option>
                  <option value="WARN">WARN</option>
                  <option value="ERROR">ERROR</option>
                </select>
              </div>
              <div>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("ota.enabled")} />
                  {t("config.enableSerialOutput")}
                </label>
              </div>
              <div>
                <label>{t("config.buadRate")}</label>
                <input
                  type="number"
                  {...register("logging.buadrate")}
                  className="input"
                />
              </div>
              <div>
                <label>{t("config.externalServer")}</label>
                <input
                  {...register("logging.externalServer")}
                  className="input"
                />
              </div>
            </>
          )}

          {activeTab === "ota" && (
            <>
              <div>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("ota.enabled")} />
                  {t("config.enableOtaUpdates")}
                </label>
              </div>
              <div>
                <label>{t("config.firmwareUrl")}</label>
                <input {...register("ota.url")} className="input" />
              </div>
            </>
          )}

          {activeTab === "location" && (
            <>
              <div>
                <label>{t("config.locationSite")}</label>
                <input {...register("location.site")} className="input" />
              </div>
              <div>
                <label>{t("config.locationFloor")}</label>
                <input
                  type="number"
                  {...register("location.floor")}
                  className="input"
                />
              </div>
              <div>
                <label>{t("config.locationUnit")}</label>
                <input {...register("location.unit")} className="input" />
              </div>
              <div>
                <TimezoneSelect register={register} setValue={setValue} />{" "}
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          {t("config.saveConfigurations")}
        </button>
      </form>
    </FormProvider>
  );
}
