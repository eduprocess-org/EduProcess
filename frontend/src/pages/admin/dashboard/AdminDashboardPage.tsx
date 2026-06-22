import AdminDashboardSummary from "../../../components/dashboard/admin/AdminDashboardSummary";
import AdminRecentRequests from "../../../components/dashboard/admin/AdminRecentRequests";
import AdminQuickActions from "../../../components/dashboard/admin/AdminQuickActions";
import AdminDashboardLoading from "../../../components/dashboard/admin/AdminDashboardLoading";
import AdminDashboardError from "../../../components/dashboard/admin/AdminDashboardError";
import { useAdminDashboard } from "../../../hooks/admin/useAdminDashboard";
// Importamos BarChart2 para la nueva sección de distribución
import { Zap, ListChecks, BarChart2 } from "lucide-react"; 

const navy   = "#1B2B5E";
const blue   = "#2563EB";
const border = "#E4EAF4";
const muted  = "#64748B";
const bgPage = "#F0F4FA";

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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgPage,
        padding: "0.75rem 2.5rem 3rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
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

        {/* ── Summary stats ── */}
        <div>
          <AdminDashboardSummary
            total={stats.totalRequests}
            pending={stats.pendingRequests}
            approved={stats.approvedRequests}
            rejected={stats.rejectedRequests}
          />
        </div>

        {/* ── Quick actions ── */}
        <section>
          <SectionLabel icon={<Zap size={13} />} label="Quick actions" />
          <AdminQuickActions />
        </section>

        {/* ── Distribution by Procedure  ── */}
        {distribution && distribution.length > 0 && (
          <section>
            <SectionLabel icon={<BarChart2 size={13} />} label="Requests by Procedure" />
            <div
              style={{
                backgroundColor: "#ffffff",
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: "1.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {distribution.map((item) => (
                <div 
                  key={item.procedureTypeId}
                  style={{
                    padding: "1rem",
                    backgroundColor: "#F8FAFC",
                    borderRadius: 12,
                    border: `1px solid ${border}`
                  }}
                >
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: navy, margin: "0 0 0.25rem 0" }}>
                    {item.procedureName}
                  </p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700, color: blue, margin: 0 }}>
                    {item.count} <span style={{ fontSize: "0.8rem", color: muted, fontWeight: 400 }}>solicitudes</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Recent requests ── */}
        <section>
          <SectionLabel icon={<ListChecks size={13} />} label="Recent requests" />
          <div
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* thin accent bar */}
            <div
              style={{
                height: 3,
                background: `linear-gradient(90deg, ${navy} 0%, ${blue} 100%)`,
              }}
            />
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        marginBottom: "0.75rem",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          borderRadius: 7,
          backgroundColor: "#EFF6FF",
          color: blue,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <h2
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: muted,
          margin: 0,
        }}
      >
        {label}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          backgroundColor: border,
          marginLeft: 4,
        }}
      />
    </div>
  );
}

export default AdminDashboardPage;