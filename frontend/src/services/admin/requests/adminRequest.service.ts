import { apiClient } from "../../api/apiClient";
import type {
  AdminRequestListItem,
  PaginatedResult,
  AdminRequestDetail,
  AdminRequestDocument,
  AdminRequestHistoryEntry,
  AdminRequestFilters,
} from "../../../types/admin/adminRequest.types";

export const getAdminRequests = async (
  filters: AdminRequestFilters,
  page: number = 1,
  limit: number = 10,
  sortField: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc"
): Promise<PaginatedResult<AdminRequestListItem>> => { 
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set("sortField", sortField);
  params.set("sortDirection", sortDirection);

  if (filters.status) params.set("status", filters.status);
  if (filters.procedureTypeId) params.set("procedureTypeId", filters.procedureTypeId);
  if (filters.career) params.set("career", filters.career);
  if (filters.search) params.set("search", filters.search);

  const { data } = await apiClient.get(`/admin/requests?${params.toString()}`);
  return data.data;
};

export const getAdminRequestDetail = async (id: string): Promise<AdminRequestDetail> => {
  const { data } = await apiClient.get(`/admin/requests/${id}`);
  return data.data;
};

export const getAdminRequestDocuments = async (id: string): Promise<AdminRequestDocument[]> => {
  const { data } = await apiClient.get(`/admin/requests/${id}/documents`);
  return data.data;
};

export const getAdminRequestHistory = async (id: string): Promise<AdminRequestHistoryEntry[]> => {
  const { data } = await apiClient.get(`/admin/requests/${id}/history`);
  return data.data;
};

export const updateAdminRequestStatus = async (
  id: string,
  status: string,
  comment?: string
): Promise<void> => {
  await apiClient.patch(`/admin/requests/${id}/status`, { status, comment });
};