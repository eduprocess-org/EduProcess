import { Request, Response } from "express";
import { AdminDashboardService } from "../../../application/admin/admin-dashboard.service";
import { handleError } from "../utils/error-handler";

export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  public getDashboardStats = async (_req: Request, res: Response) => {
    try {
      const stats = await this.adminDashboardService.getDashboardStats();
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      handleError(error, res, "AdminDashboardController");
    }
  };

  public getRecentRequests = async (_req: Request, res: Response) => {
    try {
      const requests = await this.adminDashboardService.getRecentRequests();
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      handleError(error, res, "AdminDashboardController");
    }
  };

  public getRequestsByProcedureType = async (_req: Request, res: Response) => {
    try {
      const data = await this.adminDashboardService.getRequestsByProcedureType();
      res.status(200).json({ success: true, data });
    } catch (error) {
      handleError(error, res, "AdminDashboardController");
    }
  };

  public getAllRequests = async (req: Request, res: Response) => {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
      const sortField = (req.query.sortField as string) || "createdAt";
      const sortDirection = (req.query.sortDirection as string) === "asc" ? "asc" : "desc";

      const filters = {
        status: (req.query.status as string) || undefined,
        procedureTypeId: (req.query.procedureTypeId as string) || undefined,
        career: (req.query.career as string) || undefined,
        search: (req.query.search as string) || undefined,
      };

      const result = await this.adminDashboardService.getAllRequests(
        filters,
        { page, limit },
        { field: sortField as any, direction: sortDirection as any }
      );

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      handleError(error, res, "AdminDashboardController");
    }
  };

  public getRequestDetail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const detail = await this.adminDashboardService.getRequestDetail(id);
      res.status(200).json({ success: true, data: detail });
    } catch (error) {
      handleError(error, res, "AdminDashboardController");
    }
  };

  public getRequestDocuments = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const documents = await this.adminDashboardService.getRequestDocuments(id);
      res.status(200).json({ success: true, data: documents });
    } catch (error) {
      handleError(error, res, "AdminDashboardController");
    }
  };

  public getRequestHistory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const history = await this.adminDashboardService.getRequestHistory(id);
      res.status(200).json({ success: true, data: history });
    } catch (error) {
      handleError(error, res, "AdminDashboardController");
    }
  };
}
