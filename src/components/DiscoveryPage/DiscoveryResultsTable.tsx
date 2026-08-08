import { DiscoveryResponseDto } from "@/api/models/device/ResponseDiscoveryDto";
import {
  CapabilityColorMap,
  ConnectionStateColorMap,
  ProtocolColorMap,
} from "@/api/models/extra/ColorMaps";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { RadarIcon, Trash2, Loader2 } from "lucide-react";

type Props = {
  devices: DiscoveryResponseDto[] | [];
  onClear?: () => void;
  isDiscovering?: boolean;
};

const columns = [
  "deviceId",
  "hardware",
  "capabilities",
  "mac",
  "ip",
  "connection",
  "protocol",
  "topicPrefix",
  "firmware",
  "location",
  "broker",
  "additionalInfo",
  "timestamp",
] as const;

export default function DevicesResultTable({
  devices,
  onClear,
  isDiscovering,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("discovery.discoveredDevices")}
          </h2>
          {devices.length > 0 && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              {devices.length}
            </span>
          )}
          {isDiscovering && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              <Loader2 className="h-3 w-3 animate-spin" />
              {t("discovery.scanning", "Scanning...")}
            </span>
          )}
        </div>

        {devices.length > 0 && onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t("discovery.clear", "Clear")}
          </button>
        )}
      </div>

      {devices.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
            <RadarIcon className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("discovery.noDevicesDiscoveredYet")}
          </p>
        </div>
      ) : (
        <div
          className="overflow-auto rounded-xl border border-gray-200 dark:border-gray-800"
          style={{ maxHeight: 520 }}
        >
          <table className="w-full min-w-[1300px] text-sm">
            <thead className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm dark:bg-gray-900/95">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className={`whitespace-nowrap px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 ${
                      col === "deviceId"
                        ? "sticky start-0 z-30 bg-gray-50/95 dark:bg-gray-900/95"
                        : ""
                    }`}
                  >
                    {t(`discovery.table.${col}`)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {devices.map((device, index) => (
                <motion.tr
                  key={device.sensorData?.deviceId ?? index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <td className="sticky start-0 z-10 bg-white px-4 py-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
                    {device.sensorData?.deviceId || index}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {device.sensorData?.deviceHardware}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {device?.sensorData?.capabilities?.map((c: string) => {
                        const colorClass =
                          CapabilityColorMap[c] || CapabilityColorMap.default;
                        return (
                          <span
                            key={c}
                            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${colorClass}`}
                          >
                            {c}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                    {device.sensorData?.configuration.network?.mac}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                    {device.sensorData?.configuration.network?.ip}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        (device.sensorData &&
                          ConnectionStateColorMap[
                            device.sensorData.connectionState
                          ]) ||
                        ConnectionStateColorMap.default
                      }`}
                    >
                      {device.sensorData?.connectionState}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
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
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                    {device.sensorData?.configuration.baseTopic}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-300">
                    {device.sensorData?.firmware}
                  </td>

                  <td className="px-4 py-3">
                    <pre className="max-w-[220px] overflow-auto rounded-md bg-gray-100 p-2 font-mono text-[11px] text-gray-700 dark:bg-black/30 dark:text-gray-300">
                      {JSON.stringify(
                        device.sensorData?.configuration.location,
                        null,
                        2,
                      )}
                    </pre>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-300">
                    {device.sensorData?.broker}
                  </td>

                  <td className="px-4 py-3">
                    <pre className="max-w-[220px] overflow-auto rounded-md bg-gray-100 p-2 font-mono text-[11px] text-gray-700 dark:bg-black/30 dark:text-gray-300">
                      {JSON.stringify(device.additionalInfo, null, 2)}
                    </pre>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(device.timestamp).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
