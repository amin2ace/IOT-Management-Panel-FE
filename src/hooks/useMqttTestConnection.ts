import { MqttConfigDto, MqttService } from "@/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useMqttTestConnection = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    status: "idle" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const testConnection = async (config: MqttConfigDto) => {
    setIsLoading(true);
    setResult({ status: "idle" });

    try {
      await MqttService.mqttManagementControllerTestConnection(config);
      setResult({
        status: "success",
        message: t("mqtt.connectionSuccess") || "Connection OK",
      });
    } catch (error) {
      setResult({
        status: "error",
        message: t("mqtt.connectionFailed") || "Connection failed",
      });
      console.error("Connection test failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    testConnection,
    isLoading,
    result,
  };
};
