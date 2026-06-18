import type {
  AdminDashboardStats,
  RecentRequest,
} from "../../../types/admin/adminDashboard.types";
import { apiClient } from "../../api/apiClient";

export const getAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    const { data } = await apiClient.get("/admin/dashboard/stats");
    return data.data;
  };

export const getRecentRequests =
  async (): Promise<RecentRequest[]> => {
    const { data } = await apiClient.get("/admin/dashboard/recent-requests");
    return data.data;
  };