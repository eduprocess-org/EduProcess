import { useEffect, useState, useCallback } from 'react';
import { getStudentRequests } from '../services/dashboardService';
import { StudentRequest } from '../types/studentDashboardTypes';

export function useStudentRequests() {
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Usamos useCallback para evitar recreaciones innecesarias de la función en móviles
  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStudentRequests();
      setRequests(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return {
    requests,
    loading,
    error,
    reload: loadRequests,
  };
}