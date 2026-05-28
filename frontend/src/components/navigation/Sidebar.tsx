import {
  LayoutDashboard,
  FileText,
  Search,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-5">

      <h2 className="text-2xl font-bold mb-10">
        EduProcess
      </h2>

      <nav className="flex flex-col gap-4">

        <a
          href="#"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a
          href="#"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FileText size={20} />
          Procedures
        </a>

        <a
          href="#"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Search size={20} />
          Search
        </a>

        <a
          href="#"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Settings size={20} />
          Settings
        </a>

      </nav>
    </aside>
  );
}

export default Sidebar;