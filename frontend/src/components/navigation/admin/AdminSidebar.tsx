import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import logo from "../../../assets/images/Logo.jpeg";

interface Props {
  isCollapsed: boolean;
}

function AdminSidebar({ isCollapsed }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      label: "Requests",
      icon: ClipboardList,
      path: "/admin/requests",
    },
    {
      label: "Procedures",
      icon: FileText,
      path: "/admin/procedures",
    },
  ];

  return (
    <aside
      className={`
        h-full
        bg-[#0B2D63]
        dark:bg-slate-950
        text-white
        flex
        flex-col
        flex-shrink-0
        select-none
        transition-all
        duration-300
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* HEADER */}
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-4"
          }`}
        >
          <div className="bg-white dark:bg-slate-900 rounded-xl p-2 flex items-center justify-center w-12 h-12 flex-shrink-0 border border-transparent dark:border-slate-700">            <img
              src={logo}
              alt="EduProcess"
              className="w-full h-full object-contain"
            />
          </div>

          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="text-xl font-bold tracking-wide truncate">
                EduProcess
              </h2>

              <p className="text-xs text-slate-300 dark:text-slate-400 truncate">
                Admin Panel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                  ? "bg-white/10 dark:bg-slate-800 border border-white/10 dark:border-slate-700 text-white"
                  : "text-slate-200 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />

                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 dark:border-slate-700 flex-shrink-0">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200 ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <LogOut size={20} />

          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;