import { ResponseDiscoveryDto } from "@/api/models/device/ResponseDiscoveryDto";
import {
  CapabilityColorMap,
  ConnectionStateColorMap,
  ProtocolColorMap,
} from "@/api/models/extra/ColorMaps";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  devices: ResponseDiscoveryDto[] | [];
};

export default function DevicesResultTable({ devices }: Props) {
  const { t } = useTranslation();

  if (devices.length === 0)
    return (
      <div className="text-gray-400 italic text-center py-6">
        {t("discovery.noDevicesDiscoveredYet")}
      </div>
    );

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {t("discovery.discoveredDevices")}
      </h2>
      <button>clear</button>

      {/* Scroll wrapper */}
      <div className="overflow-auto max-h-[500px] overscroll-contain rounded-lg">
        <table className="min-w-[1200px] w-full text-sm text-gray-200">
          <thead className="sticky top-0 bg-black backdrop-blur-md">
            <tr>
              <th className="px-4 py-3 text-left">Device ID</th>
              <th className="px-4 py-3 text-left">Hardware</th>
              <th className="px-4 py-3 text-left">Capabilities</th>
              <th className="px-4 py-3 text-left">MAC</th>
              <th className="px-4 py-3 text-left">IP</th>
              <th className="px-4 py-3 text-left">Connection</th>
              <th className="px-4 py-3 text-left">Protocol</th>
              <th className="px-4 py-3 text-left">Topic Prefix</th>
              <th className="px-4 py-3 text-left">Firmware</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Broker</th>
              <th className="px-4 py-3 text-left">Additional Info</th>
              <th className="px-4 py-3 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device, index) => (
              <tr
                key={index}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3">
                  {device.sensorData?.deviceId || index}
                </td>
                <td className="px-4 py-3">
                  {device.sensorData?.deviceHardware}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {device?.sensorData?.capabilities?.map((c: string) => {
                      const colorClass =
                        CapabilityColorMap[c] || CapabilityColorMap.default;

                      return (
                        <span
                          key={c}
                          className={`px-2 py-1 rounded-md text-[11px] ${colorClass}`}
                        >
                          {c}
                        </span>
                      );
                    })}
                  </div>{" "}
                </td>

                <td className="px-4 py-3">
                  {device.sensorData?.configuration.network?.mac}
                </td>
                <td className="px-4 py-3">
                  {device.sensorData?.configuration.network?.ip}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs 
      ${(device.sensorData && ConnectionStateColorMap[device.sensorData.connectionState]) || ConnectionStateColorMap.default}
    `}
                  >
                    {device.sensorData?.connectionState}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      (device.sensorData?.configuration.protocol &&
                        ProtocolColorMap[
                          device.sensorData?.configuration?.protocol
                        ]) ||
                      ProtocolColorMap.default
                    }`}
                  >
                    {device.sensorData?.configuration.protocol}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {device.sensorData?.configuration.baseTopic}
                </td>
                <td className="px-4 py-3">{device.sensorData?.firmware}</td>

                <td className="px-4 py-3">
                  <pre className="bg-black/30 p-2 rounded-md text-xs">
                    {JSON.stringify(
                      device.sensorData?.configuration.location,
                      null,
                      2
                    )}
                  </pre>
                </td>

                <td className="px-4 py-3">{device.sensorData?.broker}</td>

                <td className="px-4 py-3">
                  <pre className="bg-black/30 p-2 rounded-md text-xs">
                    {JSON.stringify(device.additionalInfo, null, 2)}
                  </pre>
                </td>

                <td className="px-4 py-3">
                  {new Date(device.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
