import { apiClient } from "../api/apiClient";
import type { LoginRequest, LoginResponse } from "../../types/auth/auth.types";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};
