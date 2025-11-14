import api from "./axios";

export const topicApi = {
  getDeviceTopics: (deviceId: string) =>
    api.get(`/topic/deviceTopics/${deviceId}`),

  getSubscribedTopics: () => api.get("/topic/subscribed"),
};
