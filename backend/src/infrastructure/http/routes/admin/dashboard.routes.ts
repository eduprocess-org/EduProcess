import { Router } from "express";
import { AdminDashboardController } from "../../controllers/admin/dashboard.controller";
import { AdminDashboardService } from "../../../../application/admin/admin-dashboard.service";
import { PrismaAdminDashboardRepository } from "../../../persistence/prisma/admin/prisma-admin-dashboard.repository";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { ProcedureController } from "../../controllers/procedure.controller";
import { ProcedureService } from "../../../../application/procedures/procedure.service";
import { PrismaProcedureRepository } from "../../../persistence/prisma/procedure/prisma-procedure.repository";

const router = Router();

const repository = new PrismaAdminDashboardRepository();
const service = new AdminDashboardService(repository);
const controller = new AdminDashboardController(service);

const procedureRepository = new PrismaProcedureRepository();
const procedureService = new ProcedureService(procedureRepository);
const procedureController = new ProcedureController(procedureService);

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

router.get(
  "/admin/requests",
  authMiddleware,
  adminMiddleware,
  controller.getAllRequests
);

router.get(
  "/admin/requests/:id",
  authMiddleware,
  adminMiddleware,
  controller.getRequestDetail
);

router.get(
  "/admin/requests/:id/documents",
  authMiddleware,
  adminMiddleware,
  controller.getRequestDocuments
);

router.get(
  "/admin/requests/:id/history",
  authMiddleware,
  adminMiddleware,
  controller.getRequestHistory
);

router.patch(
  "/admin/requests/:id/status",
  authMiddleware,
  adminMiddleware,
  procedureController.updateRequestStatus
);

export default router;
