import type { AdminRequest } from "../services/admin/requests/requestManagement.service";

export const mockAdminRequests: AdminRequest[] =
  [
    {
      id: "REQ-001",
      procedureName:
        "Academic Certificate",
      studentName:
        "Vanessa Heredia",
      studentEmail:
        "vanessa@test.com",
      status: "PENDING",
      submittedAt: "2026-06-14",
    },
    {
      id: "REQ-002",
      procedureName:
        "Enrollment Certificate",
      studentName:
        "Carlos Pérez",
      studentEmail:
        "carlos@test.com",
      status: "APPROVED",
      submittedAt: "2026-06-13",
    },
    {
      id: "REQ-003",
      procedureName:
        "Grade Report",
      studentName:
        "María López",
      studentEmail:
        "maria@test.com",
      status: "REJECTED",
      submittedAt: "2026-06-12",
    },
    {
      id: "REQ-004",
      procedureName:
        "Academic Certificate",
      studentName:
        "Luis Sánchez",
      studentEmail:
        "luis@test.com",
      status: "PENDING",
      submittedAt: "2026-06-11",
    },
    {
      id: "REQ-005",
      procedureName:
        "Graduation Certificate",
      studentName:
        "Ana Torres",
      studentEmail:
        "ana@test.com",
      status: "APPROVED",
      submittedAt: "2026-06-10",
    },
  ];