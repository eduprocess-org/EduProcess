import { apiClient } from "../../api/apiClient";
import type { RequestTracking } from "../../../types/student/request-tracking.types";
import type {
  ApiResponse,
  ApiRequest,
  ApiTimelineEntry,
} from "../../../types/api.types";

const STATUS_MAP: Record<
  string,
  "Submitted" | "Under Review" | "Approved" | "Rejected"
> = {
  pending: "Submitted",
  in_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

export async function getRequestTracking(
  requestId: string
): Promise<RequestTracking> {
  const [trackingResponse, timelineResponse] = await Promise.all([
    apiClient.get<ApiResponse<ApiRequest>>(`/requests/${requestId}/tracking`),
    apiClient.get<ApiResponse<ApiTimelineEntry[]>>(`/requests/${requestId}/timeline`),
  ]);

  const item = trackingResponse.data.data;
  const timelineEntries = timelineResponse.data.data ?? [];

  const observations = item.observations ?? [];
  const lastObservation = observations[observations.length - 1];

  const timeline = timelineEntries.map((entry) => ({
    status: entry.status,
    date: entry.date,
    description: entry.description,
  }));

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