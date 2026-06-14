import { prisma } from '../database.config';
import { ProcedureRepository } from '../../../domain/procedures/procedure.repository';
import {
    CreateRequestInput,
    ProcedureRequestDTO,
    ProcedureTypeDTO,
    UpdateStatusInput,
    AuditLogEntryDTO,
} from '../../../domain/procedures/procedure.types';

export class PrismaProcedureRepository implements ProcedureRepository {
    async findAllActive(): Promise<ProcedureTypeDTO[]> {
        return prisma.procedureType.findMany({
            where: { isActive: true },
        });
    }

    async findById(id: string): Promise<ProcedureTypeDTO | null> {
        const result = await prisma.procedureType.findUnique({
            where: { id },
            include: {
                procedureRequirements: true,
            },
        });
        if (!result) return null;
        return {
            ...result,
            requirements: result.procedureRequirements,
        };
    }

    async createRequest(input: CreateRequestInput): Promise<ProcedureRequestDTO> {
        return prisma.procedureRequest.create({
            data: {
                studentId: input.studentId,
                procedureTypeId: input.procedureTypeId,
                career: input.career,
                semester: input.semester,
                reason: input.reason,
                uploadedDocuments: {
                    create: input.documents.map((doc) => ({
                        fileName: doc.fileName,
                        fileUrl: doc.fileUrl,
                    })),
                },
            },
            include: {
                procedureType: true,
                uploadedDocuments: true,
            },
        });
    }

    async findRequestsByStudent(studentId: string): Promise<ProcedureRequestDTO[]> {
        const requests = await prisma.procedureRequest.findMany({
            where: { studentId },
            include: {
                procedureType: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        
        return requests.map((req: any) => ({
            ...req,
            procedure: req.procedureType
        }));
    }

    async findByIdWithoutAuth(requestId: string): Promise<ProcedureRequestDTO | null> {
        const request = await prisma.procedureRequest.findUnique({
            where: { id: requestId },
            include: {
                procedureType: true,
                uploadedDocuments: true,
            },
        });

        if (!request) return null;

        return {
            ...request,
            procedure: request.procedureType,
            documents: request.uploadedDocuments,
        };
    }

    async findRequestTracking(requestId: string, studentId: string): Promise<ProcedureRequestDTO | null> {
        const request = await prisma.procedureRequest.findFirst({
            where: {
                id: requestId,
                studentId: studentId,
            },
            include: {
                procedureType: {
                    include: {
                        procedureRequirements: true,
                    }
                },
                uploadedDocuments: true,
                observations: {
                    include: {
                        admin: true,
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                auditLogs: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
        
        if (!request) return null;
        
        return {
            ...request,
            procedure: request.procedureType,
            documents: request.uploadedDocuments,
            observations: request.observations.map((obs: any) => ({
                id: obs.id,
                comment: obs.comment,
                createdAt: obs.createdAt,
                adminName: obs.admin ? `${obs.admin.firstName} ${obs.admin.lastName}` : undefined
            })),
            auditLogs: request.auditLogs.map((log: any) => ({
                id: log.id,
                action: log.action,
                oldValue: log.oldValue,
                newValue: log.newValue,
                createdAt: log.createdAt,
            })),
        };
    }

    async updateStatus(input: UpdateStatusInput): Promise<ProcedureRequestDTO> {
        const request = await prisma.procedureRequest.update({
            where: { id: input.requestId },
            data: { status: input.newStatus as any },
            include: {
                procedureType: true,
                uploadedDocuments: true,
            },
        });

        if (input.comment) {
            await prisma.observation.create({
                data: {
                    requestId: input.requestId,
                    adminId: input.userId,
                    comment: input.comment,
                },
            });
        }

        const fullRequest = await prisma.procedureRequest.findUnique({
            where: { id: input.requestId },
            include: {
                procedureType: true,
                uploadedDocuments: true,
                observations: {
                    include: { admin: true },
                    orderBy: { createdAt: 'asc' },
                },
                auditLogs: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        return {
            ...fullRequest!,
            procedure: fullRequest!.procedureType,
            documents: fullRequest!.uploadedDocuments,
            observations: fullRequest!.observations.map((obs: any) => ({
                id: obs.id,
                comment: obs.comment,
                createdAt: obs.createdAt,
                adminName: obs.admin ? `${obs.admin.firstName} ${obs.admin.lastName}` : undefined
            })),
            auditLogs: fullRequest!.auditLogs.map((log: any) => ({
                id: log.id,
                action: log.action,
                oldValue: log.oldValue,
                newValue: log.newValue,
                createdAt: log.createdAt,
            })),
        };
    }

    async createAuditLog(
        requestId: string,
        userId: string,
        action: string,
        oldValue: string | null,
        newValue: string | null,
    ): Promise<AuditLogEntryDTO> {
        return prisma.auditLog.create({
            data: {
                procedureRequestId: requestId,
                userId,
                action,
                oldValue,
                newValue,
            },
        });
    }

    async findAuditLogsByRequest(requestId: string): Promise<AuditLogEntryDTO[]> {
        return prisma.auditLog.findMany({
            where: { procedureRequestId: requestId },
            orderBy: { createdAt: 'asc' },
        });
    }
}
