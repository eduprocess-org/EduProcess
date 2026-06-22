import { useState } from "react";
import { Outlet } from "react-router-dom";

<<<<<<< HEAD
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
=======
import StudentNavbar from "../components/navigation/student/StudentNavbar";
import StudentSidebar from "../components/navigation/student/StudentSidebar";
import AdminSidebar from "../components/navigation/admin/AdminSidebar";

import { useAuth } from "../hooks/useAuth";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);
>>>>>>> qa

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

<<<<<<< HEAD
=======
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

>>>>>>> qa
  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">

      {/* MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">

          <div className="w-64 h-full">
<<<<<<< HEAD
            <Sidebar isCollapsed={false} />
=======

            {isAdmin ? (
              <AdminSidebar isCollapsed={false} />
            ) : (
              <StudentSidebar isCollapsed={false} />
            )}

>>>>>>> qa
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex h-full flex-shrink-0">

<<<<<<< HEAD
        <Sidebar
          isCollapsed={isSidebarCollapsed}
        />
=======
        {isAdmin ? (
          <AdminSidebar
            isCollapsed={isSidebarCollapsed}
          />
        ) : (
          <StudentSidebar
            isCollapsed={isSidebarCollapsed}
          />
        )}
>>>>>>> qa

      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

<<<<<<< HEAD
        <Navbar
=======
        <StudentNavbar
>>>>>>> qa
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