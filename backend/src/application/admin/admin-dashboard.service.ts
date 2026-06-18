import { AdminDashboardRepository } from "../../domain/admin/admin.repository";

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
}
