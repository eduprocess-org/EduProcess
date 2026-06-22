import { useState } from "react";
import { Outlet } from "react-router-dom";

import StudentNavbar from "../components/navigation/student/StudentNavbar";
import StudentSidebar from "../components/navigation/student/StudentSidebar";
import AdminSidebar from "../components/navigation/admin/AdminSidebar";

import { useAuth } from "../hooks/useAuth";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">

      {/* MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">

          <div className="w-64 h-full">

            {isAdmin ? (
              <AdminSidebar isCollapsed={false} />
            ) : (
              <StudentSidebar isCollapsed={false} />
            )}

          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex h-full flex-shrink-0">

        {isAdmin ? (
          <AdminSidebar
            isCollapsed={isSidebarCollapsed}
          />
        ) : (
          <StudentSidebar
            isCollapsed={isSidebarCollapsed}
          />
        )}

      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        <StudentNavbar
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