import {
  useEffect,
  useState,
} from "react";

import {
  getStudentRequests,
<<<<<<< HEAD
} from "../../services/dashboard/studentRequests.service";

import type {
  StudentRequest,
} from "../../types/studentRequest.types";
=======
} from "../../services/student/dashboard/studentRequests.service";

import type {
  StudentRequest,
} from "../../types/student/studentRequest.types";
>>>>>>> qa

export function useStudentRequests() {
  const [requests, setRequests] =
    useState<StudentRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await getStudentRequests();

      setRequests(data);
    } catch {
      setError(
        "Failed to load requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    reload: loadRequests,
  };
}