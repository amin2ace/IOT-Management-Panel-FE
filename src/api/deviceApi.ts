import {
  DiscoveryRequest,
  SensorConfigRequest,
  SensorFunctionalityRequest,
} from "@/types";
import api from "./axios";

export const deviceApi = {
  getAll: () => api.get("/devices/all"),

  discoverBroadcast: (payload: DiscoveryRequest) =>
    api.post("/device/discover-broadcast", payload),

  discoverUnicast: (payload: DiscoveryRequest) =>
    api.post("/device/discover-unicast", payload),

  getUnassigned: () => api.get("/device/unassigned"),

  provisionFunctionality: (payload: SensorFunctionalityRequest) =>
    api.put("/device/deviceFunctionalityProvision", payload),

  reconfigure: (payload: SensorConfigRequest) =>
    api.post("/device/reconfigure", payload),

  delete: (id: string) => api.delete(`/device/${id}`),

  getTelemetry: () => api.get("/device/telemetry"),
};
