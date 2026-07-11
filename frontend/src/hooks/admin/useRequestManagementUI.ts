import { useState, useCallback, useEffect } from "react";
import { useAdminRequests } from "./useAdminRequests";
import { useDebounce } from "../useDebounce";

interface Filters {
  search: string;
  status: string;
  procedure: string;
}

interface Sort {
  field: string;
  order: "asc" | "desc";
}

export function useRequestManagementUI() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    procedure: "",
  });

  const [page, setPage] = useState(1);

  const [sort, setSort] = useState<Sort>({
    field: "createdAt",
    order: "desc",
  });

  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const limit = 10;

  // Debounce únicamente para la búsqueda
  const debouncedSearch = useDebounce(filters.search, 500);

  const {
    requests,
    loading,
    error,
    total,
    totalPages,
  } = useAdminRequests({
    page,
    limit,
    search: debouncedSearch,
    status: filters.status,
    procedureTypeId: filters.procedure,
    sortField: sort.field,
    sortDirection: sort.order,
  });

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.status, filters.procedure]);

  const handleSort = useCallback(
    (field: string) => {
      if (field === sort.field) {
        setSort((prev) => ({
          ...prev,
          order: prev.order === "asc" ? "desc" : "asc",
        }));
      } else {
        setSort({
          field,
          order: "asc",
        });
      }
    },
    [sort.field]
  );

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedRequests((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    const currentIds = requests?.map((r) => r.id) ?? [];

    if (
      selectedRequests.length === currentIds.length &&
      currentIds.length > 0
    ) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(currentIds);
    }
  }, [requests, selectedRequests]);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= (totalPages || 1)) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  useEffect(() => {
    setSelectedRequests([]);
  }, [page, debouncedSearch, filters.status, filters.procedure]);

  return {
    requests: requests ?? [],
    loading,
    error,
    total,
    totalPages: totalPages ?? 1,
    currentPage: page,

    filters,
    onFilterChange: handleFilterChange,

    sort,
    onSort: handleSort,

    selectedRequests,
    onToggleSelect: handleToggleSelect,
    onToggleSelectAll: handleToggleSelectAll,

    onPageChange: goToPage,
  };
}