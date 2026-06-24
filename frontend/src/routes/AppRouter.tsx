import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Student
import StudentDashboardPage from "../pages/student/dashboard/StudentDashboardPage";
import ProceduresCatalogPage from "../pages/student/procedures/ProceduresCatalogPage";
import ProcedureDetailsPage from "../pages/student/procedures/ProcedureDetailsPage";
import ProcedureRequestPage from "../pages/student/procedures/ProcedureRequestPage";
import RequestTrackingPage from "../pages/student/requests/RequestTrackingPage";

// Admin
import AdminDashboardPage from "../pages/admin/dashboard/AdminDashboardPage";
import RequestManagementPage from "../pages/admin/requests/RequestsManagementPage"; 
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import RequestDetailsPage from "../pages/admin/requests/RequestDetailsPage";
import { useAuth } from "../hooks/useAuth"; 
import ProceduresManagementPage from "../pages/admin/procedures/ProceduresManagementPage";
import ProcedureCreationPage from "../pages/admin/procedures/ProcedureCreationPage";

function RoleBasedRedirect() {
  const { user } = useAuth(); 

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* ================= ROOT REDIRECT ================= */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute roles={["student", "admin"]}>
              <RoleBasedRedirect />
            </ProtectedRoute>
          } 
        />

        {/* ================= STUDENT MODULE ================= */}
        <Route
          element={
            <ProtectedRoute roles={["student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboardPage />} />

          <Route path="requests" element={<RequestTrackingPage />} /> 

          <Route path="procedures" element={<ProceduresCatalogPage />} />

          <Route path="procedures/:id" element={<ProcedureDetailsPage />} />

          <Route
            path="procedures/:id/request"
            element={<ProcedureRequestPage />}
          />

          <Route
            path="requests/:requestId/tracking"
            element={<RequestTrackingPage />}
          />
        </Route>

        {/* ================= ADMIN MODULE ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />

          <Route path="requests" element={<RequestManagementPage />} />
          <Route path="requests/:id" element={<RequestDetailsPage />} />
          <Route path="procedures" element={<ProceduresManagementPage />} />
          <Route path="procedures/create" element={<ProcedureCreationPage />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;