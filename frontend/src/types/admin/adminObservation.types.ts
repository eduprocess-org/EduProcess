export interface AdminObservation {
  id: string;
  requestId: string;
  adminId: string;
  comment: string;
  createdAt: string;
  adminName: string;
}

export interface CreateObservationRequest {
  comment: string;
}