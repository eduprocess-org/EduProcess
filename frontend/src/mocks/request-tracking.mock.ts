import type {
  RequestTracking,
<<<<<<< HEAD
} from "../types/request-tracking.types";
=======
} from "../types/student/request-tracking.types";
>>>>>>> qa

export const mockRequestTracking: RequestTracking[] = [
  {
    requestId: "REQ-001",
    procedureName: "Academic Certificate",
    status: "Under Review",
    submissionDate: "2026-06-12",
    lastUpdateDate: "2026-06-13",
    administrativeComments:
      "Documentation is currently being reviewed.",
    timeline: [
      {
        status: "Submitted",
        date: "2026-06-12",
        description:
          "Request submitted successfully.",
      },
      {
        status: "Under Review",
        date: "2026-06-13",
        description:
          "Administrative review in progress.",
      },
    ],
  },

  {
    requestId: "REQ-002",
    procedureName:
      "Enrollment Certificate",
    status: "Approved",
    submissionDate: "2026-06-10",
    lastUpdateDate: "2026-06-11",
    administrativeComments:
      "Request approved successfully.",
    timeline: [
      {
        status: "Submitted",
        date: "2026-06-10",
        description:
          "Request submitted successfully.",
      },
      {
        status: "Approved",
        date: "2026-06-11",
        description:
          "Certificate generated.",
      },
    ],
  },

  {
    requestId: "REQ-003",
    procedureName:
      "Tuition Payment Validation",
    status: "Rejected",
    submissionDate: "2026-06-08",
    lastUpdateDate: "2026-06-09",
    administrativeComments:
      "Payment receipt is invalid.",
    timeline: [
      {
        status: "Submitted",
        date: "2026-06-08",
        description:
          "Request submitted successfully.",
      },
      {
        status: "Rejected",
        date: "2026-06-09",
        description:
          "Receipt could not be validated.",
      },
    ],
  },
];