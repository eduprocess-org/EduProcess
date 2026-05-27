import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

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