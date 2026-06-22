import {apiClient} from "../../api/apiClient";

export interface AdminRequest {
  id: string;
  procedureName: string;
  studentName: string;
  studentEmail: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

export interface RequestFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  procedure?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface RequestResponse {
  requests: AdminRequest[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getAdminRequests(
  filters: RequestFilters
): Promise<RequestResponse> {
  const response = await apiClient.get("/admin/requests", {
    params: filters,
  });

  return response.data;
}