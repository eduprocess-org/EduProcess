import { AdminDashboardRepository } from "../../domain/admin/admin.repository";
import {
  AdminRequestFilters,
  AdminRequestPagination,
  AdminRequestSort,
} from "../../domain/admin/admin.types";

export class AdminDashboardService {
  constructor(
    private readonly adminDashboardRepository: AdminDashboardRepository
  ) {}

  async getDashboardStats() {
    return this.adminDashboardRepository.getDashboardStats();
  }

  async getRecentRequests() {
    return this.adminDashboardRepository.getRecentRequests();
  }

  async getRequestsByProcedureType() {
    return this.adminDashboardRepository.getRequestsByProcedureType();
  }

  async getAllRequests(
    filters: AdminRequestFilters,
    pagination: AdminRequestPagination,
    sort: AdminRequestSort
  ) {
    return this.adminDashboardRepository.getAllRequests(filters, pagination, sort);
  }

  async getRequestDetail(requestId: string) {
    const detail = await this.adminDashboardRepository.getRequestDetail(requestId);
    if (!detail) {
      throw new Error("Request not found");
    }
    return detail;
  }

  async getRequestDocuments(requestId: string) {
    return this.adminDashboardRepository.getRequestDocuments(requestId);
  }

  async getRequestHistory(requestId: string) {
    return this.adminDashboardRepository.getRequestHistory(requestId);
  }
}
