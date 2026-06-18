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

// ─── Admin Request Management Types ──────────────────────────────────────────

export interface AdminRequestFilters {
  status?: string;
  procedureTypeId?: string;
  career?: string;
  search?: string;
}

export interface AdminRequestPagination {
  page: number;
  limit: number;
}

export interface AdminRequestSort {
  field: "createdAt" | "updatedAt" | "status";
  direction: "asc" | "desc";
}

export interface AdminRequestListItem {
  id: string;
  studentName: string;
  studentEmail: string;
  procedureName: string;
  career: string | null;
  semester: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminRequestDetail {
  id: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    career: string | null;
  };
  procedureType: {
    id: string;
    name: string;
    description: string;
  };
  career: string | null;
  semester: string | null;
  reason: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminRequestDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface AdminRequestHistoryEntry {
  id: string;
  action: string;
  oldValue: string | null;
  newValue: string | null;
  adminName: string;
  createdAt: string;
}
