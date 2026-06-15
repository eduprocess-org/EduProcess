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

const redirectToLogin = () => {
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response?.data?.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        redirectToLogin();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${apiBaseUrl}/api/v1/auth/refresh`, { refreshToken });
        const { sessionToken: newSessionToken, refreshToken: newRefreshToken } = response.data.data.tokens;

        localStorage.setItem("sessionToken", newSessionToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        processQueue(null, newSessionToken);

        originalRequest.headers.Authorization = `Bearer ${newSessionToken}`;
        return apiClient(originalRequest);
      } catch {
        processQueue(error, null);
        redirectToLogin();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
