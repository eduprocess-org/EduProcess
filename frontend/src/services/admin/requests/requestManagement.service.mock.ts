import {
  type RequestFilters,
  type RequestResponse,
} from "./requestManagement.service";

import { mockAdminRequests } from "../../../mocks/adminRequests";

export async function getAdminRequests(
  filters: RequestFilters
): Promise<RequestResponse> {
  await new Promise((r) =>
    setTimeout(r, 500)
  );

  let data = [...mockAdminRequests];

  if (filters.search) {
    const search =
      filters.search.toLowerCase();

    data = data.filter(
      (r) =>
        r.studentName
          .toLowerCase()
          .includes(search) ||
        r.studentEmail
          .toLowerCase()
          .includes(search) ||
        r.procedureName
          .toLowerCase()
          .includes(search)
    );
  }

  if (filters.status) {
    data = data.filter(
      (r) =>
        r.status === filters.status
    );
  }

  if (filters.procedure) {
    data = data.filter(
      (r) =>
        r.procedureName ===
        filters.procedure
    );
  }

  const page =
    filters.page ?? 1;

  const limit =
    filters.limit ?? 10;

  const start =
    (page - 1) * limit;

  return {
    requests: data.slice(
      start,
      start + limit
    ),
    total: data.length,
    page,
    totalPages: Math.ceil(
      data.length / limit
    ),
  };
}