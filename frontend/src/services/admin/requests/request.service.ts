import type { ProcedureRequest } from "../../../types/admin/request";

const MOCK_REQUESTS: ProcedureRequest[] = [
  {
    id: "REQ-1001",
    student: {
      firstName: "Vanessa",
      lastName: "Heredia",
      email: "vanessa@test.com",
      career: "Information Systems",
    },
    procedure: {
      id: "1",
      name: "Academic Certificate",
    },
    semester: "7",
    status: "PENDING",
    createdAt: "2026-06-10",
  },
  {
    id: "REQ-1002",
    student: {
      firstName: "Carlos",
      lastName: "Pérez",
      email: "carlos@test.com",
      career: "Software Engineering",
    },
    procedure: {
      id: "2",
      name: "Enrollment Certificate",
    },
    semester: "5",
    status: "APPROVED",
    createdAt: "2026-06-09",
  },
  {
    id: "REQ-1003",
    student: {
      firstName: "María",
      lastName: "Lopez",
      email: "maria@test.com",
      career: "Information Systems",
    },
    procedure: {
      id: "3",
      name: "Transcript",
    },
    semester: "8",
    status: "IN_REVIEW",
    createdAt: "2026-06-08",
  },
];

export interface GetRequestsParams {
  page: number;
  limit: number;
  search: string;
  status: string;
  procedure: string;
}

export async function getRequests({
  page,
  limit,
  search,
  status,
  procedure,
}: GetRequestsParams) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let data = [...MOCK_REQUESTS];

  if (search) {
    const term = search.toLowerCase();

    data = data.filter(
      (r) =>
        r.student.firstName.toLowerCase().includes(term) ||
        r.student.lastName.toLowerCase().includes(term) ||
        r.student.email.toLowerCase().includes(term) ||
        r.id.toLowerCase().includes(term)
    );
  }

  if (status) {
    data = data.filter((r) => r.status === status);
  }

  if (procedure) {
    data = data.filter(
      (r) => r.procedure.name === procedure
    );
  }

  const total = data.length;

  const start = (page - 1) * limit;

  const end = start + limit;

  return {
    data: data.slice(start, end),
    total,
  };
}