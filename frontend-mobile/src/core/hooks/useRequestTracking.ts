import { useEffect, useState, useCallback } from "react";
import { getRequestTracking } from "../services/requestTracking.service";
import type { RequestTracking } from "../types/request-tracking.types";

export function useRequestTracking(requestId: string) {
  const [tracking, setTracking] = useState<RequestTracking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchTracking = useCallback(async () => {
    // Evita romper la UX si el ID llega vacío o inválido temporalmente por el router
    if (!requestId) {
      setError("Invalid tracking identity code.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getRequestTracking(requestId);
      setTracking(data);
      setError("");
    } catch (err: any) {
      // QA Fix: Captura el mensaje real del API si existe, sino usa el fallback seguro
      setError(
        err?.response?.data?.message || "Failed to load tracking information."
      );
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    fetchTracking();
  }, [fetchTracking]);

  return {
    tracking,
    loading,
    error,
    refresh: fetchTracking,
  };
}