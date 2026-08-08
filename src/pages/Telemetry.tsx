import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Wifi,
  WifiOff,
  Download,
  Activity,
  LineChart as LineChartIcon,
  CircleDot,
} from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { TelemetryResponseDto } from "@/api/models/device/TelemetryResponseDto";
import MetricChartCard, {
  MetricData,
} from "@/components/Telemetry/MetricChartCard";
import LatestValuesPieCard from "@/components/Telemetry/LatestValuesPieCard";
import { exportTelemetryCsv } from "@/utils/exportTelemetryCsv";

export type { MetricData };

type ChartStyle = "line" | "dotLine";

export default function TelemetryPage() {
  const { t } = useTranslation();
  const { socket, isConnected } = useSocket();
  const [metrics, setMetrics] = useState<Record<string, MetricData>>({});
  const [chartStyle, setChartStyle] = useState<ChartStyle>("line");

  useEffect(() => {
    if (!socket) return;
    const handler = (data: TelemetryResponseDto) => {
      setMetrics((prev) => {
        const existing = prev[data.metric] ?? {
          metric: data.metric,
          values: [],
        };
        const vals = [
          ...existing.values,
          { timestamp: data.timestamp, value: data.value },
        ].slice(-30);
        return {
          ...prev,
          [data.metric]: { metric: data.metric, values: vals },
        };
      });
    };

    socket.on("telemetry-update", handler);
    return () => {
      socket.off("telemetry-update", handler);
    };
  }, [socket]);

  const hasData = Object.keys(metrics).length > 0;

  return (
    <div className="relative space-y-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t("path.telemetryTab")}
          </h1>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              isConnected
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {isConnected ? (
              <Wifi className="h-3.5 w-3.5" />
            ) : (
              <WifiOff className="h-3.5 w-3.5" />
            )}
            {isConnected ? t("mqtt.connected") : t("mqtt.disconnected")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart style toggle */}
          <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setChartStyle("line")}
              aria-pressed={chartStyle === "line"}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                chartStyle === "line"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <LineChartIcon className="h-3.5 w-3.5" />
              {t("telemetry.line", "Line")}
            </button>
            <button
              onClick={() => setChartStyle("dotLine")}
              aria-pressed={chartStyle === "dotLine"}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                chartStyle === "dotLine"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <CircleDot className="h-3.5 w-3.5" />
              {t("telemetry.dotLine", "Dot Line")}
            </button>
          </div>

          <motion.button
            onClick={() => exportTelemetryCsv(metrics)}
            disabled={!hasData}
            whileHover={hasData ? { y: -1 } : undefined}
            whileTap={hasData ? { scale: 0.98 } : undefined}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            <Download className="h-4 w-4" />
            {t("telemetry.export", "Export CSV")}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      {!hasData ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/40 bg-white/60 py-16 text-center shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
            <Activity className="h-6 w-6" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("telemetry.noData", "No telemetry data received yet")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <LatestValuesPieCard metrics={metrics} />
          {Object.values(metrics).map((m, i) => (
            <MetricChartCard
              key={m.metric}
              data={m}
              colorIndex={i}
              chartStyle={chartStyle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
