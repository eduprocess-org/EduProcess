import { apiClient } from "../../api/apiClient";
import type {
  AdminObservation,
  CreateObservationRequest,
} from "../../../types/admin/adminObservation.types";

export const createObservation = async (
  requestId: string,
  data: CreateObservationRequest
): Promise<AdminObservation> => {
  const response = await apiClient.post(
    `/admin/requests/${requestId}/observations`,
    data
  );
  return response.data.data;
};

export const getObservationsByRequest = async (
  requestId: string
): Promise<AdminObservation[]> => {
  const response = await apiClient.get(
    `/admin/requests/${requestId}/observations`
  );
  return response.data.data;
};

export const getObservationById = async (
  id: string
): Promise<AdminObservation> => {
  const response = await apiClient.get(`/admin/observations/${id}`);
  return response.data.data;
};

export const deleteObservation = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/observations/${id}`);
};