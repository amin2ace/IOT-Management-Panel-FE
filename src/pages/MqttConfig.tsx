// src/pages/Mqtt/MqttConfigPage.tsx
import { MqttConfigDto, MqttService } from "@/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMqttTestConnection } from "@/hooks/useMqttTestConnection";
import "@/styles/pages/mqttConfig.css";
import toast from "react-hot-toast";

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
  const { testConnection, isLoading, result } = useMqttTestConnection();
  const [isLoading_, setIsLoading_] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(
    null
  );

  // Fetch MQTT configuration on component mount
  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        setIsLoading_(true);
        setError(null);
        const response = await MqttService.mqttManagementControllerGetConfig();

        if (response && response.data) {
          reset(response.data);
          setConnectionStatus(response.data.connected);
        }
      } catch (err) {
        console.error("Failed to fetch MQTT configuration:", err);
        toast.error(
          t("mqtt.failedToFetchConfig") || "Failed to fetch configuration"
        );
      } finally {
        setIsLoading_(false);
      }
    };

    fetchConfiguration();
  }, [reset, t]);

  const onSubmit = async (data: MqttConfiguration) => {
    try {
      setIsLoading_(true);
      setError(null);
      setSuccess(null);

      // Prepare config object (exclude read-only fields)
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
      toast.success(
        t("mqtt.configUpdated") || "Configuration updated successfully"
      );

      // Refresh configuration after update
      const response = await MqttService.mqttManagementControllerGetConfig();
      if (response && response.data) {
        reset(response.data);
        setConnectionStatus(response.data.connected);
      }
    } catch (err) {
      console.error("Failed to update configuration:", err);
      toast.error(
        t("mqtt.failedToUpdateConfig") || "Failed to update configuration"
      );
    } finally {
      setIsLoading_(false);
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
    <div className="mqttConfigContainer">
      <header className="config-header">
        <div className="flex items-center justify-between">
          <h1>{t("mqtt.configuration")}</h1>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm pl-4 font-semibold ${
                connectionStatus
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {connectionStatus ? t("mqtt.connected") : t("mqtt.disconnected")}
            </span>
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus
                  ? "bg-green-600 dark:bg-green-400"
                  : "bg-red-600 dark:bg-red-400"
              }`}
            />
          </div>
        </div>
      </header>

      {error && <div className="mqtt-alert mqtt-alert-error">{error}</div>}

      {success && (
        <div className="mqtt-alert mqtt-alert-success">{success}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mqtt-form">
        {/* Basic Connection Settings */}
        <div className="mqtt-section">
          <h3 className="mqtt-section-title">
            {t("mqtt.basicSettings") || "Basic Settings"}
          </h3>
          <div className="mqtt-fields-grid">
            <div className="mqtt-field-group">
              <label>{t("mqtt.host")}</label>
              <input
                {...register("host")}
                type="text"
                placeholder="broker.example.com"
              />
            </div>
            <div className="mqtt-field-group">
              <label>{t("mqtt.port")}</label>
              <input
                type="number"
                {...register("port", { valueAsNumber: true })}
                placeholder="1883"
                min="1"
                max="65535"
              />
            </div>

            <div className="mqtt-field-group">
              <label>{t("mqtt.protocol")}</label>
              <select {...register("protocol")}>
                <option value="mqtt">MQTT</option>
                <option value="modbus-tcp">Modbus-TCP</option>
                <option value="modbus-rtu">Modbus-RTU</option>
              </select>
            </div>

            <div className="mqtt-field-group">
              <label>{t("mqtt.clientId")}</label>
              <input
                {...register("clientId")}
                type="text"
                placeholder="client-123"
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="mqtt-section">
          <h3 className="mqtt-section-title">
            {t("mqtt.advancedSettings") || "Advanced Settings"}
          </h3>
          <div className="mqtt-fields-grid">
            <div className="mqtt-field-group">
              <label>{t("mqtt.keepalive") || "Keep Alive"}</label>
              <input
                type="number"
                {...register("keepalive", { valueAsNumber: true })}
                placeholder="60"
                min="10"
              />
            </div>

            <div className="mqtt-field-group">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("clean")}
                  className="w-4 h-4 rounded"
                />
                <span>{t("mqtt.cleanSession") || "Clean Session"}</span>
              </label>
            </div>

            <div className="mqtt-field-group">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("autoReconnect")}
                  className="w-4 h-4 rounded"
                />
                <span>{t("mqtt.autoReconnect") || "Auto Reconnect"}</span>
              </label>
            </div>

            <div className="mqtt-field-group">
              <label>
                {t("mqtt.connectAttempts") || "Connection Attempts"}
              </label>
              <input
                type="number"
                {...register("connectAttempts", { valueAsNumber: true })}
                placeholder="5"
                min="1"
                disabled
              />
              <span className="mqtt-help-text">
                {t("mqtt.readOnly") || "Read-only field"}
              </span>
            </div>
          </div>
        </div>

        {/* Connection Status Info */}
        <div className="mqtt-info-box">
          <p className="font-semibold mb-2">
            {t("mqtt.connectionInfo") || "Connection Information"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">
                {t("mqtt.maxConnectionAttempts") || "Max Attempts"}:
              </span>{" "}
              <span>{getValues("maxConnectionAttempts")}</span>
            </div>
            <div>
              <span className="font-medium">
                {t("mqtt.status") || "Status"}:
              </span>{" "}
              <span>
                {connectionStatus
                  ? t("mqtt.connected")
                  : t("mqtt.disconnected")}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mqtt-actions">
          <button
            type="submit"
            disabled={isLoading_}
            className="mqtt-button mqtt-button-save"
          >
            {isLoading_ ? t("common.loading") : t("common.save")}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleTestConnection}
            className="mqtt-button mqtt-button-test"
          >
            {isLoading ? t("common.loading") : t("mqtt.testConnection")}
          </button>

          {result.status !== "idle" && (
            <div
              className={`mqtt-result ${
                result.status === "success"
                  ? "mqtt-result-success"
                  : "mqtt-result-error"
              }`}
            >
              {result.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
