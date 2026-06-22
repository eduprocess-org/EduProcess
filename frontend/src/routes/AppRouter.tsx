<<<<<<< HEAD
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentDashboardPage from "../pages/dashboard/StudentDashboardPage";
import ProceduresCatalogPage from "../pages/procedures/ProceduresCatalogPage";
import ProcedureDetailsPage from "../pages/procedures/ProcedureDetailsPage";
import DashboardPage from "../pages/dashboard/StudentDashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProcedureRequestPage from "../pages/procedures/ProcedureRequestPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import RequestTrackingPage
  from "../pages/requests/RequestTrackingPage";
  
=======
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

function RoleBasedRedirect() {
  const { user } = useAuth(); 

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

>>>>>>> qa
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

<<<<<<< HEAD
        {/* AUTH */}
=======
        {/* ================= AUTH ================= */}
>>>>>>> qa
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

<<<<<<< HEAD
        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
=======
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
>>>>>>> qa
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
<<<<<<< HEAD
          <Route index element={<DashboardPage />} />
          <Route
            path="/requests"
            element={<StudentDashboardPage />}
          />
          
          <Route
            path="/procedures"
            element={<ProceduresCatalogPage />}
          />

          <Route
            path="/procedures/:id"
            element={<ProcedureDetailsPage />}
          />

          <Route
            path="/procedures/:id/request"
            element={<ProcedureRequestPage />}
          />

         <Route
          path="/requests/:requestId/tracking"
          element={<RequestTrackingPage />}
        />

        </Route>

=======
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
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

>>>>>>> qa
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;