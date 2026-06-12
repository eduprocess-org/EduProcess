import type { ProcedureDetails } from "../types/procedure-details.types";

export const mockProcedureDetails: ProcedureDetails[] = [
  {
    id: "1",
    name: "Academic Transcript",
    description:
      "Request your official academic transcript issued by the institution.",
    category: "Academic",
    estimatedProcessingTime: "3 business days",

    requirements: [
      "Be an active student",
      "Have no pending debts"
    ],

    documents: [
      "Student ID",
      "Identity card"
    ],

    instructions: [
      "Complete the form",
      "Upload required documents",
      "Submit request"
    ]
  },

  {
    id: "2",
    name: "Enrollment Certificate",
    description:
      "Generate proof of enrollment.",

    category: "Academic",

    estimatedProcessingTime:
      "1 business day",

    requirements: [
      "Active enrollment"
    ],

    documents: [
      "Student ID"
    ],

    instructions: [
      "Confirm information",
      "Submit request"
    ]
  }
];