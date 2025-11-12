import { MqttPublish, MqttSubscribe } from "@/src/types";
import api from "./axios";

export const mqttApi = {
  getStatus: () => api.get("/mqtt-client/status"),

  publish: (payload: MqttPublish) => api.post("/mqtt-client/publish", payload),

  subscribe: (payload: MqttSubscribe) =>
    api.post("/mqtt-client/subscribe", payload),

  unsubscribe: (topic: string) =>
    api.delete(`/mqtt-client/unsubscribe/${topic}`),

  reconnect: () => api.post("/mqtt-client/reconnect"),
};
