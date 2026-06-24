import { apiClient } from "../../core/api/apiClient";
import type { LoginRequest, LoginResponse } from "../types/authTypes"; // Ajusta la ruta a tus tipos globales

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Le pega exactamente al mismo endpoint del backend Express
  const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};