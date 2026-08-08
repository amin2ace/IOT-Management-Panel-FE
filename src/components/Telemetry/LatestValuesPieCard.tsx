import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { PieChartIcon } from "lucide-react";
import { MetricData } from "./MetricChartCard";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

export default function LatestValuesPieCard({
  metrics,
}: {
  metrics: Record<string, MetricData>;
}) {
  const { t } = useTranslation();

  const data = Object.values(metrics)
    .map((m) => ({ name: m.metric, value: m.values.at(-1)?.value ?? 0 }))
    .filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-5"
    >
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
        <PieChartIcon className="h-4 w-4 text-indigo-500" />
        {t("telemetry.overview", "Latest Values Overview")}
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={75}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
