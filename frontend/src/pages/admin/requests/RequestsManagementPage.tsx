import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestFilters from "../../../components/admin-requests/RequestFilters";
import RequestTable from "../../../components/admin-requests/RequestTable";
import { useAdminRequests } from "../../../hooks/admin/useAdminRequests";

export default function RequestManagementPage() {
  const navigate = useNavigate();
  const [search, setSearch]       = useState("");
  const [status, setStatus]       = useState("");
  const [procedure, setProcedure] = useState("");
  const [page, setPage]           = useState(1);
  const [sortBy, setSortBy]       = useState("createdAt"); 
  const [order, setOrder]         = useState<"asc" | "desc">("desc");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const { requests = [], loading, error, totalPages, total} = useAdminRequests({
    page,
    limit: 10,
    search,
    status,
    procedureTypeId: procedure, 
    sortField: sortBy,          
    sortDirection: order,
  });

  function handleSort(field: string) {
    if (field === sortBy) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  }

  function handleToggleSelect(id: string) {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleToggleSelectAll() {
    const currentRequests = requests ?? [];
    if (selectedRequests.length === currentRequests.length && currentRequests.length > 0) {
      setSelectedRequests([]);
      return;
    }
    setSelectedRequests(currentRequests.map((r) => r.id));
  }

  const navy      = "#1B2B5E";
  const blue      = "#2563EB";
  const bgPage    = "#F0F4FA";
  const borderClr = "#D9E3F0";
  const textMuted = "#64748B";
  const textSub   = "#94A3B8";

  return (
    <div
      className="min-h-screen px-6 pt-3 pb-8 md:px-10"
      style={{ backgroundColor: bgPage }}
    >
      <div className="mx-auto max-w-7xl space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: navy }}
            >
              Request Management
            </h1>
            <p className="mt-1 text-sm" style={{ color: textMuted }}>
              Review and manage all submitted procedure requests.
            </p>
          </div>

          <div className="text-right">
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: textSub }}
            >
              Total Requests
            </p>
            <p className="text-2xl font-bold" style={{ color: navy }}>
              {total || 0}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div
          className="rounded-2xl border bg-white px-5 py-4 shadow-sm"
          style={{ borderColor: borderClr }}
        >
          <RequestFilters
            search={search}
            status={status}
            procedure={procedure}
            onSearchChange={(value) => { setSearch(value); setPage(1); }}
            onStatusChange={(value) => { setStatus(value); setPage(1); }}
            onProcedureChange={(value) => { setProcedure(value); setPage(1); }}
          />
        </div>

        {/* Selected counter */}
        {!loading && !error && selectedRequests.length > 0 && (
          <div
            className="rounded-xl border bg-white px-4 py-3 shadow-sm"
            style={{ borderColor: borderClr }}
          >
            <span className="text-sm font-medium" style={{ color: navy }}>
              {selectedRequests.length} request
              {selectedRequests.length > 1 ? "s" : ""} selected
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            className="flex items-center gap-4 rounded-2xl border bg-white p-8 shadow-sm"
            style={{ borderColor: borderClr }}
          >
            <div
              className="h-8 w-8 animate-spin rounded-full border-[3px] border-transparent"
              style={{
                borderTopColor: navy,
                borderRightColor: blue,
              }}
            />
            <div>
              <p className="text-sm font-semibold" style={{ color: navy }}>
                Loading requests...
              </p>
              <p className="text-xs" style={{ color: textSub }}>
                Fetching latest data
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="rounded-2xl border bg-white p-5 shadow-sm"
            style={{ borderColor: "#FECACA" }}
          >
            <p className="font-semibold" style={{ color: "#B91C1C" }}>
              Something went wrong
            </p>
            <p className="mt-1 text-sm" style={{ color: "#EF4444" }}>
              {error}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="space-y-4">
            <div
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              style={{ borderColor: borderClr }}
            >
              <div
                style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${navy} 0%, ${blue} 100%)`,
                }}
              />

              <RequestTable
                requests={requests}
                sortBy={sortBy}
                order={order}
                onSort={handleSort}
                selectedRequests={selectedRequests}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
                onViewRequest={(id) => navigate(`/admin/requests/${id}`)}
              />
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-1">
              <p className="text-xs" style={{ color: textSub }}>
                Page <strong style={{ color: navy }}>{page}</strong> of{" "}
                {totalPages || 1}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    border: `0.5px solid ${borderClr}`,
                    backgroundColor: page === 1 ? "#F8FAFC" : "#EFF6FF",
                    color: page === 1 ? textSub : navy,
                    fontSize: ".8rem",
                    fontWeight: 500,
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    transition: "background .12s",
                  }}
                >
                  Previous
                </button>

                <button
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage((prev) => prev + 1)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    border: "none",
                    backgroundColor:
                      page === totalPages || totalPages === 0 ? "#CBD5E1" : navy,
                    color: "#ffffff",
                    fontSize: ".8rem",
                    fontWeight: 500,
                    cursor:
                      page === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
                    transition: "background .12s",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}