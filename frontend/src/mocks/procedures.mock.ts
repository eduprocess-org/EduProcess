import type { Procedure } from "../types/procedure.types";

export const mockProcedures: Procedure[] = [
  {
    id: "1",
    name: "Academic Transcript",
    description:
      "Request your official academic transcript issued by the institution.",
    estimatedProcessingTime: "3 business days",
    category: "Academic",
  },

  {
    id: "2",
    name: "Enrollment Certificate",
    description:
      "Generate proof of enrollment for academic and administrative purposes.",
    estimatedProcessingTime: "1 business day",
    category: "Academic",
  },

  {
    id: "3",
    name: "Scholarship Application",
    description:
      "Submit an application for financial assistance and scholarship programs.",
    estimatedProcessingTime: "5 business days",
    category: "Financial",
  },
];