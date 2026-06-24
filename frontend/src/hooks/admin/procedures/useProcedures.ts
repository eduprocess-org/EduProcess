import { useMemo, useState } from "react";
import { proceduresMock } from "../../../mocks/admin/procedures.mock";
import type { ProcedureStatus } from "../../../types/admin/procedures/procedures.types";

const PAGE_SIZE = 5;

export function useProcedures() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | ProcedureStatus>("ALL");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
    let data = [...proceduresMock];

    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.code.toLowerCase().includes(value)
      );
    }

    if (status !== "ALL") {
      data = data.filter((item) => item.status === status);
    }

    data.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return data;
  }, [search, status, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return {
    procedures: paginatedData,
    totalItems: filteredData.length,
    totalPages,

    page,
    setPage,

    search,
    setSearch,

    status,
    setStatus,

    sortOrder,
    setSortOrder,
  };
}