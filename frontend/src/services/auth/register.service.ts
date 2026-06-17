import { apiClient } from "../api/apiClient";

import type {
  RegisterRequest ,
  RegisterResponse,
} from "../../types/auth/auth.types";

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {

  const response = await apiClient.post(
    "/auth/register",
    data
  );

  return response.data;
};