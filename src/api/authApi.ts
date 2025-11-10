import api from "./axios";

export const authApi = {
  login: (payload: { username: string; password: string }) =>
    api.post("/auth/login", payload),
  signup: (payload: any) => api.post("/auth/signup", payload),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
};
