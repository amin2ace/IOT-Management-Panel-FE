import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/api/axios";
import { DiscoveryResponse, Protocol, RequestMessageCode } from "@/types";

const schema = z.object({
  deviceId: z.string().min(1),
  wifiSsid: z.string().min(1),
  wifiPassword: z.string().min(1),
  dhcp: z.boolean(),
  ip: z.string().optional(),
  subnetMask: z.string().optional(),
  gateway: z.string().optional(),
  dnsServer1: z.string().optional(),
  dnsServer2: z.string().optional(),
  logLevel: z.string(),
  enableSerial: z.boolean(),
  buadrate: z.number().optional(),
  externalServer: z.string().optional(),
  otaEnabled: z.boolean(),
  otaUrl: z.string().optional(),
  site: z.string().optional(),
  floor: z.number().optional(),
  unit: z.string().optional(),
  timezone: z.string().optional(),
});

export default function ConfigPage() {
  const [devices, setDevices] = useState<DiscoveryResponse[]>([]);
  const [activeTab, setActiveTab] = useState<
    "network" | "logging" | "ota" | "location"
  >("network");
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { dhcp: true, enableSerial: true, otaEnabled: false },
  });
  const { register, handleSubmit, watch, reset } = methods;
  const dhcp = watch("dhcp");

  useEffect(() => {
    api.get("/device/all").then((res) => setDevices(res.data || []));
  }, []);

  const onSubmit = async (data: any) => {
    const payload = {
      userId: "admin",
      requestId: `req-cfg-${Math.floor(Math.random() * 1000)}`,
      requestCode: RequestMessageCode.SENSOR_CONFIGURATION,
      sensorId: data.deviceId,
      timestamp: Date.now(),
      network: {
        wifiSsid: data.wifiSsid,
        wifiPassword: data.wifiPassword,
        dhcp: data.dhcp,
        ip: data.ip,
        subnetMask: data.subnetMask,
        gateway: data.gateway,
        dnsServer1: data.dnsServer1,
        dnsServer2: data.dnsServer2,
      },
      logging: {
        level: data.logLevel,
        enableSerial: data.enableSerial,
        buadrate: data.buadrate,
        externalServer: data.externalServer,
      },
      ota: {
        enabled: data.otaEnabled,
        url: data.otaUrl,
      },
      location: {
        site: data.site,
        floor: data.floor,
        unit: data.unit,
      },
      protocol: Protocol.MQTT,
      timezone: data.timezone,
    };

    await api.post("/device/reconfigure", payload);
    alert("✅ Configuration sent to device");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-gray-100"
      >
        <h2 className="text-2xl font-semibold mb-4">Device Configuration</h2>

        {/* Device selector */}
        <div>
          <label className="block mb-2">Select Device</label>
          <select
            {...register("deviceId")}
            onChange={(e) => reset({ deviceId: e.target.value })}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Choose a device</option>
            {devices.map((d) => (
              <option key={d.sensorId} value={d.sensorId}>
                {d.sensorId}
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
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-indigo-500 text-indigo-400"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="mt-4 space-y-4">
          {activeTab === "network" && (
            <>
              <div>
                <label>Wi-Fi SSID</label>
                <input {...register("wifiSsid")} className="input" />
              </div>
              <div>
                <label>Wi-Fi Password</label>
                <input {...register("wifiPassword")} className="input" />
              </div>
              <div>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("dhcp")} />
                  DHCP Enabled
                </label>
              </div>
              {!dhcp && (
                <>
                  <div>
                    <label>Static IP</label>
                    <input {...register("ip")} className="input" />
                  </div>
                  <div>
                    <label>Subnet Mask</label>
                    <input {...register("subnetMask")} className="input" />
                  </div>
                  <div>
                    <label>Gateway</label>
                    <input {...register("gateway")} className="input" />
                  </div>
                  <div>
                    <label>DNS 1</label>
                    <input {...register("dnsServer1")} className="input" />
                  </div>
                  <div>
                    <label>DNS 2</label>
                    <input {...register("dnsServer2")} className="input" />
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "logging" && (
            <>
              <div>
                <label>Log Level</label>
                <select {...register("logLevel")} className="input">
                  <option value="DEBUG">DEBUG</option>
                  <option value="INFO">INFO</option>
                  <option value="WARN">WARN</option>
                  <option value="ERROR">ERROR</option>
                </select>
              </div>
              <div>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("enableSerial")} />
                  Enable Serial Output
                </label>
              </div>
              <div>
                <label>Baud Rate</label>
                <input
                  type="number"
                  {...register("buadrate")}
                  className="input"
                />
              </div>
              <div>
                <label>External Server</label>
                <input {...register("externalServer")} className="input" />
              </div>
            </>
          )}

          {activeTab === "ota" && (
            <>
              <div>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("otaEnabled")} />
                  Enable OTA Updates
                </label>
              </div>
              <div>
                <label>Firmware URL</label>
                <input {...register("otaUrl")} className="input" />
              </div>
            </>
          )}

          {activeTab === "location" && (
            <>
              <div>
                <label>Site</label>
                <input {...register("site")} className="input" />
              </div>
              <div>
                <label>Floor</label>
                <input type="number" {...register("floor")} className="input" />
              </div>
              <div>
                <label>Unit</label>
                <input {...register("unit")} className="input" />
              </div>
              <div>
                <label>Timezone</label>
                <input {...register("timezone")} className="input" />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Save Configuration
        </button>
      </form>
    </FormProvider>
  );
}
