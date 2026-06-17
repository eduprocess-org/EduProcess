import type {
  AdminDashboardStats,
  RecentRequest,
} from "../../../types/admin/adminDashboard.types";

export const getAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    return {
      totalRequests: 125,
      pendingRequests: 42,
      approvedRequests: 70,
      rejectedRequests: 13,
    };
  };

export const getRecentRequests =
  async (): Promise<RecentRequest[]> => {
    return [
      {
        id: "1",
        studentName: "Juan Perez",
        procedureName: "Transcript Request",
        status: "PENDING",
        createdAt: "2026-06-16",
      },
      {
        id: "2",
        studentName: "Maria Lopez",
        procedureName: "Enrollment Certificate",
        status: "APPROVED",
        createdAt: "2026-06-15",
      },
      {
        id: "3",
        studentName: "Carlos Ruiz",
        procedureName: "Grade Appeal",
        status: "REJECTED",
        createdAt: "2026-06-14",
      },
    ];
  };