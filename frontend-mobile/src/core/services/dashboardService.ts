import { apiClient } from '../api/apiClient';
import { StudentRequest } from '../types/studentDashboard.types';

// Tipado rápido para la respuesta cruda del backend si no quieres arrastrar api.types
interface BackendRequest {
  id: string;
  procedureTypeId: string;
  procedure?: {
    name: string;
  };
  status: string;
  createdAt?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const STATUS_MAP: Record<string, "PENDING" | "APPROVED" | "REJECTED"> = {
  pending: "PENDING",
  in_review: "PENDING",
  approved: "APPROVED",
  rejected: "REJECTED",
};

export async function getStudentRequests(): Promise<StudentRequest[]> {
  const response = await apiClient.get<ApiResponse<BackendRequest[]>>("/requests");
  const data = response.data.data;

  return data.map((item) => ({
    id: item.id,
    procedureId: item.procedureTypeId,
    procedureName: item.procedure?.name ?? "",
    status: STATUS_MAP[item.status] ?? "PENDING",
    // Mantiene el formato YYYY-MM-DD cortando el string ISO
    createdAt: item.createdAt?.split("T")[0] ?? "",
  }));
}