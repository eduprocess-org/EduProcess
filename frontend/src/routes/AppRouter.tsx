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

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
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

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;