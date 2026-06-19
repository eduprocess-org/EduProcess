import {
  useEffect,
  useState,
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

  useEffect(() => {
    const fetchTracking =
      async () => {
        try {
          setLoading(true);

          const data =
            await getRequestTracking(
              requestId
            );

          setTracking(data);
        } catch {
          setError(
            "Failed to load tracking information."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchTracking();
  }, [requestId]);

  return {
    tracking,
    loading,
    error,
  };
}