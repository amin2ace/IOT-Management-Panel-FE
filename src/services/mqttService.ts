import { api } from "./api";

export interface MQTTPublishData {
  topic: string;
  message: string;
  qos?: 0 | 1 | 2;
  retain?: boolean;
}

export interface MQTTSubscribeData {
  topic: string;
  qos?: 0 | 1 | 2;
}

export const mqttService = {
  getStatus: async () => {
    const response = await api.get("/mqtt/status");
    return response.data;
  },

  publish: async (data: MQTTPublishData) => {
    const response = await api.post("/mqtt/publish", data);
    return response.data;
  },

  subscribe: async (data: MQTTSubscribeData) => {
    const response = await api.post("/mqtt/subscribe", data);
    return response.data;
  },

  unsubscribe: async (topic: string) => {
    const response = await api.delete(`/mqtt/unsubscribe/${topic}`);
    return response.data;
  },

  getTopics: async () => {
    const response = await api.get("/mqtt/topics");
    return response.data;
  },

  reconnect: async () => {
    const response = await api.post("/mqtt/reconnect");
    return response.data;
  },
};
