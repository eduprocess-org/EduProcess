import {
  DashboardStatsDTO,
  RecentRequestDTO,
  RequestsByProcedureTypeDTO,
  AdminRequestFilters,
  AdminRequestPagination,
  AdminRequestSort,
  AdminRequestListItem,
  PaginatedResult,
  AdminRequestDetail,
  AdminRequestDocument,
  AdminRequestHistoryEntry,
} from "./admin.types";

export interface AdminDashboardRepository {
  getDashboardStats(): Promise<DashboardStatsDTO>;
  getRecentRequests(): Promise<RecentRequestDTO[]>;
  getRequestsByProcedureType(): Promise<RequestsByProcedureTypeDTO[]>;

  getAllRequests(
    filters: AdminRequestFilters,
    pagination: AdminRequestPagination,
    sort: AdminRequestSort
  ): Promise<PaginatedResult<AdminRequestListItem>>;

  getRequestDetail(requestId: string): Promise<AdminRequestDetail | null>;
  getRequestDocuments(requestId: string): Promise<AdminRequestDocument[]>;
  getRequestHistory(requestId: string): Promise<AdminRequestHistoryEntry[]>;
}
