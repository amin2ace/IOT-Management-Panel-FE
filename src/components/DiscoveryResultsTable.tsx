import { DiscoveryResponseDto } from "@/api/models/DiscoveryResponseDto";
import {
  CapabilityColorMap,
  ConnectionStateColorMap,
  ProtocolColorMap,
} from "@/api/models/ColorMaps";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  result: DiscoveryResponseDto | undefined;
};

export default function DevicesResultTable({ result }: Props) {
  const { t } = useTranslation();
  if (!result)
    return (
      <div className="text-gray-400 italic text-center py-6">
        {t("noDevicesDiscoveredYet")}
      </div>
    );
  return (
    <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {t("discoveredDevices")}
      </h2>

      {/* Scroll wrapper */}
      <div className="overflow-auto max-h-[500px] overscroll-contain rounded-lg">
        <table className="min-w-[1200px] w-full text-sm text-gray-200">
          <thead className="sticky top-0 bg-black/40 backdrop-blur-md">
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
            <tr
              key={1}
              className="border-b border-white/10 hover:bg-white/5 transition"
            >
              <td className="px-4 py-3">{result.deviceId}</td>
              <td className="px-4 py-3">{result.deviceHardware}</td>

              <td className="px-4 py-3">
                <div className="flex gap-1 flex-wrap">
                  {result?.capabilities?.map((c: string) => {
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

              <td className="px-4 py-3">{result.mac}</td>
              <td className="px-4 py-3">{result.ip}</td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-md text-xs 
      ${ConnectionStateColorMap[result.connectionState] || ConnectionStateColorMap.default}
    `}
                >
                  {result.connectionState}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    ProtocolColorMap[result.protocol] ||
                    ProtocolColorMap.default
                  }`}
                >
                  {result.protocol}
                </span>
              </td>
              <td className="px-4 py-3">{result.topicPrefix}</td>
              <td className="px-4 py-3">{result.firmware}</td>

              <td className="px-4 py-3">
                <pre className="bg-black/30 p-2 rounded-md text-xs">
                  {JSON.stringify(result.location, null, 2)}
                </pre>
              </td>

              <td className="px-4 py-3">{result.broker}</td>

              <td className="px-4 py-3">
                <pre className="bg-black/30 p-2 rounded-md text-xs">
                  {JSON.stringify(result.additionalInfo, null, 2)}
                </pre>
              </td>

              <td className="px-4 py-3">
                {new Date(result.timestamp).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
