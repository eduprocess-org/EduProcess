import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // 🌟 Cambiado min-h-screen por h-screen y añadido overflow-hidden para congelar la pantalla
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 h-full">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      {/* 🌟 h-full y overflow-hidden aseguran que la Navbar no empuje el contenido hacia arriba */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* 🌟 Solo esta zona tendrá scroll interno e independiente */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Renderiza los componentes hijos de las rutas anidadas */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;