export interface TimelineItem {
  status: string;
  date: string;
  description: string;
}

export interface RequestTracking {
  requestId: string;
  procedureName: string;

  status:
    | "Submitted"
    | "Under Review"
    | "Approved"
    | "Rejected";

  submissionDate: string;

  lastUpdateDate: string;

  administrativeComments?: string;

  timeline: TimelineItem[];
}