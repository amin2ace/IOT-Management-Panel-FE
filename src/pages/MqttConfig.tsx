import { useCallback, useEffect, useState } from "react";
import { MqttConfigDto, MqttService } from "@/api";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Wifi, WifiOff, Save, Zap, Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useMqttTestConnection } from "@/hooks/useMqttTestConnection";
import {
  TextField,
  SelectField,
  CheckboxField,
} from "@/components/UI/FormFields";

interface MqttConfiguration {
  host: string;
  port: number;
  protocol: string;
  clientId: string;
  keepalive: number;
  clean: boolean;
  autoReconnect: boolean;
  connectAttempts: number;
  maxConnectionAttempts: number;
  connected: boolean;
  timestamp: string;
}

export default function MqttConfigPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, getValues } =
    useForm<MqttConfiguration>();
  const {
    testConnection,
    isLoading: isTesting,
    result,
  } = useMqttTestConnection();

  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(
    null,
  );

  const fetchConfiguration = useCallback(async () => {
    try {
      const response = await MqttService.mqttManagementControllerGetConfig();
      if (response?.data) {
        reset(response.data);
        setConnectionStatus(response.data.connected);
      }
    } catch (err) {
      console.error("Failed to fetch MQTT configuration:", err);
      toast.error(t("mqtt.failedToFetchConfig"));
    }
  }, [reset, t]);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      await fetchConfiguration();
      setIsFetching(false);
    })();
  }, [fetchConfiguration]);

  const onSubmit = async (data: MqttConfiguration) => {
    setIsSaving(true);
    try {
      const updateConfig = {
        host: data.host,
        port: data.port,
        protocol: data.protocol,
        clientId: data.clientId,
        keepalive: data.keepalive,
        clean: data.clean,
        autoReconnect: data.autoReconnect,
      } as MqttConfigDto;

      await MqttService.mqttManagementControllerUpdateConfig(updateConfig);
      toast.success(t("mqtt.configUpdated"));
      await fetchConfiguration();
    } catch (err) {
      console.error("Failed to update configuration:", err);
      toast.error(t("mqtt.failedToUpdateConfig"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = () => {
    const config = {
      host: getValues("host") || "localhost",
      port: getValues("port") || 1883,
      protocol: getValues("protocol") || "mqtt",
      clientId: getValues("clientId") || "test-client",
    } as MqttConfigDto;
    testConnection(config);
  };

  return (
    <div className="relative space-y-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/70 pb-5 dark:border-gray-700/50">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t("mqtt.configuration")}
          </h1>
          <span
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
              connectionStatus
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {connectionStatus ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            {connectionStatus ? t("mqtt.connected") : t("mqtt.disconnected")}
          </span>
        </div>

        {isFetching ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500 dark:text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">{t("common.loading")}</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Basic Settings */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t("mqtt.basicSettings")}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  label={t("mqtt.host")}
                  {...register("host")}
                  placeholder="broker.example.com"
                />
                <TextField
                  type="number"
                  label={t("mqtt.port")}
                  {...register("port", { valueAsNumber: true })}
                  placeholder="1883"
                  min={1}
                  max={65535}
                />
                <SelectField
                  label={t("mqtt.protocol")}
                  {...register("protocol")}
                >
                  <option value="mqtt">MQTT</option>
                  <option value="modbus-tcp">Modbus-TCP</option>
                  <option value="modbus-rtu">Modbus-RTU</option>
                </SelectField>
                <TextField
                  label={t("mqtt.clientId")}
                  {...register("clientId")}
                  placeholder="client-123"
                />
              </div>
            </section>

            {/* Advanced Settings */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t("mqtt.advancedSettings")}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  type="number"
                  label={t("mqtt.keepalive")}
                  {...register("keepalive", { valueAsNumber: true })}
                  placeholder="60"
                  min={10}
                />
                <TextField
                  type="number"
                  label={t("mqtt.connectAttempts")}
                  {...register("connectAttempts", { valueAsNumber: true })}
                  disabled
                  hint={t("mqtt.readOnly")}
                />
                <CheckboxField
                  label={t("mqtt.cleanSession")}
                  {...register("clean")}
                />
                <CheckboxField
                  label={t("mqtt.autoReconnect")}
                  {...register("autoReconnect")}
                />
              </div>
            </section>

            {/* Connection Info */}
            <section className="rounded-xl border border-indigo-200/60 bg-indigo-50/60 p-4 backdrop-blur-sm dark:border-indigo-500/20 dark:bg-indigo-500/5">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-900 dark:text-indigo-300">
                <ShieldCheck className="h-4 w-4" />
                {t("mqtt.connectionInfo")}
              </p>
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {t("mqtt.maxConnectionAttempts")}:{" "}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getValues("maxConnectionAttempts")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {t("mqtt.status")}:{" "}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {connectionStatus
                      ? t("mqtt.connected")
                      : t("mqtt.disconnected")}
                  </span>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-gray-200/70 pt-6 dark:border-gray-700/50 sm:flex-row sm:items-center">
              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={!isSaving ? { y: -1 } : undefined}
                whileTap={!isSaving ? { scale: 0.98 } : undefined}
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? t("common.loading") : t("common.save")}
              </motion.button>

              <motion.button
                type="button"
                disabled={isTesting}
                onClick={handleTestConnection}
                whileHover={!isTesting ? { y: -1 } : undefined}
                whileTap={!isTesting ? { scale: 0.98 } : undefined}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {isTesting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                {isTesting ? t("common.loading") : t("mqtt.testConnection")}
              </motion.button>

              {result.status !== "idle" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    result.status === "success"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  }`}
                >
                  {result.message}
                </motion.span>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
