import { apiClient } from "./api/apiClient";

export const getMyProfile = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

export const updateMyProfile = async (data: any) => {
  const response = await apiClient.put("/users/me", data);
  return response.data;
};