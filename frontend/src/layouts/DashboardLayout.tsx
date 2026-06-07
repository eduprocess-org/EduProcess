import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">

        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;