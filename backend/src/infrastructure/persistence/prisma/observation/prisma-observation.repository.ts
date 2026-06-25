import { prisma } from '../../database.config';
import { ObservationRepository } from '../../../../domain/observations/observation.repository';
import { CreateObservationInput, ObservationDTO } from '../../../../domain/observations/observation.types';

export class PrismaObservationRepository implements ObservationRepository {
    async create(input: CreateObservationInput): Promise<ObservationDTO> {
        const observation = await prisma.observation.create({
            data: {
                requestId: input.requestId,
                adminId: input.adminId,
                comment: input.comment,
            },
            include: {
                admin: {
                    select: { firstName: true, lastName: true },
                },
                request: {
                    select: { studentId: true },
                },
            },
        });

        return {
            id: observation.id,
            requestId: observation.requestId,
            adminId: observation.adminId,
            comment: observation.comment,
            createdAt: observation.createdAt,
            adminName: `${observation.admin.firstName} ${observation.admin.lastName}`,
            studentId: observation.request.studentId,
        };
    }

    async findByRequest(requestId: string): Promise<ObservationDTO[]> {
        const observations = await prisma.observation.findMany({
            where: { requestId },
            include: {
                admin: {
                    select: { firstName: true, lastName: true },
                },
            },
            orderBy: { createdAt: 'asc' },
        });

        return observations.map((obs: any) => ({
            id: obs.id,
            requestId: obs.requestId,
            adminId: obs.adminId,
            comment: obs.comment,
            createdAt: obs.createdAt,
            adminName: `${obs.admin.firstName} ${obs.admin.lastName}`,
        }));
    }

    async findById(id: string): Promise<ObservationDTO | null> {
        const observation = await prisma.observation.findUnique({
            where: { id },
            include: {
                admin: {
                    select: { firstName: true, lastName: true },
                },
            },
        });

        if (!observation) return null;

        return {
            id: observation.id,
            requestId: observation.requestId,
            adminId: observation.adminId,
            comment: observation.comment,
            createdAt: observation.createdAt,
            adminName: `${observation.admin.firstName} ${observation.admin.lastName}`,
        };
    }

    async delete(id: string): Promise<void> {
        await prisma.observation.delete({ where: { id } });
    }
}
