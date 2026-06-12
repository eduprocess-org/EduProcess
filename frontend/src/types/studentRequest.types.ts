export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface StudentRequest {
  id: string;
  procedureName: string;
  status: RequestStatus;
  createdAt: string;
}