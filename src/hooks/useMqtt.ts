import { MqttConfigDto, MqttPublishDto, MqttService } from "@/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useMqttConfig = () =>
  useQuery({
    queryKey: ["mqtt-config"],
    queryFn: async () => {
      const r = await MqttService.mqttManagementControllerGetConfig();
      return r.data;
    },
  });

export const useUpdateMqttConfig = () =>
  useMutation({
    mutationFn: (payload: MqttConfigDto) =>
      MqttService.mqttManagementControllerUpdateConfig(payload),
  });

export const usePublishMqtt = () =>
  useMutation({
    mutationFn: (payload: MqttPublishDto) =>
      MqttService.mqttManagementControllerPublish(payload),
  });
