import type { Procedure } from "../types/procedure.types";

export const mockProcedures: Procedure[] = [
  {
    id: "PROC-001",
    name: "Academic Transcript",
    description:
      "Request your official academic transcript issued by the institution.",
    estimatedProcessingTime: "3 business days",
    category: "Academic",
  },

  {
    id: "PROC-002",
    name: "Enrollment Certificate",
    description:
      "Generate proof of enrollment for academic and administrative purposes.",
    estimatedProcessingTime: "1 business day",
    category: "Academic",
  },

  {
    id: "PROC-003",
    name: "Tuition Payment Validation",
    description:
      "Validate your tuition payment for the current semester.",
    estimatedProcessingTime: "2 business days",
    category: "Financial",
  },
];