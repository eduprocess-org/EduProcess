import axios from "axios";
import { authStorage } from "../storage/authStorage";

// @ts-ignore
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.100.63:3000";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

let onUnauthorizedErrorCallback: (() => void) | null = null;

export const setUnauthorizedCallback = (callback: () => void) => {
  onUnauthorizedErrorCallback = callback;
};

apiClient.interceptors.request.use(
  async (config) => {
    // En mobile recuperamos el token desde el almacenamiento seguro
    const token = await authStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const handleCleanExit = async () => {
  await authStorage.removeToken();
  if (onUnauthorizedErrorCallback) {
    onUnauthorizedErrorCallback();
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      const refreshToken = await authStorage.getToken();

      if (!refreshToken) {
        await handleCleanExit();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, { refreshToken });
        const { sessionToken: newSessionToken } = response.data.data.tokens;

        await authStorage.saveToken(newSessionToken);

        processQueue(null, newSessionToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newSessionToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await handleCleanExit();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("QA Log: 401 definitivo detectado (No fue por TOKEN_EXPIRED). Forzando limpieza del estado de autenticación.");
      await handleCleanExit();
    }

    return Promise.reject(error);
  }
);