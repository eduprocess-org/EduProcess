import {
  LayoutDashboard,
  FileText,
  Search,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

import logo from "../../assets/images/Logo.jpeg";

function Sidebar() {
  return (
<aside className="w-64 h-full bg-[#0B2D63] text-white flex flex-col">    
      <div className="p-6 border-b border-white/10">

        <div className="flex items-center gap-4">

          <div className="bg-white rounded-xl p-2">

            <img
              src={logo}
              alt="EduProcess"
              className="w-12 h-12 object-contain"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold tracking-wide">
              EduProcess
            </h2>

            <p className="text-xs text-slate-300">
              Academic System
            </p>

          </div>

        </div>

      </div>

      {/* MENU */}

      <nav className="flex-1 p-4">

        <div className="space-y-2">

          {/* ACTIVE ITEM */}

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-medium"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <FileText size={20} />
            My Procedures
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Search size={20} />
            Search
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Bell size={20} />
            Notifications
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Settings size={20} />
            Settings
          </a>

        </div>

      </nav>

      {/* FOOTER */}

      <div className="p-4 border-t border-white/10">

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;