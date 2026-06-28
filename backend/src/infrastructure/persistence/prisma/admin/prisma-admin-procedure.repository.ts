import { prisma } from '../../database.config';
import { AdminProcedureRepository } from '../../../../domain/admin/procedures/admin-procedure.repository';
import {
    AdminProcedureListItem,
    AdminProcedureDetail,
    CreateProcedureInput,
    UpdateProcedureInput,
    AdminProcedureFilters,
    AdminProcedurePagination,
    AdminProcedureSort,
    PaginatedResult,
} from '../../../../domain/admin/procedures/admin-procedure.types';

export class PrismaAdminProcedureRepository implements AdminProcedureRepository {
    async findAll(
        filters: AdminProcedureFilters,
        pagination: AdminProcedurePagination,
        sort: AdminProcedureSort
    ): Promise<PaginatedResult<AdminProcedureListItem>> {
        const where: any = {};

        if (filters.isActive !== undefined) {
            where.isActive = filters.isActive;
        }

        if (filters.facultyId) {
            where.facultyId = filters.facultyId;
        }

        if (filters.careerId) {
            where.careerId = filters.careerId;
        }

        if (filters.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        const skip = (pagination.page - 1) * pagination.limit;

        const [procedures, total] = await Promise.all([
            prisma.procedureType.findMany({
                where,
                skip,
                take: pagination.limit,
                orderBy: { [sort.field]: sort.direction },
                include: {
                    faculty: { select: { id: true, name: true } },
                    career: { select: { id: true, name: true } },
                    procedureRequirements: true,
                },
            }),
            prisma.procedureType.count({ where }),
        ]);

        return {
            data: procedures.map((p: any) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                requirementsText: p.requirementsText,
                isActive: p.isActive,
                facultyId: p.facultyId,
                careerId: p.careerId,
                facultyName: p.faculty?.name ?? null,
                careerName: p.career?.name ?? null,
                requirementsCount: p.procedureRequirements.length,
                createdAt: p.createdAt?.toISOString?.() ?? new Date().toISOString(),
                updatedAt: p.updatedAt?.toISOString?.() ?? new Date().toISOString(),
            })),
            total,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(total / pagination.limit),
        };
    }

    async findById(id: string): Promise<AdminProcedureDetail | null> {
        const procedure = await prisma.procedureType.findUnique({
            where: { id },
            include: {
                faculty: { select: { id: true, name: true } },
                career: { select: { id: true, name: true } },
                procedureRequirements: true,
            },
        });

        if (!procedure) return null;

        return {
            id: procedure.id,
            name: procedure.name,
            description: procedure.description,
            requirementsText: procedure.requirementsText,
            isActive: procedure.isActive,
            facultyId: procedure.facultyId,
            careerId: procedure.careerId,
            facultyName: procedure.faculty?.name ?? null,
            careerName: procedure.career?.name ?? null,
            requirements: procedure.procedureRequirements.map((r: any) => ({
                id: r.id,
                name: r.name,
                description: r.description,
                isMandatory: r.isMandatory,
            })),
        };
    }

    async findByName(name: string): Promise<AdminProcedureDetail | null> {
        const procedure = await prisma.procedureType.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } },
            include: {
                faculty: { select: { id: true, name: true } },
                career: { select: { id: true, name: true } },
                procedureRequirements: true,
            },
        });
        if (!procedure) return null;
        return this.mapToDetail(procedure);
    }

    async existsFaculty(facultyId: string): Promise<boolean> {
        const count = await prisma.faculty.count({ where: { id: facultyId } });
        return count > 0;
    }

    async existsCareer(careerId: string): Promise<boolean> {
        const count = await prisma.career.count({ where: { id: careerId } });
        return count > 0;
    }

    async create(input: CreateProcedureInput): Promise<AdminProcedureDetail> {
        const procedure = await prisma.procedureType.create({
            data: {
                name: input.name,
                description: input.description,
                requirementsText: input.requirementsText ?? '',
                facultyId: input.facultyId ?? null,
                careerId: input.careerId ?? null,
                isActive: input.isActive ?? true,
                procedureRequirements: input.requirements?.length
                    ? {
                          create: input.requirements.map((r) => ({
                              name: r.name,
                              description: r.description,
                              isMandatory: r.isMandatory ?? true,
                          })),
                      }
                    : undefined,
            },
            include: {
                faculty: { select: { id: true, name: true } },
                career: { select: { id: true, name: true } },
                procedureRequirements: true,
            },
        });

        return this.mapToDetail(procedure);
    }

    async update(id: string, input: UpdateProcedureInput): Promise<AdminProcedureDetail> {
        if (input.requirements) {
            await prisma.procedureRequirement.deleteMany({
                where: { procedureTypeId: id },
            });
        }

        const procedure = await prisma.procedureType.update({
            where: { id },
            data: {
                ...(input.name !== undefined && { name: input.name }),
                ...(input.description !== undefined && { description: input.description }),
                ...(input.requirementsText !== undefined && { requirementsText: input.requirementsText }),
                ...(input.facultyId !== undefined && { facultyId: input.facultyId }),
                ...(input.careerId !== undefined && { careerId: input.careerId }),
                ...(input.isActive !== undefined && { isActive: input.isActive }),
                ...(input.requirements && {
                    procedureRequirements: {
                        create: input.requirements.map((r) => ({
                            name: r.name,
                            description: r.description,
                            isMandatory: r.isMandatory ?? true,
                        })),
                    },
                }),
            },
            include: {
                faculty: { select: { id: true, name: true } },
                career: { select: { id: true, name: true } },
                procedureRequirements: true,
            },
        });

        return this.mapToDetail(procedure);
    }

    async countActiveRequests(procedureTypeId: string): Promise<number> {
        return prisma.procedureRequest.count({
            where: {
                procedureTypeId,
                status: { in: ['pending', 'in_review'] },
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.procedureType.update({
            where: { id },
            data: { isActive: false },
        });
    }

    private mapToDetail(procedure: any): AdminProcedureDetail {
        return {
            id: procedure.id,
            name: procedure.name,
            description: procedure.description,
            requirementsText: procedure.requirementsText,
            isActive: procedure.isActive,
            facultyId: procedure.facultyId,
            careerId: procedure.careerId,
            facultyName: procedure.faculty?.name ?? null,
            careerName: procedure.career?.name ?? null,
            requirements: procedure.procedureRequirements.map((r: any) => ({
                id: r.id,
                name: r.name,
                description: r.description,
                isMandatory: r.isMandatory,
            })),
        };
    }
}
