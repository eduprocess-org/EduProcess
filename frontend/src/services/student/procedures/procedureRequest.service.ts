import { apiClient } from "../../api/apiClient";

export interface ProcedureRequestPayload {
  procedureId: string;
  data: {
    semester: string;
    reason: string;
  documents: File[];
  };
}

export interface ProcedureRequestResponse {
  requestId: string;
  status: string;
}

export async function createProcedureRequest(
  payload: ProcedureRequestPayload
): Promise<ProcedureRequestResponse> {
  const formData = new FormData();
  formData.append("procedureId", payload.procedureId);

  formData.append("semester", payload.data.semester);
  formData.append("reason", payload.data.reason);

  if (payload.data.documents?.[0]) {
    formData.append("documents", payload.data.documents[0]);
  }

  const response = await apiClient.post("/requests", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    requestId: response.data.data.id,
    status: response.data.data.status.toUpperCase(),
  };
}