import api from "./axios";

export const deviceApi = {
  getAll: () => api.get("/device/all"),
  discoverBroadcast: (payload: any) =>
    api.post("/device/discover-broadcast", payload),
  discoverUnicast: (payload: any) =>
    api.post("/device/discover-unicast", payload),
  getUnassigned: () => api.get("/device/unassigned"),
  provision: (payload: any) =>
    api.put("/device/deviceFunctionalityProvision", payload),
  reconfigure: (payload: any) => api.post("/device/reconfigure", payload),
  telemetry: (params?: any) => api.get("/device/telemetry", { params }),
};
