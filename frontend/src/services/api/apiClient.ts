import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== "undefined" 
  ? import.meta.env.VITE_API_URL 
  : "";

export const apiClient = axios.create({
  baseURL: `${apiBaseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("sessionToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});