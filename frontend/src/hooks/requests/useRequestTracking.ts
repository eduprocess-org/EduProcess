import {
  useEffect,
  useState,
<<<<<<< HEAD
=======
  useCallback,
>>>>>>> qa
} from "react";

import {
  getRequestTracking,
<<<<<<< HEAD
} from "../../services/requests/requestTracking.service";

import type {
  RequestTracking,
} from "../../types/request-tracking.types";
=======
} from "../../services/student/requests/requestTracking.service";

import type {
  RequestTracking,
} from "../../types/student/request-tracking.types";
>>>>>>> qa

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

<<<<<<< HEAD
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
=======
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
>>>>>>> qa

  return {
    tracking,
    loading,
    error,
<<<<<<< HEAD
  };
}
=======
    refresh: fetchTracking,
  };
}
>>>>>>> qa
