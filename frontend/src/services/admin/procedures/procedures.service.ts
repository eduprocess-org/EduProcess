import { apiClient } from "../../api/apiClient";

export interface GetProceduresParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface ProcedureRequirement {
  id: string;
  name: string;
  description: string;
  isMandatory: boolean;
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

export interface ProceduresResponse {
  data: ProcedureListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateProcedureInput {
  name: string;
  description: string;
  requirementsText?: string;
  facultyId?: string | null;
  careerId?: string | null;
  isActive?: boolean;
  requirements?: Array<{
    name: string;
    description: string;
    isMandatory?: boolean;
  }>;
}

export interface UpdateProcedureInput {
  name?: string;
  description?: string;
  requirementsText?: string;
  facultyId?: string | null;
  careerId?: string | null;
  isActive?: boolean;
  requirements?: Array<{
    name: string;
    description: string;
    isMandatory?: boolean;
  }>;
}

export const adminProceduresApi = {
  getAll: async (params?: GetProceduresParams): Promise<ProceduresResponse> => {
    const { data } = await apiClient.get("/admin/procedures", { params });
    return data;
  },

  getById: async (id: string): Promise<ProcedureDetail> => {
    const { data } = await apiClient.get(`/admin/procedures/${id}`);
    return data.data;
  },

  create: async (input: CreateProcedureInput): Promise<ProcedureDetail> => {
    const { data } = await apiClient.post("/admin/procedures", input);
    return data.data;
  },

  update: async (id: string, input: UpdateProcedureInput): Promise<ProcedureDetail> => {
    const { data } = await apiClient.put(`/admin/procedures/${id}`, input);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/procedures/${id}`);
  },

  toggleStatus: async (id: string, isActive: boolean): Promise<ProcedureDetail> => {
    const { data } = await apiClient.patch(`/admin/procedures/${id}/status`, { isActive });
    return data.data;
  },
};
