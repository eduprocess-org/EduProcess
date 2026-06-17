import { apiClient } from "../../api/apiClient";
import type { Procedure } from "../../../types/procedures/procedure.types";
import type { ApiResponse, ApiProcedure } from "../../../types/api.types";

export const getProcedures = async (): Promise<Procedure[]> => {
  const response = await apiClient.get<ApiResponse<ApiProcedure[]>>("/procedures");
  const data = response.data.data;

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    estimatedProcessingTime: "3 business days",
    category: "Academic",
  }));
};