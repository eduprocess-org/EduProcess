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

  const {
    logout,
  } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (
    <aside className="w-64 h-screen bg-[#0B2D63] text-white flex flex-col flex-shrink-0">

      {/* HEADER */}

      <div className="p-6 border-b border-white/10">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="EduProcess"
            className="w-12 h-12 object-contain"
          />

          <div>

            <h2 className="text-xl font-bold">
              EduProcess
            </h2>

            <p className="text-xs text-slate-300">
              Academic System
            </p>

          </div>

        </div>

      </div>

      {/* MENU */}

      <nav className="flex-1 p-4 space-y-2">

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <FileText size={20} />
          My Procedures
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <Search size={20} />
          Search
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <Bell size={20} />
          Notifications
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <Settings size={20} />
          Settings
        </a>

      </nav>

      {/* FOOTER */}

      <div className="p-4 border-t border-white/10">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-300 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;