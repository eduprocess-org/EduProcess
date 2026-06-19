import { useEffect, useState } from "react";

import {
  getAdminDashboardStats,
  getRecentRequests,
} from "../../services/admin/dashboard/dashboard.service";

import type {
  AdminDashboardStats,
  RecentRequest,
} from "../../types/admin/adminDashboard.types";

export function useAdminDashboard() {
  const [stats, setStats] =
    useState<AdminDashboardStats | null>(null);

  const [requests, setRequests] =
    useState<RecentRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const dashboardStats =
          await getAdminDashboardStats();

        const recentRequests =
          await getRecentRequests();

        setStats(dashboardStats);
        setRequests(recentRequests);
      } catch {
        setError(
          "Unable to load dashboard information."
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
    loading,
    error,
  };
}