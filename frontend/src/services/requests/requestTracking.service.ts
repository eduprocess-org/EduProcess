import { apiClient } from "../api/apiClient";
import type { RequestTracking } from "../../types/request-tracking.types";
import type { ApiResponse, ApiRequest } from "../../types/api.types";

const STATUS_MAP: Record<string, "Submitted" | "Under Review" | "Approved" | "Rejected"> = {
  pending: "Submitted",
  in_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

export async function getRequestTracking(
  requestId: string
): Promise<RequestTracking> {
  const response = await apiClient.get<ApiResponse<ApiRequest>>(`/requests/${requestId}/tracking`);
  const item = response.data.data;

  const observations = item.observations ?? [];
  const lastObservation = observations[observations.length - 1];

  const timeline = [
    {
      status: "Submitted",
      date: item.createdAt?.split("T")[0] ?? "",
      description: "Request submitted successfully.",
    },
  ];

  observations.forEach((obs) => {
    timeline.push({
      status: STATUS_MAP[item.status] ?? "Under Review",
      date: obs.createdAt?.split("T")[0] ?? "",
      description: obs.comment,
    });
  });

  return {
    requestId: item.id,
    procedureName: item.procedure?.name ?? "",
    status: STATUS_MAP[item.status] ?? "Submitted",
    submissionDate: item.createdAt?.split("T")[0] ?? "",
    lastUpdateDate: item.updatedAt?.split("T")[0] ?? "",
    administrativeComments: lastObservation?.comment ?? "",
    timeline,
  };
}