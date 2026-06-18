import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">

      {/* MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">

          <div className="w-64 h-full">
            <Sidebar isCollapsed={false} />
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex h-full flex-shrink-0">

        <Sidebar
          isCollapsed={isSidebarCollapsed}
        />

      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        <Navbar
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
          onToggleSidebar={() =>
            setIsSidebarCollapsed(
              !isSidebarCollapsed
            )
          }
        />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;