import RequestFilters from "../admin-requests/RequestFilters";
import RequestTable from "../admin-requests/RequestTable";
import { DataShell } from "../common/molecules/DataShell";
import { Pagination } from "../common/molecules/Pagination";

interface RequestManagementTemplateProps {
  // Datos
  requests: any[];
  loading: boolean;
  error: string | null;
  total: number;

  // Filtros
  filters: { search: string; status: string; procedure: string };
  onFilterChange: (key: "search" | "status" | "procedure", value: string) => void;

  // Orden
  sort: { field: string; order: "asc" | "desc" };
  onSort: (field: string) => void;

  // Selección
  selectedRequests: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;

  // Paginación
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  // ✅ ¡Añade esta línea!
  onViewRequest: (id: string) => void;
}

export function RequestManagementTemplate(props: RequestManagementTemplateProps) {
  const {
    requests,
    loading,
    error,
    total,
    filters,
    onFilterChange,
    sort,
    onSort,
    selectedRequests,
    onToggleSelect,
    onToggleSelectAll,
    currentPage,
    totalPages,
    onPageChange,
    onViewRequest, // ✅ Ya se desestructura
  } = props;

  return (
    <div className="min-h-screen bg-[#F0F4FA] px-6 pt-3 pb-8 md:px-10">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1B2B5E]">
              Request Management
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Review and manage all submitted procedure requests.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-[#94A3B8]">
              Total Requests
            </p>
            <p className="text-2xl font-bold text-[#1B2B5E]">{total || 0}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="rounded-2xl border border-[#D9E3F0] bg-white px-5 py-4 shadow-sm">
          <RequestFilters
            search={filters.search}
            status={filters.status}
            procedure={filters.procedure}
            onSearchChange={(v) => onFilterChange("search", v)}
            onStatusChange={(v) => onFilterChange("status", v)}
            onProcedureChange={(v) => onFilterChange("procedure", v)}
          />
        </div>

        {/* Contador de selección */}
        {!loading && !error && selectedRequests.length > 0 && (
          <div className="rounded-xl border border-[#D9E3F0] bg-white px-4 py-3 shadow-sm">
            <span className="text-sm font-medium text-[#1B2B5E]">
              {selectedRequests.length} request
              {selectedRequests.length > 1 ? "s" : ""} selected
            </span>
          </div>
        )}

        {/* Tabla con DataShell */}
        <DataShell isLoading={loading} error={error}>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[#D9E3F0] bg-white shadow-sm">
              <div className="h-[3px] bg-gradient-to-r from-[#1B2B5E] to-[#2563EB]" />
              <RequestTable
                requests={requests}
                sortBy={sort.field}
                order={sort.order}
                onSort={onSort}
                selectedRequests={selectedRequests}
                onToggleSelect={onToggleSelect}
                onToggleSelectAll={onToggleSelectAll}
                onViewRequest={onViewRequest} // ✅ Ahora sí existe
              />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              totalItems={total}
            />
          </div>
        </DataShell>
      </div>
    </div>
  );
}