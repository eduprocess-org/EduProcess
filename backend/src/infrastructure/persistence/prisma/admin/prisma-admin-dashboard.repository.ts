/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database.config";
import { AdminDashboardRepository } from "../../../../domain/admin/admin.repository";
import {
  DashboardStatsDTO,
  RecentRequestDTO,
  RequestsByProcedureTypeDTO,
} from "../../../../domain/admin/admin.types";

export class PrismaAdminDashboardRepository implements AdminDashboardRepository {
  async getDashboardStats(): Promise<DashboardStatsDTO> {
    const [totalRequests, pendingRequests, approvedRequests, rejectedRequests] =
      await Promise.all([
        prisma.procedureRequest.count(),
        prisma.procedureRequest.count({ where: { status: "pending" } }),
        prisma.procedureRequest.count({ where: { status: "approved" } }),
        prisma.procedureRequest.count({ where: { status: "rejected" } }),
      ]);

    return {
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
    };
  }

  async getRecentRequests(): Promise<RecentRequestDTO[]> {
    const requests = await prisma.procedureRequest.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        student: {
          select: { firstName: true, lastName: true },
        },
        procedureType: {
          select: { name: true },
        },
      },
    });

    return requests.map((req: any) => ({
      id: req.id,
      studentName: `${req.student.firstName} ${req.student.lastName}`,
      procedureName: req.procedureType.name,
      status: req.status.toUpperCase() as "PENDING" | "APPROVED" | "REJECTED",
      createdAt: req.createdAt.toISOString(),
    }));
  }

  async getRequestsByProcedureType(): Promise<RequestsByProcedureTypeDTO[]> {
    const results: any[] = await prisma.procedureRequest.groupBy({
      by: ["procedureTypeId"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    const procedureTypeIds = results.map((r: any) => r.procedureTypeId);

    const procedureTypes: any[] = await prisma.procedureType.findMany({
      where: { id: { in: procedureTypeIds } },
      select: { id: true, name: true },
    });

    const procedureTypeMap = new Map(
      procedureTypes.map((pt: any) => [pt.id, pt.name])
    );

    return results.map((result: any) => ({
      procedureTypeId: result.procedureTypeId,
      procedureName: procedureTypeMap.get(result.procedureTypeId) ?? "Unknown",
      count: result._count.id,
    }));
  }
}
