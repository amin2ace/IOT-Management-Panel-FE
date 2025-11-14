// src/api/client.ts
import axios, { AxiosInstance } from "axios";

const BASE_URL =
  // import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:3000/api";

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // required for cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: request interceptor (e.g. attach bearer token if you add it)
apiClient.interceptors.request.use((config) => {
  // e.g. if you later store access token in memory, attach here
  return config;
});

// Response interceptor: centralized error handling
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can customize global error handling here
    // console.error("API Error", err.response?.data ?? err.message);
    return Promise.reject(err);
  }
);

export default apiClient;
