import AdminDashboardSummary
  from "../../../components/dashboard/admin/AdminDashboardSummary";

import AdminRecentRequests
  from "../../../components/dashboard/admin/AdminRecentRequests";

import AdminQuickActions
  from "../../../components/dashboard/admin/AdminQuickActions";

import AdminDashboardLoading
  from "../../../components/dashboard/admin/AdminDashboardLoading";

import AdminDashboardError
  from "../../../components/dashboard/admin/AdminDashboardError";

import { useAdminDashboard }
  from "../../../hooks/admin/useAdminDashboard";

import { LayoutDashboard, Zap, ListChecks } from "lucide-react";

function AdminDashboardPage() {
  const {
    stats,
    requests,
    loading,
    error,
  } = useAdminDashboard();

  if (loading) {
    return <AdminDashboardLoading />;
  }

  if (error) {
    return (
      <AdminDashboardError
        message={error}
      />
    );
  }

  if (!stats) {
    return null;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8 pb-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(11,45,99,0.08)" }}
            >
              <LayoutDashboard size={16} style={{ color: "#0B2D63" }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Admin panel
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#0B2D63] tracking-tight">
            Administrator Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Overview of procedures and requests.
          </p>
        </div>

        <span className="text-sm text-slate-400 sm:text-right">
          {today}
        </span>
      </div>

      {/* Summary */}
      <AdminDashboardSummary
        total={stats.totalRequests}
        pending={stats.pendingRequests}
        approved={stats.approvedRequests}
        rejected={stats.rejectedRequests}
      />

      {/* Quick actions */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} style={{ color: "#1A52A8" }} />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Quick actions
          </h2>
        </div>

        <AdminQuickActions />
      </section>

      {/* Recent requests */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <ListChecks size={14} style={{ color: "#1A52A8" }} />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Recent requests
          </h2>
        </div>

        <AdminRecentRequests
          requests={requests}
        />
      </section>
    </div>
  );
}

export default AdminDashboardPage;