import RequestFilters from "../admin-requests/RequestFilters";
import RequestTable from "../admin-requests/RequestTable";
import { DataShell } from "../common/molecules/DataShell";
import { Pagination } from "../common/molecules/Pagination";

interface RequestManagementTemplateProps {
  requests: any[];
  loading: boolean;
  error: string | null;
  total: number;
  filters: { search: string; status: string; procedure: string };
  onFilterChange: (key: "search" | "status" | "procedure", value: string) => void;
  sort: { field: string; order: "asc" | "desc" };
  onSort: (field: string) => void;
  selectedRequests: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewRequest: (id: string) => void;
}

export function RequestManagementTemplate(props: RequestManagementTemplateProps) {
  const {
    requests, loading, error, total, filters, onFilterChange,
    sort, onSort, selectedRequests, onToggleSelect, onToggleSelectAll,
    currentPage, totalPages, onPageChange, onViewRequest,
  } = props;

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Header — stacks on mobile, side-by-side on sm+ */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-[#1B2B5E] dark:text-blue-200 sm:text-3xl">
            Request Management
          </h1>
          <p className="mt-1 text-sm text-[#64748B] dark:text-slate-400">
            Review and manage all submitted procedure requests.
          </p>
        </div>
        {/* Total badge — sits below title on mobile, right-aligned on sm+ */}
        <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0 sm:shrink-0">
          <p className="text-xs uppercase tracking-wide text-[#94A3B8] dark:text-slate-500">
            Total Requests
          </p>
          <p className="text-xl font-bold text-[#1B2B5E] dark:text-blue-300 sm:text-2xl">
            {total || 0}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#D9E3F0] dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 shadow-sm dark:shadow-none sm:px-5 sm:py-4">
        <RequestFilters
          search={filters.search}
          status={filters.status}
          procedure={filters.procedure}
          onSearchChange={(v) => onFilterChange("search", v)}
          onStatusChange={(v) => onFilterChange("status", v)}
          onProcedureChange={(v) => onFilterChange("procedure", v)}
        />
      </div>

      {/* Selection counter */}
      {!loading && !error && selectedRequests.length > 0 && (
        <div className="rounded-xl border border-[#D9E3F0] dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 shadow-sm dark:shadow-none">
          <span className="text-sm font-medium text-[#1B2B5E] dark:text-blue-200">
            {selectedRequests.length} request{selectedRequests.length > 1 ? "s" : ""} selected
          </span>
        </div>
      )}

      {/* Table — scrollable on mobile */}
      <DataShell isLoading={loading} error={error}>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-[#D9E3F0] dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-none">
            <div className="h-[3px] bg-gradient-to-r from-[#1B2B5E] to-[#2563EB]" />
            {/* horizontal scroll wrapper */}
            <div className="w-full overflow-x-auto">
              <RequestTable
                requests={requests}
                sortBy={sort.field}
                order={sort.order}
                onSort={onSort}
                selectedRequests={selectedRequests}
                onToggleSelect={onToggleSelect}
                onToggleSelectAll={onToggleSelectAll}
                onViewRequest={onViewRequest}
              />
            </div>
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
  );
}