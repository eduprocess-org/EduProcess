import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProceduresCatalogPage from "../pages/procedures/ProceduresCatalogPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProcedureDetailsPage from "../pages/procedures/ProcedureDetailsPage";
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
          <Route path="/procedures" element={<ProceduresCatalogPage />} />
          <Route path="/procedures/:id" element={<ProcedureDetailsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;