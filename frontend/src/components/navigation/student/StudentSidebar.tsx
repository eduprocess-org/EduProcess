import {
  LayoutDashboard,
  FileText,
  Search,
  Bell,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import logo from "../../../assets/images/Logo.jpeg";

interface SidebarProps {
  isCollapsed: boolean;
}

function Sidebar({ isCollapsed }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

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
                Academic System
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => navigate("/")}
            className={`flex w-full items-center px-4 py-3 rounded-xl transition-all duration-200 ${
              isCollapsed ? "justify-center" : "gap-3"
            } ${
              location.pathname === "/"
              ? "bg-white/10 dark:bg-slate-800 border border-white/10 dark:border-slate-700 text-white"
              : "text-slate-200 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={20} />

            {!isCollapsed && <span>Dashboard</span>}
          </button>

          {/* Procedures */}
          <button
            onClick={() => navigate("/procedures")}
            className={`flex w-full items-center px-4 py-3 rounded-xl transition-all duration-200 ${
              isCollapsed ? "justify-center" : "gap-3"
            } ${
              location.pathname === "/procedures"
              ? "bg-white/10 dark:bg-slate-800 border border-white/10 dark:border-slate-700 text-white"
              : "text-slate-200 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-800"
            }`}
          >
            <FileText size={20} />

            {!isCollapsed && <span>My Procedures</span>}
          </button>

          {/* Search */}
          <button
            className={`flex w-full items-center px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 dark:hover:bg-slate-800 hover:text-white transition-all duration-200 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <Search size={20} />

            {!isCollapsed && <span>Search</span>}
          </button>

          {/* Notifications */}
          <button
            className={`flex w-full items-center px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 dark:hover:bg-slate-800 hover:text-white transition-all duration-200 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <Bell size={20} />

            {!isCollapsed && <span>Notifications</span>}
          </button>

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

export default Sidebar;