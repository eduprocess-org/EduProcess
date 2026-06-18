export interface DashboardStatsDTO {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

export interface RecentRequestDTO {
  id: string;
  studentName: string;
  procedureName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface RequestsByProcedureTypeDTO {
  procedureTypeId: string;
  procedureName: string;
  count: number;
}
