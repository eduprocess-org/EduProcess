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

export interface ProcedureListItem {
  id: string;
  name: string;
  description: string;
  requirementsText: string;
  isActive: boolean;
  facultyId: string | null;
  careerId: string | null;
  facultyName: string | null;
  careerName: string | null;
  requirementsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProcedureDetail {
  id: string;
  name: string;
  description: string;
  requirementsText: string;
  isActive: boolean;
  facultyId: string | null;
  careerId: string | null;
  facultyName: string | null;
  careerName: string | null;
  requirements: ProcedureRequirement[];
}

export interface ProcedureRequirement {
  id: string;
  name: string;
  description: string;
  isMandatory: boolean;
}

export interface ProceduresFilters {
  search: string;
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
