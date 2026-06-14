import type { ProcedureDetails } from "../types/procedure-details.types";

export const mockProcedureDetails: ProcedureDetails[] = [
  {
  id: "PROC-001",
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
    id: "PROC-002",
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
  },
  {
    id: "PROC-003",
    name: "Tuition Payment Validation",
    description:
      "Validate your tuition payment for the current semester.",
    category: "Financial",
    estimatedProcessingTime: "2 business days",   
    requirements: [
      "Have paid tuition for the current semester"
    ],
    documents: [
      "Payment receipt"
    ],      
    instructions: [
      "Upload payment receipt",
      "Submit request"
    ]
  }
];