export interface AdminDashboardStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

export interface RecentRequest {
  id: string;
  studentName: string;
  procedureName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface RequestsByProcedure {
  procedureTypeId: string;
  procedureName: string;
  count: number;
}