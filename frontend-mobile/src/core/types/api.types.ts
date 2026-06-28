// Contenedor genérico para todas las respuestas estándar del backend de la UCE
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiProcedureRequirement {
  id: string;
  name: string;
  description: string;
  isMandatory: boolean;
}

export interface ApiProcedure {
  id: string;
  name: string;
  description: string;
  requirementsText: string;
  isActive: boolean;
  requirements?: ApiProcedureRequirement[];
}

export interface ApiObservation {
  id: string;
  comment: string;
  createdAt: string;
  adminName?: string;
}

export interface ApiDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface ApiRequest {
  id: string;
  studentId: string;
  procedureTypeId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  procedure?: {
    id: string;
    name: string;
    description: string;
    requirementsText: string;
    isActive: boolean;
  };
  documents?: ApiDocument[];
  observations?: ApiObservation[];
}

export interface ApiTimelineEntry {
  status: string;
  date: string;
  description: string;
}