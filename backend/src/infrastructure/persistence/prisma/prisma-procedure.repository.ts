import { prisma } from '../database.config';
import { ProcedureRepository } from '../../../domain/procedures/procedure.repository';
import {
    CreateRequestInput,
    ProcedureRequestDTO,
    ProcedureTypeDTO,
} from '../../../domain/procedures/procedure.types';

export class PrismaProcedureRepository implements ProcedureRepository {
    async findAllActive(): Promise<ProcedureTypeDTO[]> {
        return prisma.procedureType.findMany({
            where: { isActive: true },
        });
    }

    async findById(id: string): Promise<ProcedureTypeDTO | null> {
        return prisma.procedureType.findUnique({
            where: { id },
            include: {
                procedureRequirements: true,
            },
        });
    }

    async createRequest(input: CreateRequestInput): Promise<ProcedureRequestDTO> {
        return prisma.procedureRequest.create({
            data: {
                studentId: input.studentId,
                procedureTypeId: input.procedureTypeId,
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
            }))
        };
    }
}
