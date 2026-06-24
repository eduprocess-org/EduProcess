import { useState, useCallback, useEffect} from "react";
import { useAdminRequests } from "./useAdminRequests";

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
  // 1. Estados agrupados lógicamente
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    procedure: "",
  });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Sort>({ field: "createdAt", order: "desc" });
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const limit = 10;

  // 2. Llamada a la API (el hook que ya tenías)
  const { requests, loading, error, total, totalPages } = useAdminRequests({
    page,
    limit,
    search: filters.search,
    status: filters.status,
    procedureTypeId: filters.procedure,
    sortField: sort.field,
    sortDirection: sort.order,
  });

  // 3. Resetear página al cambiar filtros (importante)
  const handleFilterChange = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // <-- Aquí se resetea la página automáticamente
  }, []);

  // 4. Lógica de ordenamiento
  const handleSort = useCallback(
    (field: string) => {
      if (field === sort.field) {
        setSort((prev) => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }));
      } else {
        setSort({ field, order: "asc" });
      }
    },
    [sort.field]
  );

  // 5. Lógica de selección (fila individual y "Seleccionar Todos")
  const handleToggleSelect = useCallback((id: string) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    const currentIds = requests?.map((r) => r.id) ?? [];
    if (selectedRequests.length === currentIds.length && currentIds.length > 0) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(currentIds);
    }
  }, [requests, selectedRequests]);

  // 6. Navegación de páginas
  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= (totalPages || 1)) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  // 7. Limpiar selección al cambiar de página o filtros (opcional, pero buena práctica)
  useEffect(() => {
    setSelectedRequests([]);
  }, [page, filters]);

  // 8. Retornamos todo lo que la vista necesita
  return {
    // Datos
    requests: requests ?? [],
    loading,
    error,
    total,
    totalPages: totalPages ?? 1,
    currentPage: page,

    // Filtros
    filters,
    onFilterChange: handleFilterChange,

    // Orden
    sort,
    onSort: handleSort,

    // Selección
    selectedRequests,
    onToggleSelect: handleToggleSelect,
    onToggleSelectAll: handleToggleSelectAll,

    // Paginación
    onPageChange: goToPage,
  };
}