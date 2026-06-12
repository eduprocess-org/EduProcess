import { useMemo, useState } from "react";

import DashboardSummary from "../../components/dashboard/DashboardSummary";
import DashboardFilters from "../../components/dashboard/DashboardFilters";
import DashboardLoading from "../../components/dashboard/DashboardLoading";
import DashboardError from "../../components/dashboard/DashboardError";
import DashboardEmpty from "../../components/dashboard/DashboardEmpty";
import RequestCard from "../../components/dashboard/RequestCard";

import { useStudentRequests } from "../../hooks/dashboard/useStudentRequests";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

function StudentDashboardPage() {
  const { requests, loading, error } = useStudentRequests();
  const navigate = useNavigate();

  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("NEWEST");

  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (status !== "ALL") {
      result = result.filter((r) => r.status === status);
    }

    result.sort((a, b) =>
      sort === "NEWEST"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return result;
  }, [requests, status, sort]);

  if (loading) return <DashboardLoading />;
  if (error) return <DashboardError message={error} />;
  if (!requests.length) return <DashboardEmpty />;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            My Requests Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track all your submitted procedure requests.
          </p>
        </div>

        <button
          onClick={() => navigate("/procedures")}
          className="
            inline-flex items-center gap-2
            rounded-xl bg-[#0B2D63]
            px-4 py-2.5 text-sm font-medium text-white
            transition hover:bg-[#09224E] active:scale-[0.98]
          "
        >
          <Plus size={15} />
          New Request
        </button>
      </div>

      {/* Summary cards */}
      <DashboardSummary requests={requests} />

      {/* Filters toolbar */}
      <DashboardFilters
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {/* Request list */}
      <div className="flex flex-col gap-2">
        {filteredRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>

    </div>
  );
}

export default StudentDashboardPage;
