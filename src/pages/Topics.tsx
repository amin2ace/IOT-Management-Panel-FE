import { TopicsService } from "@/api";
import type { TopicDto } from "@/api/models/Mqtt/TopicDto";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Radio, Loader2, MonitorSmartphone } from "lucide-react";
import { SensorDto } from "@/api/models/device/SensorDto";
import DeviceSelector from "@/components/ConfigPage/DeviceSelector";
import { useLoadDevices } from "@/hooks/useLoadDevices";

export default function TopicsPage() {
  const { t } = useTranslation();
  const { register } = useForm();
  const { devices } = useLoadDevices(); // TODO: confirm with backend team — this can hang indefinitely under some conditions
  const [selectedDevice, setSelectedDevice] = useState<SensorDto | null>(null);
  const [deviceTopics, setDeviceTopics] = useState<TopicDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Guards against a race where an earlier device's response resolves after
  // a later selection and silently overwrites the currently-displayed topics.
  const requestIdRef = useRef(0);

  const handleSelectDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    const currentRequestId = ++requestIdRef.current;

    if (!deviceId) {
      setSelectedDevice(null);
      setDeviceTopics([]);
      return;
    }

    const device = devices.find((d) => d.deviceId === deviceId);
    setSelectedDevice(device || null);
    setIsLoading(true);

    TopicsService.topicControllerGetDeviceTopicsByDeviceId(deviceId)
      .then((topics) => {
        if (requestIdRef.current !== currentRequestId) return; // stale response, ignore
        setDeviceTopics(topics || []);
      })
      .catch((err) => {
        if (requestIdRef.current !== currentRequestId) return;
        console.error("Failed to fetch device topics", err);
        setDeviceTopics([]);
      })
      .finally(() => {
        if (requestIdRef.current !== currentRequestId) return;
        setIsLoading(false);
      });
  };

  return (
    <div className="relative space-y-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {t("topic.topics")}
      </h1>

      <div className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-6">
        <div className="max-w-sm">
          <DeviceSelector
            devices={devices}
            register={register("deviceId")}
            onChange={handleSelectDevice}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/40 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
        {!selectedDevice ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              <MonitorSmartphone className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("topic.selectDeviceMessage")}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500 dark:text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">{t("common.loading")}</span>
          </div>
        ) : deviceTopics.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              <Radio className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("topic.noDeviceTopics")}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    {t("topic.topic")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    {t("topic.brokerUrl")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    {t("topic.useCase")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    {t("topic.subscribed")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
                  >
                    {t("topic.createdAt")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {deviceTopics.map((topic) => (
                  <motion.tr
                    key={`${topic.deviceId}-${topic.topic}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-gray-900 dark:text-white">
                      {topic.topic}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {topic.brokerUrl}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                        {topic.useCase}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          topic.isSubscribed
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {topic.isSubscribed ? t("common.yes") : t("common.no")}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(topic.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
