import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  BookOpenCheck,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface QuickAction {
  label: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

const actions: QuickAction[] = [
  {
    label: "Manage Requests",
    description: "Review and process pending requests",
    icon: ClipboardList,
    path: "/admin/requests",
  },
  {
    label: "Manage Procedures",
    description: "Configure available academic procedures",
    icon: BookOpenCheck,
    path: "/admin/procedures",
  },
  {
    label: "Reports",
    description: "View activity and performance reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
];

function AdminQuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {actions.map(({ label, description, icon: Icon, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className="group text-left bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#0B2D63]/20"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(11,45,99,0.08)" }}
          >
            <Icon size={18} style={{ color: "#0B2D63" }} />
          </div>

          <p className="font-semibold text-[#0B2D63]">
            {label}
          </p>

          <p className="text-sm text-slate-500 mt-1">
            {description}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1A52A8] mt-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            Open
            <ArrowRight size={14} />
          </span>
        </button>
      ))}
    </div>
  );
}

export default AdminQuickActions;