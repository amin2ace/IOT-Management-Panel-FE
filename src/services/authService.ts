import { api } from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
}

export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  signup: async (data: SignupData) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },

  changePassword: async (data: ChangePasswordData) => {
    const response = await api.post("/auth/change-password", data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forget-password", { email });
    return response.data;
  },

  resetPassword: async (
    token: string,
    newPassword: string,
    retypePassword: string
  ) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
      retypePassword,
    });
    return response.data;
  },
};
