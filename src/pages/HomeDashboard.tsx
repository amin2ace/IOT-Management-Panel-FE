import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Clock,
  Timer,
  Wifi,
  WifiOff,
  Radio,
  SlidersHorizontal,
  Cpu,
  MemoryStick,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { useDigitalClock12Hour } from "@/hooks/useDigitalClock";
import { useSystemMetrics } from "@/hooks/useSystemMetrics";
import StatCard, {
  statCardMotion,
  type StatVariant,
} from "@/components/Dashboard/StatCard";

const CPU_RAM_THRESHOLDS = { warning: 70, danger: 85 };

function usageVariant(value: number): StatVariant {
  if (value >= CPU_RAM_THRESHOLDS.danger) return "danger";
  if (value >= CPU_RAM_THRESHOLDS.warning) return "warning";
  return "success";
}

function countVariant(
  count: number,
  dangerLevel: StatVariant = "danger",
): StatVariant {
  return count > 0 ? dangerLevel : "success";
}

const containerMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function HomeDashboard() {
  const { t } = useTranslation();
  const currentTime = useDigitalClock12Hour();
  const metrics = useSystemMetrics();

  const isMqttConnected =
    metrics.mqttStatus?.toLowerCase().includes("connect") &&
    !metrics.mqttStatus?.toLowerCase().includes("disconnect");

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 start-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 end-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10"
      />
      <header className="mb-6 flex items-center justify-between">
        {" "}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t("dashboard.title1")}
        </h1>
      </header>

      <motion.section
        variants={containerMotion}
        initial="hidden"
        animate="visible"
        aria-live="polite"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6"
      >
        <StatCard
          title={t("dashboard.clock")}
          value={currentTime || "--"}
          icon={Clock}
          isLoading={!currentTime}
        />

        <StatCard
          title={t("dashboard.uptime")}
          value={metrics.uptime}
          icon={Timer}
          variant="success"
          isLoading={!metrics.uptime}
        />

        <StatCard
          title={t("dashboard.mqttStatus")}
          value={metrics.mqttStatus}
          icon={isMqttConnected ? Wifi : WifiOff}
          variant={isMqttConnected ? "success" : "danger"}
          isLoading={!metrics.mqttStatus}
        />

        <StatCard
          title={t("dashboard.connectedSensors")}
          value={metrics.connectedSensors}
          icon={Radio}
          isLoading={metrics.connectedSensors == null}
        />

        <StatCard
          title={t("dashboard.connectedControllers")}
          value="--"
          icon={SlidersHorizontal}
          isLoading
        />

        <StatCard
          title={t("dashboard.cpuUsage")}
          value={`${metrics.cpuUsage} %`}
          icon={Cpu}
          variant={usageVariant(metrics.cpuUsage)}
          progress={metrics.cpuUsage}
          isLoading={metrics.cpuUsage == null}
        />

        <StatCard
          title={t("dashboard.ramUsage")}
          value={`${metrics.memoryUsage} %`}
          icon={MemoryStick}
          variant={usageVariant(metrics.memoryUsage)}
          progress={metrics.memoryUsage}
          isLoading={metrics.memoryUsage == null}
        />

        <StatCard
          title={t("dashboard.errors")}
          value={metrics.errors}
          icon={AlertCircle}
          variant={countVariant(metrics.errors)}
          isLoading={metrics.errors == null}
        />

        <StatCard
          title={t("dashboard.warnings")}
          value={metrics.warnings}
          icon={AlertTriangle}
          variant={countVariant(metrics.warnings, "warning")}
          isLoading={metrics.warnings == null}
        />
      </motion.section>
    </div>
  );
}
