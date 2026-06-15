import { apiClient } from "../api/apiClient";
import type { ProcedureDetails } from "../../types/procedure-details.types";
import type { ApiResponse, ApiProcedure } from "../../types/api.types";

export async function getProcedureDetails(
  id: string
): Promise<ProcedureDetails> {
  const response = await apiClient.get<ApiResponse<ApiProcedure>>(`/procedures/${id}`);
  const item = response.data.data;

  const requirementsList: string[] = [];
  if (item.requirementsText) {
    requirementsList.push(item.requirementsText);
  }
  if (item.requirements?.length) {
    item.requirements.forEach((req) => {
      requirementsList.push(req.description || req.name);
    });
  }

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    category: "Academic",
    estimatedProcessingTime: "3 business days",
    requirements: requirementsList,
    documents: [],
    instructions: [],
  };
}