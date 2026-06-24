export type ProcedureStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export interface Procedure {
  id: string;
  code: string;
  name: string;
  description: string;
  status: ProcedureStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProceduresFilters {
  search: string;
  status: "ALL" | ProcedureStatus;
  sortBy: "name" | "createdAt";
  sortOrder: "asc" | "desc";
}

export interface ProceduresPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ProceduresResponse {
  data: Procedure[];
  pagination: ProceduresPagination;
}