import ProceduresSearch from "../../../components/procedures/admin/ProceduresSearch";
import ProceduresFilters from "../../../components/procedures/admin/ProceduresFilters";
import ProceduresTable from "../../../components/procedures/admin/ProceduresTable";
import ProceduresPagination from "../../../components/procedures/admin/ProceduresPagination";
import EmptyState from "../../../components/procedures/admin/EmptyState";

import { useProcedures } from "../../../hooks/admin/procedures/useProcedures";

function ProceduresManagementPage() {
  const {
    procedures,
    page,
    setPage,
    search,
    setSearch,
    status,
    setStatus,
    sortOrder,
    setSortOrder,
    totalItems,
    totalPages,
  } = useProcedures();

  const isEmpty = procedures.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Procedures Management
              </h1>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Manage, search and organize system procedures
              </p>
            </div>
          </div>

          {!isEmpty && (
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {totalItems} procedures
              </span>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-slate-200 dark:bg-slate-800" />

        {/* SEARCH + FILTERS */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-sm">
            <ProceduresSearch value={search} onChange={setSearch} />
          </div>

          <ProceduresFilters
            status={status}
            onStatusChange={setStatus}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        </div>

        {/* CONTENT */}
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <ProceduresTable procedures={procedures} />
            <ProceduresPagination
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setPage}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default ProceduresManagementPage;