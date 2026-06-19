import { useEffect, useState } from "react";
import {
  getAdminDashboardStats,
  getRecentRequests,
  getRequestsByProcedure, 
} from "../../services/admin/dashboard/dashboard.service";

import type {
  AdminDashboardStats,
  RecentRequest,
  RequestsByProcedure, 
} from "../../types/admin/adminDashboard.types";

export function useAdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [requests, setRequests] = useState<RecentRequest[]>([]);
  const [distribution, setDistribution] = useState<RequestsByProcedure[]>([]); // <-- Estado para el tercer endpoint
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dashboardStats, recentRequests, requestsDistribution] = await Promise.all([
          getAdminDashboardStats(),
          getRecentRequests(),
          getRequestsByProcedure(),
        ]);

        setStats(dashboardStats);
        setRequests(recentRequests);
        setDistribution(requestsDistribution);
      } catch (err: any) {
        setError(
          err?.message || "Unable to load dashboard information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return {
    stats,
    requests,
    distribution, 
    loading,
    error,
  };
}