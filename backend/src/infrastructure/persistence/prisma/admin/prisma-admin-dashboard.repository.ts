/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database.config";
import { AdminDashboardRepository } from "../../../../domain/admin/admin.repository";
import {
  DashboardStatsDTO,
  RecentRequestDTO,
  RequestsByProcedureTypeDTO,
  AdminRequestFilters,
  AdminRequestPagination,
  AdminRequestSort,
  AdminRequestListItem,
  PaginatedResult,
  AdminRequestDetail,
  AdminRequestDocument,
  AdminRequestHistoryEntry,
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

  async getAllRequests(
    filters: AdminRequestFilters,
    pagination: AdminRequestPagination,
    sort: AdminRequestSort
  ): Promise<PaginatedResult<AdminRequestListItem>> {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.procedureTypeId) {
      where.procedureTypeId = filters.procedureTypeId;
    }
    if (filters.career) {
      where.career = filters.career;
    }
    if (filters.search) {
      where.OR = [
        { student: { firstName: { contains: filters.search, mode: "insensitive" } } },
        { student: { lastName: { contains: filters.search, mode: "insensitive" } } },
        { student: { email: { contains: filters.search, mode: "insensitive" } } },
        { procedureType: { name: { contains: filters.search, mode: "insensitive" } } },
      ];
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [requests, total] = await Promise.all([
      prisma.procedureRequest.findMany({
        where,
        skip,
        take: pagination.limit,
        orderBy: { [sort.field]: sort.direction },
        include: {
          student: {
            select: { firstName: true, lastName: true, email: true },
          },
          procedureType: {
            select: { name: true },
          },
        },
      }),
      prisma.procedureRequest.count({ where }),
    ]);

    return {
      data: requests.map((req: any) => ({
        id: req.id,
        studentName: `${req.student.firstName} ${req.student.lastName}`,
        studentEmail: req.student.email,
        procedureName: req.procedureType.name,
        career: req.career,
        semester: req.semester,
        status: req.status,
        createdAt: req.createdAt.toISOString(),
        updatedAt: req.updatedAt.toISOString(),
      })),
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(total / pagination.limit),
    };
  }

  async getRequestDetail(requestId: string): Promise<AdminRequestDetail | null> {
    const request = await prisma.procedureRequest.findUnique({
      where: { id: requestId },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            career: { select: { name: true } },
          },
        },
        procedureType: {
          select: { id: true, name: true, description: true },
        },
      },
    });

    if (!request) return null;

    return {
      id: request.id,
      student: {
        id: request.student.id,
        firstName: request.student.firstName,
        lastName: request.student.lastName,
        email: request.student.email,
        career: request.student.career?.name ?? null,
      },
      procedureType: {
        id: request.procedureType.id,
        name: request.procedureType.name,
        description: request.procedureType.description,
      },
      career: request.career,
      semester: request.semester,
      reason: request.reason,
      status: request.status,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
    };
  }

  async getRequestDocuments(requestId: string): Promise<AdminRequestDocument[]> {
    const documents = await prisma.uploadedDocument.findMany({
      where: { requestId },
      orderBy: { uploadedAt: "desc" },
    });

    return documents.map((doc: any) => ({
      id: doc.id,
      fileName: doc.fileName,
      fileUrl: doc.fileUrl,
      uploadedAt: doc.uploadedAt.toISOString(),
    }));
  }

  async getRequestHistory(requestId: string): Promise<AdminRequestHistoryEntry[]> {
    const logs = await prisma.auditLog.findMany({
      where: { procedureRequestId: requestId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return logs.map((log: any) => ({
      id: log.id,
      action: log.action,
      oldValue: log.oldValue,
      newValue: log.newValue,
      adminName: `${log.user.firstName} ${log.user.lastName}`,
      createdAt: log.createdAt.toISOString(),
    }));
  }
}
