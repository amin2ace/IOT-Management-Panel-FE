import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Activity } from "lucide-react";

export interface MetricData {
  metric: string;
  values: { timestamp: number; value: number }[];
}

type ChartStyle = "line" | "dotLine";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

export default function MetricChartCard({
  data,
  colorIndex,
  chartStyle,
}: {
  data: MetricData;
  colorIndex: number;
  chartStyle: ChartStyle;
}) {
  const { t } = useTranslation();
  const color = COLORS[colorIndex % COLORS.length];
  const latest = data.values.at(-1)?.value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold capitalize text-gray-900 dark:text-white">
          <Activity className="h-4 w-4" style={{ color }} />
          {data.metric}
        </h3>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {t("telemetry.latest", "Latest")}: {latest ?? "—"}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data.values}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-200 dark:stroke-gray-700"
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
            tick={{ fontSize: 11 }}
            className="fill-gray-500 dark:fill-gray-400"
          />
          <YAxis
            tick={{ fontSize: 11 }}
            className="fill-gray-500 dark:fill-gray-400"
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
            labelFormatter={(ts) => new Date(ts as number).toLocaleTimeString()}
          />
          <Line
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={chartStyle === "dotLine" ? { r: 3, fill: color } : false}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
