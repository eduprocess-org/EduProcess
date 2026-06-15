import { apiClient } from "../api/apiClient";

export interface ProcedureRequestPayload {
  procedureId: string;
  data: {
    career: string;
    semester: string;
    reason: string;
    document: FileList;
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

  formData.append("career", payload.data.career);
  formData.append("semester", payload.data.semester);
  formData.append("reason", payload.data.reason);

  if (payload.data.document?.[0]) {
    formData.append("documents", payload.data.document[0]);
  }

  const response = await apiClient.post("/requests", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return {
    requestId: response.data.data.id,
    status: response.data.data.status.toUpperCase(),
  };
}