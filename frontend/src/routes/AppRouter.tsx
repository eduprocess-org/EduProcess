import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";

import LoginPage from "../pages/auth/LoginPage";

import RegisterPage from "../pages/auth/RegisterPage";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* DASHBOARD */}

        <Route
          path="/"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;