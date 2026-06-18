import {
  DashboardStatsDTO,
  RecentRequestDTO,
  RequestsByProcedureTypeDTO,
} from "./admin.types";

export interface AdminDashboardRepository {
  getDashboardStats(): Promise<DashboardStatsDTO>;
  getRecentRequests(): Promise<RecentRequestDTO[]>;
  getRequestsByProcedureType(): Promise<RequestsByProcedureTypeDTO[]>;
}
