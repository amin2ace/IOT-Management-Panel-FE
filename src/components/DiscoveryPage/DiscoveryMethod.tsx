import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Target, Loader2, Cpu } from "lucide-react";
import { TextField } from "@/components/UI/FormFields";

enum DiscoverMethod {
  BROADCAST = "Broadcast",
  UNICAST = "Unicast",
}

type UnicastFormData = {
  deviceId: string;
};

type Props = {
  loading: boolean;
  onBroadcast: () => Promise<void>;
  onUnicast: (data: UnicastFormData) => Promise<void>;
  submit?: UseFormHandleSubmit<UnicastFormData>;
  register?: UseFormRegister<UnicastFormData>;
};

export default function DiscoveryMethod({
  loading,
  onBroadcast,
  onUnicast,
  submit,
  register,
}: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<DiscoverMethod>(
    DiscoverMethod.BROADCAST,
  );

  const tabs = [
    {
      id: DiscoverMethod.BROADCAST,
      label: t("discovery.broadcast"),
      icon: Radio,
    },
    { id: DiscoverMethod.UNICAST, label: t("discovery.unicast"), icon: Target },
  ];

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
      {/* Tab Navigation */}
      <div
        role="tablist"
        className="flex gap-1 border-b border-gray-200 px-4 pt-3 dark:border-gray-800"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="discovery-tab-indicator"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === DiscoverMethod.BROADCAST && (
            <motion.div
              key="broadcast"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("discovery.broadcastTitle")}
              </p>
              <motion.button
                onClick={onBroadcast}
                disabled={loading}
                whileHover={!loading ? { y: -1 } : undefined}
                whileTap={!loading ? { scale: 0.98 } : undefined}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Radio className="h-4 w-4" />
                )}
                {loading
                  ? t("common.sending")
                  : t("discovery.broadcastDiscover")}
              </motion.button>
            </motion.div>
          )}

          {activeTab === DiscoverMethod.UNICAST && (
            <motion.div
              key="unicast"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("discovery.unicastTitle")}
              </p>
              {submit && register ? (
                <form
                  onSubmit={submit(onUnicast)}
                  className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end"
                >
                  <div className="flex-1 sm:max-w-xs">
                    <TextField
                      {...register("deviceId")}
                      icon={Cpu}
                      label={t("discovery.enterDeviceId")}
                      placeholder="e.g. sensor-042"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { y: -1 } : undefined}
                    whileTap={!loading ? { scale: 0.98 } : undefined}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Target className="h-4 w-4" />
                    )}
                    {loading
                      ? t("common.sending")
                      : t("discovery.unicastDiscover")}
                  </motion.button>
                </form>
              ) : (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {t("discovery.formMissConfig")}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
