import {
  LayoutDashboard,
  FileText,
  Search,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/Logo.jpeg";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-[#0B2D63] text-white flex flex-col flex-shrink-0 select-none">
      {/* HEADER */}
      <div className="p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="bg-white rounded-xl p-2 flex items-center justify-center w-12 h-12 flex-shrink-0">
            <img
              src={logo}
              alt="EduProcess"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="overflow-hidden">
            <h2 className="text-xl font-bold tracking-wide truncate">
              EduProcess
            </h2>
            <p className="text-xs text-slate-300 truncate">
              Academic System
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-medium"
          >
            <LayoutDashboard size={20} className="flex-shrink-0" />
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <FileText size={20} className="flex-shrink-0" />
            My Procedures
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Search size={20} className="flex-shrink-0" />
            Search
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Bell size={20} className="flex-shrink-0" />
            Notifications
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Settings size={20} className="flex-shrink-0" />
            Settings
          </a>
        </div>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
        >
          <LogOut size={20} className="flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;