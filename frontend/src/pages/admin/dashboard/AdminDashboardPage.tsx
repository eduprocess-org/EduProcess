import AdminDashboardSummary from "../../../components/dashboard/admin/AdminDashboardSummary";
import AdminRecentRequests from "../../../components/dashboard/admin/AdminRecentRequests";
import AdminQuickActions from "../../../components/dashboard/admin/AdminQuickActions";
import AdminDashboardLoading from "../../../components/dashboard/admin/AdminDashboardLoading";
import AdminDashboardError from "../../../components/dashboard/admin/AdminDashboardError";
import { useAdminDashboard } from "../../../hooks/admin/useAdminDashboard";
import { Zap, ListChecks, BarChart2 } from "lucide-react";

function AdminDashboardPage() {
  const { stats, requests, distribution, loading, error } = useAdminDashboard();

  if (loading) return <AdminDashboardLoading />;
  if (error)   return <AdminDashboardError message={error} />;
  if (!stats)  return null;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F0F4FA] dark:bg-gray-950 px-10 pt-3 pb-12">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0B2D63] dark:text-blue-300 tracking-tight">
              Administrator Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Overview of procedures and requests.
            </p>
          </div>
          <span className="text-sm text-slate-400 dark:text-slate-500 sm:text-right">
            {today}
          </span>
        </div>

        {/* Summary stats */}
        <div>
          <AdminDashboardSummary
            total={stats.totalRequests}
            pending={stats.pendingRequests}
            approved={stats.approvedRequests}
            rejected={stats.rejectedRequests}
          />
        </div>

        {/* Quick actions */}
        <section>
          <SectionLabel icon={<Zap size={13} />} label="Quick actions" />
          <AdminQuickActions />
        </section>

        {/* Distribution by Procedure */}
        {distribution && distribution.length > 0 && (
          <section>
            <SectionLabel icon={<BarChart2 size={13} />} label="Requests by Procedure" />
            <div className="bg-white dark:bg-gray-900 border border-[#E4EAF4] dark:border-gray-700 rounded-2xl p-6 grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
            >
              {distribution.map((item) => (
                <div
                  key={item.procedureTypeId}
                  className="p-4 bg-[#F8FAFC] dark:bg-gray-800 rounded-xl border border-[#E4EAF4] dark:border-gray-700"
                >
                  <p className="text-sm font-semibold text-[#1B2B5E] dark:text-blue-200 mb-1">
                    {item.procedureName}
                  </p>
                  <p className="text-2xl font-bold text-[#2563EB] dark:text-blue-400 m-0">
                    {item.count}{" "}
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                      solicitudes
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent requests */}
        <section>
          <SectionLabel icon={<ListChecks size={13} />} label="Recent requests" />
          <div className="bg-white dark:bg-gray-900 border border-[#E4EAF4] dark:border-gray-700 rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-[#1B2B5E] to-[#2563EB]" />
            <AdminRecentRequests requests={requests} />
          </div>
        </section>

      </div>
    </div>
  );
}

function SectionLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-[7px] mb-3">
      <span className="flex items-center justify-center w-6 h-6 rounded-[7px] bg-[#EFF6FF] dark:bg-blue-900/40 text-[#2563EB] dark:text-blue-400 shrink-0">
        {icon}
      </span>
      <h2 className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-slate-500 dark:text-slate-400 m-0">
        {label}
      </h2>
      <div className="flex-1 h-px bg-[#E4EAF4] dark:bg-gray-700 ml-1" />
    </div>
  );
}

export default AdminDashboardPage;