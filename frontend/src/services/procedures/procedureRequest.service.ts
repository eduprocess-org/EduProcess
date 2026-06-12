export interface ProcedureRequestPayload {
  procedureId: string;
  data: any;
}

export interface ProcedureRequestResponse {
  requestId: string;
  status: string;
}

export async function createProcedureRequest(
  payload: ProcedureRequestPayload
): Promise<ProcedureRequestResponse> {
  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  console.log(payload);

  return {
    requestId: crypto.randomUUID(),
    status: "PENDING",
  };
}