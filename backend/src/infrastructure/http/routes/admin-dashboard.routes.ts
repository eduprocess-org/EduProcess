import { Router } from "express";
import { AdminDashboardController } from "../controllers/admin-dashboard.controller";
import { AdminDashboardService } from "../../../application/admin/admin-dashboard.service";
import { PrismaAdminDashboardRepository } from "../../persistence/prisma/admin/prisma-admin-dashboard.repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

const repository = new PrismaAdminDashboardRepository();
const service = new AdminDashboardService(repository);
const controller = new AdminDashboardController(service);

router.get(
  "/admin/dashboard/stats",
  authMiddleware,
  adminMiddleware,
  controller.getDashboardStats
);

router.get(
  "/admin/dashboard/recent-requests",
  authMiddleware,
  adminMiddleware,
  controller.getRecentRequests
);

router.get(
  "/admin/dashboard/requests-by-procedure",
  authMiddleware,
  adminMiddleware,
  controller.getRequestsByProcedureType
);

export default router;
