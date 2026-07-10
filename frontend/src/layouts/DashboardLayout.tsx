import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/navigation/student/StudentNavbar";
import StudentSidebar from "../components/navigation/student/StudentSidebar";
import AdminSidebar from "../components/navigation/admin/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100 transition-colors dark:bg-slate-950">
      {/* MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="h-full w-72 max-w-[85vw]">
            {isAdmin ? (
              <AdminSidebar isCollapsed={false} />
            ) : (
              <StudentSidebar isCollapsed={false} />
            )}
          </div>

          <div
            className="flex-1 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden h-full flex-shrink-0 lg:flex">
        {isAdmin ? (
          <AdminSidebar isCollapsed={isSidebarCollapsed} />
        ) : (
          <StudentSidebar isCollapsed={isSidebarCollapsed} />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
          onToggleSidebar={() =>
            setIsSidebarCollapsed(!isSidebarCollapsed)
          }
        />

        <main
          className="
            flex-1
            overflow-y-auto
            bg-slate-100
            p-4
            transition-colors
            sm:p-6
            lg:p-8
            dark:bg-slate-900
          "
        >
          <div className="mx-auto w-full max-w-7xl text-slate-900 dark:text-slate-100">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;