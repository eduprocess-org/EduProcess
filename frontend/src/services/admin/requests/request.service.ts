import { apiClient } from "../../api/apiClient"; 
import type { 
  AdminRequestListItem, 
  PaginatedResult 
} from "../../../types/admin/adminRequest.types";

import type { AdminRequestDetail } from "../../../types/admin/adminRequest.types";
export interface GetRequestsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  procedureTypeId?: string;
  career?: string;
}

export async function getAdminRequestDetail(id: string): Promise<AdminRequestDetail> {
  const { data } = await apiClient.get(`/admin/requests/${id}`);
  return data.data;
}

export async function getRequests(params: GetRequestsParams): Promise<PaginatedResult<AdminRequestListItem>> {
  const queryParams = new URLSearchParams();
  
  queryParams.set("page", String(params.page));
  queryParams.set("limit", String(params.limit));
  queryParams.set("sortField", "createdAt");
  queryParams.set("sortDirection", "desc");

  if (params.search) queryParams.set("search", params.search);
  if (params.status) queryParams.set("status", params.status);
  if (params.procedureTypeId) queryParams.set("procedureTypeId", params.procedureTypeId);
  if (params.career) queryParams.set("career", params.career);

  const { data } = await apiClient.get(`/admin/requests?${queryParams.toString()}`);
  
  return data.data; 
}