export type RequestStatus = "pending" | "in_review" | "approved" | "rejected";

// ─── Transiciones válidas del flujo de trabajo ──────────────────────────────
export const VALID_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
<<<<<<< HEAD
  PENDING: ["IN_REVIEW"],
  IN_REVIEW: ["APPROVED", "REJECTED"],
  APPROVED: [],
  REJECTED: [],
=======
  pending: ["in_review"],
  in_review: ["approved", "rejected"],
  approved: [],
  rejected: [],
>>>>>>> cab71563bdcfa8c43f5c2a27e33ea37bfeed05ec
};

// ─── Interfaces ──────────────────────────────────────────────────────────────
export interface AdminRequestListItem {
  id: string;
  studentName: string;
  studentEmail: string;
  procedureName: string;
  career: string | null;
  semester: string | null;
  status: RequestStatus;
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
  status: RequestStatus;
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

export interface AdminRequestFilters {
  status?: RequestStatus;
  procedureTypeId?: string;
  career?: string;
  search?: string;
}