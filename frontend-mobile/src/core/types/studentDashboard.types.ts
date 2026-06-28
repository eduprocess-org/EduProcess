export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface StudentRequest {
  id: string;
  procedureId: string;
  procedureName: string;
  status: RequestStatus;
  createdAt: string;
}

// Interfaz adicional útil para tipar las props de componentes contenedores
export interface DashboardSummaryProps {
  requests: StudentRequest[];
}