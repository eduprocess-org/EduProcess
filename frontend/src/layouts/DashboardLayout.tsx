import { useState } from "react";

import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
  <div className="flex min-h-screen bg-slate-100">
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">

          <div className="w-64">
            <Sidebar />
          </div>

          {/* Background Overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">

        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;