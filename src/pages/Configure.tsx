// src/pages/Configure/ConfigurePage.tsx
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DeviceService } from "@/api/services/deviceService";
import type { MqttConfigDto, SensorConfigRequestDto } from "@/api/models";

const schema = z.object({
  sensorId: z.string().min(1),
  wifiSsid: z.string().min(1),
  wifiPassword: z.string().min(1),
  dhcp: z.boolean(),
  ip: z.string().optional(),
  subnetMask: z.string().optional(),
  gateway: z.string().optional(),
  dnsServer1: z.string().optional(),
  dnsServer2: z.string().optional(),
  logLevel: z.number().optional(),
  enableSerial: z.boolean().optional(),
  buadrate: z.number().optional(),
  externalServer: z.string().optional(),
  otaEnabled: z.boolean().optional(),
  otaUrl: z.string().optional(),
  site: z.string().optional(),
  floor: z.number().optional(),
  unit: z.string().optional(),
  timezone: z.string().optional(),
});

export default function ConfigurePage() {
  const methods = useForm({ resolver: zodResolver(schema) });
  const { register, handleSubmit, watch } = methods;
  const [devices, setDevices] = useState<{ deviceId: string }[]>([]);
  const dhcp = watch("dhcp");

  useEffect(() => {
    DeviceService.getSensors().then((r) => setDevices(r.data || []));
  }, []);

  const onSubmit = async (data: any) => {
    const payload: SensorConfigRequestDto = {
      userId: "ui-user",
      requestId: crypto.randomUUID(),
      requestCode: 102,
      sensorId: data.sensorId,
      timestamp: Date.now(),
      baseTopic: `sensors/${data.sensorId}`,
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
        level: data.logLevel ?? 2,
        enableSerial: data.enableSerial ?? true,
        buadrate: data.buadrate,
        externalServer: data.externalServer,
      },
      ota: { enabled: data.otaEnabled ?? false, url: data.otaUrl },
      interval: 5000,
      location: { site: data.site, floor: data.floor, unit: data.unit },
      protocol: "MQTT",
      apSsid: data.apSsid,
      apPassword: data.apPassword,
      configVersion: 1,
    };

    try {
      await DeviceService.reconfigureDevice(payload);
      alert("Configuration published");
    } catch (err) {
      console.error(err);
      alert("Failed to publish configuration");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-2xl font-semibold">Configure Device</h1>

        <div>
          <label className="block mb-2">Select Device</label>
          <select
            {...register("sensorId")}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Choose</option>
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.deviceId}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>WiFi SSID</label>
            <input {...register("wifiSsid")} className="input" />
          </div>
          <div>
            <label>WiFi Password</label>
            <input {...register("wifiPassword")} className="input" />
          </div>
          <div className="col-span-1">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("dhcp")} />
              DHCP
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
            </>
          )}
        </div>

        <button className="px-4 py-2 bg-indigo-600 rounded">
          Save Configuration
        </button>
      </form>
    </FormProvider>
  );
}
