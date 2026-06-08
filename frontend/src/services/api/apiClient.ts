import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== "undefined" 
  ? import.meta.env.VITE_API_URL 
  : "";

console.log("API URL =", apiBaseUrl || "Ruta Relativa Activa");

export const apiClient = axios.create({
  baseURL: `${apiBaseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});