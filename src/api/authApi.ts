import api from "./axios";
import { loginInputDto } from "./models/loginInputDto";
import { SignupInputDto } from "./models/SignupInputDto";

export const authApi = {
  signup: (data: SignupInputDto) => api.post("/auth/signup", data),

  login: (data: loginInputDto) => api.post("/auth/login", data),

  logout: () => api.post("/auth/logout"),

  refresh: () => api.post("/auth/refresh"),
};
