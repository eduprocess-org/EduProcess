import { apiClient } from "../api/apiClient";

import type {
  RegisterRequest ,
  RegisterResponse,
<<<<<<< HEAD
} from "../../types/auth.types";
=======
} from "../../types/auth/auth.types";
>>>>>>> qa

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {

  const response = await apiClient.post(
    "/auth/register",
    data
  );

  return response.data;
};