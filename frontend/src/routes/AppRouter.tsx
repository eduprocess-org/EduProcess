import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* AUTH PAGES */}

        <Route element={<AuthLayout />}>

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

        </Route>

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