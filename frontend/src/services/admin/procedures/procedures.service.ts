import { apiClient } from "../../api/apiClient";
import type { ProceduresResponse } from "../../../types/admin/procedures/procedures.types";

export interface GetProceduresParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const getProcedures = async (
  params: GetProceduresParams
): Promise<ProceduresResponse> => {
  const { data } = await apiClient.get("/procedures", { params });
  return data;
};