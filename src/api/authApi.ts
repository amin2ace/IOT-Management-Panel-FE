import api from "./axios";

export const authApi = {
  signup: (data: { username: string; email: string; password: string }) =>
    api.post("/auth/signup", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  logout: () => api.post("/auth/logout"),

  refresh: () => api.post("/auth/refresh"),
};
