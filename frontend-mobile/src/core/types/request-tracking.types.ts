export interface TimelineItem {
  status: string;
  date: string;
  description: string;
}

export interface RequestTracking {
  requestId: string;
  procedureName: string;

  // Unión de literales estrictas que tipan los badges de estado homologados
  status:
    | "Submitted"
    | "Under Review"
    | "Approved"
    | "Rejected";

  submissionDate: string;
  lastUpdateDate: string;
  
  administrativeComments?: string; // Opcional por si el trámite aún no es revisado por el decanato
  timeline: TimelineItem[];
}