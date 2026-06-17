import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import StudentDashboardPage from "../pages/student/dashboard/StudentDashboardPage";

import ProceduresCatalogPage from "../pages/student/procedures/ProceduresCatalogPage";
import ProcedureDetailsPage from "../pages/student/procedures/ProcedureDetailsPage";
import ProcedureRequestPage from "../pages/student/procedures/ProcedureRequestPage";

import RequestTrackingPage from "../pages/student/requests/RequestTrackingPage";

import AdminDashboardPage from "../pages/admin/dashboard/AdminDashboardPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
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

        {/* STUDENT */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard principal */}
          <Route
            index
            element={<StudentDashboardPage />}
          />

          {/* My Requests */}
          <Route
            path="requests"
            element={<StudentDashboardPage />}
          />

          {/* Procedures */}
          <Route
            path="procedures"
            element={<ProceduresCatalogPage />}
          />

          <Route
            path="procedures/:id"
            element={<ProcedureDetailsPage />}
          />

          <Route
            path="procedures/:id/request"
            element={<ProcedureRequestPage />}
          />

          {/* Request Tracking */}
          <Route
            path="requests/:requestId/tracking"
            element={<RequestTrackingPage />}
          />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<AdminDashboardPage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;