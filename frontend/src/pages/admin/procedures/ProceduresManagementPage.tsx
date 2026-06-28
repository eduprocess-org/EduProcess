import { useNavigate } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";

import ProceduresSearch from "../../../components/procedures/admin/ProceduresSearch";
import ProceduresFilters from "../../../components/procedures/admin/ProceduresFilters";
import ProceduresTable from "../../../components/procedures/admin/ProceduresTable";
import ProceduresPagination from "../../../components/procedures/admin/ProceduresPagination";
import EmptyState from "../../../components/procedures/admin/EmptyState";

import { useProcedures } from "../../../hooks/admin/procedures/useProcedures";

function ProceduresManagementPage() {
  const navigate = useNavigate();
  const {
    procedures,
    page,
    setPage,
    search,
    setSearch,
    sortOrder,
    setSortOrder,
    totalItems,
    totalPages,
    isLoading,
    refresh,
  } = useProcedures();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  const isEmpty = procedures.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-8 transition-colors duration-200">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {totalItems} procedures
              </span>
            </div>

            <button
              onClick={() => navigate("/admin/procedures/create")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-950/20 transition-all transform active:scale-95 whitespace-nowrap"
            >
              <Plus size={14} />
              New Procedure
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-slate-200 dark:bg-slate-800" />

        {/* SEARCH + FILTERS */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-sm">
            <ProceduresSearch value={search} onChange={setSearch} />
          </div>

          <ProceduresFilters
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        </div>

        {/* CONTENT */}
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <ProceduresTable procedures={procedures} onRefreshList={refresh}/>
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