import { apiClient } from "../../api/apiClient";
import type { StudentRequest } from "../../../types/student/studentRequest.types";
import type { ApiResponse, ApiRequest } from "../../../types/api.types";

const STATUS_MAP: Record<
  string,
  "PENDING" | "APPROVED" | "REJECTED"
> = {
  pending: "PENDING",
  in_review: "PENDING",
  approved: "APPROVED",
  rejected: "REJECTED",
};

export async function getStudentRequests(): Promise<StudentRequest[]> {
  const response =
    await apiClient.get<
      ApiResponse<ApiRequest[]>
    >("/requests");

  const data = response.data.data;

  return data.map((item) => ({
    id: item.id,
    procedureId: item.procedureTypeId,
    procedureName:
      item.procedure?.name ?? "",
    status:
      STATUS_MAP[item.status] ??
      "PENDING",
    createdAt:
      item.createdAt?.split("T")[0] ??
      "",
  }));
}