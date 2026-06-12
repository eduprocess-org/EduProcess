import type {
  StudentRequest,
} from "../../types/studentRequest.types";

export async function getStudentRequests(): Promise<StudentRequest[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, 1200)
  );

  return [
    {
      id: "REQ-001",
      procedureId: "PROC-001",
      procedureName:
        "Academic Certificate",
      status: "PENDING",
      createdAt: "2026-06-12",
    },
    {
      id: "REQ-002",
      procedureId: "PROC-002",
      procedureName:
        "Enrollment Certificate",
      status: "APPROVED",
      createdAt: "2026-06-10",
    },
    {
      id: "REQ-003",
      procedureId: "PROC-003",
      procedureName:
        "Tuition Payment Validation",
      status: "REJECTED",
      createdAt: "2026-06-08",
    },
  ];
}