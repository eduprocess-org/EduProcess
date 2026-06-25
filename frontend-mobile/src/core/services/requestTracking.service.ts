import { apiClient } from "../api/apiClient";
import type { RequestTracking } from "../types/request-tracking.types";
import type {
  ApiResponse,
  ApiRequest,
  ApiTimelineEntry,
} from "../types/api.types";

// Diccionario estricto para homologar los estados del backend a las etiquetas de la UI
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
  // Peticiones paralelas concurrentes para optimizar la red en el celular
  const [trackingResponse, timelineResponse] = await Promise.all([
    apiClient.get<ApiResponse<ApiRequest>>(`/requests/${requestId}/tracking`),
    apiClient.get<ApiResponse<ApiTimelineEntry[]>>(`/requests/${requestId}/timeline`),
  ]);

  const item = trackingResponse?.data?.data;
  const timelineEntries = timelineResponse?.data?.data ?? [];

  // QA Check: Manejo seguro contra arreglos de observaciones nulos o indefinidos
  const observations = item?.observations ?? [];
  const lastObservation = observations.length > 0 ? observations[observations.length - 1] : null;

  // Transformación estructurada para el organismo StatusTimeline
  const timeline = timelineEntries.map((entry) => ({
    status: entry.status ?? "",
    date: entry.date ?? "",
    description: entry.description ?? "",
  }));

  // Retorno homologado bajo la interfaz contractual requerida por la UI móvil
  return {
    requestId: item?.id ?? "",
    procedureName: item?.procedure?.name ?? "Trámite Universitario",
    status: STATUS_MAP[item?.status ?? ""] ?? "Submitted",
    submissionDate: item?.createdAt ? item.createdAt.split("T")[0] : "",
    lastUpdateDate: item?.updatedAt ? item.updatedAt.split("T")[0] : "",
    administrativeComments: lastObservation?.comment ?? "",
    timeline,
  };
}