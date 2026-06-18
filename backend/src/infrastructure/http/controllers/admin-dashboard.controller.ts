import { Request, Response } from "express";
import { AdminDashboardService } from "../../../application/admin/admin-dashboard.service";
import { logger } from "../../config/logger.config";

export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  public getDashboardStats = async (_req: Request, res: Response) => {
    try {
      const stats = await this.adminDashboardService.getDashboardStats();
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public getRecentRequests = async (_req: Request, res: Response) => {
    try {
      const requests = await this.adminDashboardService.getRecentRequests();
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public getRequestsByProcedureType = async (_req: Request, res: Response) => {
    try {
      const data = await this.adminDashboardService.getRequestsByProcedureType();
      res.status(200).json({ success: true, data });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleError(error: unknown, res: Response) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    logger.error("Unhandled error in AdminDashboardController", { error: message });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
