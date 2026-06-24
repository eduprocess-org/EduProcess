import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getRequestTracking,
} from "../../services/student/requests/requestTracking.service";

import type {
  RequestTracking,
} from "../../types/student/request-tracking.types";

export function
useRequestTracking(
  requestId: string
) {
  const [
    tracking,
    setTracking,
  ] =
    useState<RequestTracking | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const fetchTracking =
    useCallback(async () => {
      try {
        setLoading(true);

        const data =
          await getRequestTracking(
            requestId
          );

        setTracking(data);
        setError("");
      } catch {
        setError(
          "Failed to load tracking information."
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
