export type RequestStatus =
  | "PENDING"
  | "IN_REVIEW"
  | "APPROVED"
  | "REJECTED";

export interface ProcedureRequest {
  id: string;

  student: {
    firstName: string;
    lastName: string;
    email: string;
    career: string;
  };

  procedure: {
    id: string;
    name: string;
  };

  semester: string;

  status: RequestStatus;

  createdAt: string;
}