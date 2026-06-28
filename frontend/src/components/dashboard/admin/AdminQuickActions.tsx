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
          className="
            group text-left
            bg-white dark:bg-gray-900
            rounded-2xl p-5
            border border-slate-100 dark:border-gray-700
            shadow-sm dark:shadow-none
            transition-all duration-200
            hover:shadow-md hover:-translate-y-0.5
            hover:border-[#0B2D63]/20 dark:hover:border-blue-500/30
          "
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-[#0B2D63]/[0.08] dark:bg-blue-400/10">
            <Icon size={18} className="text-[#0B2D63] dark:text-blue-300" />
          </div>

          <p className="font-semibold text-[#0B2D63] dark:text-blue-200">
            {label}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1A52A8] dark:text-blue-400 mt-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
            Open
            <ArrowRight size={14} />
          </span>
        </button>
      ))}
    </div>
  );
}

export default AdminQuickActions;