/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma, pool } from "../../database.config";
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
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS "totalRequests",
        COUNT(*) FILTER (WHERE status = 'pending')::int AS "pendingRequests",
        COUNT(*) FILTER (WHERE status = 'approved')::int AS "approvedRequests",
        COUNT(*) FILTER (WHERE status = 'rejected')::int AS "rejectedRequests"
      FROM "ProcedureRequest"
    `);

    return result.rows[0];
  }

  async getRecentRequests(): Promise<RecentRequestDTO[]> {
    const result = await pool.query(`
      SELECT
        pr.id,
        u."firstName" || ' ' || u."lastName" AS "studentName",
        pt.name AS "procedureName",
        pr.status,
        pr."createdAt"
      FROM "ProcedureRequest" pr
      JOIN "User" u ON pr."studentId" = u.id
      JOIN "ProcedureType" pt ON pr."procedureTypeId" = pt.id
      ORDER BY pr."createdAt" DESC
      LIMIT 10
    `);

    return result.rows.map((req: any) => ({
      id: req.id,
      studentName: req.studentName,
      procedureName: req.procedureName,
      status: req.status.toUpperCase() as "PENDING" | "APPROVED" | "REJECTED",
      createdAt: req.createdAt.toISOString(),
    }));
  }

  async getRequestsByProcedureType(): Promise<RequestsByProcedureTypeDTO[]> {
    const result = await pool.query(`
      SELECT
        pr."procedureTypeId",
        pt.name AS "procedureName",
        COUNT(*)::int AS count
      FROM "ProcedureRequest" pr
      JOIN "ProcedureType" pt ON pr."procedureTypeId" = pt.id
      GROUP BY pr."procedureTypeId", pt.name
      ORDER BY count DESC
    `);

    return result.rows;
  }

  async getAllRequests(
    filters: AdminRequestFilters,
    pagination: AdminRequestPagination,
    sort: AdminRequestSort
  ): Promise<PaginatedResult<AdminRequestListItem>> {
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (filters.status) {
      conditions.push(`pr.status = $${paramIndex}`);
      params.push(filters.status);
      paramIndex++;
    }

    if (filters.procedureTypeId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(filters.procedureTypeId)) {
      conditions.push(`pr."procedureTypeId" = $${paramIndex}`);
      params.push(filters.procedureTypeId);
      paramIndex++;
    }

    if (filters.career) {
      conditions.push(`pr.career = $${paramIndex}`);
      params.push(filters.career);
      paramIndex++;
    }

    if (filters.search) {
      conditions.push(`(
        u."firstName" ILIKE $${paramIndex} OR
        u."lastName" ILIKE $${paramIndex} OR
        u.email ILIKE $${paramIndex} OR
        pt.name ILIKE $${paramIndex}
      )`);
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const allowedSortFields: Record<string, string> = {
      createdAt: 'pr."createdAt"',
      updatedAt: 'pr."updatedAt"',
      status: 'pr.status',
    };
    const sortField = allowedSortFields[sort.field] || 'pr."createdAt"';
    const sortDirection = sort.direction === 'asc' ? 'ASC' : 'DESC';

    const skip = (pagination.page - 1) * pagination.limit;

    const countQuery = `
      SELECT COUNT(*)::int AS total
      FROM "ProcedureRequest" pr
      JOIN "User" u ON pr."studentId" = u.id
      JOIN "ProcedureType" pt ON pr."procedureTypeId" = pt.id
      ${whereClause}
    `;

    const dataQuery = `
      SELECT
        pr.id,
        u."firstName" || ' ' || u."lastName" AS "studentName",
        u.email AS "studentEmail",
        pt.name AS "procedureName",
        pr.career,
        pr.semester,
        pr.status,
        pr."createdAt",
        pr."updatedAt"
      FROM "ProcedureRequest" pr
      JOIN "User" u ON pr."studentId" = u.id
      JOIN "ProcedureType" pt ON pr."procedureTypeId" = pt.id
      ${whereClause}
      ORDER BY ${sortField} ${sortDirection}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery, params),
      pool.query(dataQuery, [...params, pagination.limit, skip]),
    ]);

    const total = countResult.rows[0].total;

    return {
      data: dataResult.rows.map((req: any) => ({
        id: req.id,
        studentName: req.studentName,
        studentEmail: req.studentEmail,
        procedureName: req.procedureName,
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
