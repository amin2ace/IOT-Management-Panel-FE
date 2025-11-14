import api from "./axios";
import { DiscoveryRequestDto } from "./models/DiscoveryRequestDto";
import { SensorConfigRequestDto } from "./models/SensorConfigRequestDto";
import { SensorFunctionalityRequestDto } from "./models/SensorFunctionalityRequestDto";

export const deviceApi = {
  getAll: () => api.get("/devices/all"),

  discoverBroadcast: (payload: DiscoveryRequestDto) =>
    api.post("/device/discover-broadcast", payload),

  discoverUnicast: (payload: DiscoveryRequestDto) =>
    api.post("/device/discover-unicast", payload),

  getUnassigned: () => api.get("/device/unassigned"),

  provisionFunctionality: (payload: SensorFunctionalityRequestDto) =>
    api.put("/device/deviceFunctionalityProvision", payload),

  reconfigure: (payload: SensorConfigRequestDto) =>
    api.post("/device/reconfigure", payload),

  delete: (id: string) => api.delete(`/device/${id}`),

  getTelemetry: () => api.get("/device/telemetry"),
};
