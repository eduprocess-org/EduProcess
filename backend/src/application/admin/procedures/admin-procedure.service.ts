import { AdminProcedureRepository } from '../../../domain/admin/procedures/admin-procedure.repository';
import {
    AdminProcedureListItem,
    AdminProcedureDetail,
    CreateProcedureInput,
    UpdateProcedureInput,
    AdminProcedureFilters,
    AdminProcedurePagination,
    AdminProcedureSort,
    PaginatedResult,
} from '../../../domain/admin/procedures/admin-procedure.types';
import { logger } from '../../../infrastructure/config/logger.config';

export class AdminProcedureService {
    constructor(private readonly adminProcedureRepository: AdminProcedureRepository) {}

    async getAllProcedures(
        filters: AdminProcedureFilters,
        pagination: AdminProcedurePagination,
        sort: AdminProcedureSort
    ): Promise<PaginatedResult<AdminProcedureListItem>> {
        return this.adminProcedureRepository.findAll(filters, pagination, sort);
    }

    async getProcedureById(id: string): Promise<AdminProcedureDetail> {
        const procedure = await this.adminProcedureRepository.findById(id);
        if (!procedure) {
            throw new Error('Procedure not found');
        }
        return procedure;
    }

    async createProcedure(input: CreateProcedureInput): Promise<AdminProcedureDetail> {
        const name = input.name?.trim();
        if (!name) {
            throw new Error('Procedure name is required');
        }
        if (name.length < 3) {
            throw new Error('Procedure name must be at least 3 characters');
        }
        if (name.length > 200) {
            throw new Error('Procedure name must not exceed 200 characters');
        }

        const description = input.description?.trim();
        if (!description) {
            throw new Error('Procedure description is required');
        }
        if (description.length > 2000) {
            throw new Error('Procedure description must not exceed 2000 characters');
        }

        const existing = await this.adminProcedureRepository.findByName(name);
        if (existing) {
            throw new Error('Procedure with this name already exists');
        }

        if (input.facultyId) {
            const facultyExists = await this.adminProcedureRepository.existsFaculty(input.facultyId);
            if (!facultyExists) {
                throw new Error('Specified faculty does not exist');
            }
        }

        if (input.careerId) {
            const careerExists = await this.adminProcedureRepository.existsCareer(input.careerId);
            if (!careerExists) {
                throw new Error('Specified career does not exist');
            }
        }

        if (input.requirements?.length) {
            for (const req of input.requirements) {
                if (!req.name?.trim()) {
                    throw new Error('Each requirement must have a name');
                }
            }
        }

        logger.info('Creating procedure', { name });
        return this.adminProcedureRepository.create({
            ...input,
            name,
            description,
            requirementsText: input.requirementsText?.trim() ?? '',
        });
    }

    async updateProcedure(id: string, input: UpdateProcedureInput): Promise<AdminProcedureDetail> {
        const existing = await this.adminProcedureRepository.findById(id);
        if (!existing) {
            throw new Error('Procedure not found');
        }

        if (input.name !== undefined) {
            const name = input.name.trim();
            if (!name) {
                throw new Error('Procedure name is required');
            }
            if (name.length < 3) {
                throw new Error('Procedure name must be at least 3 characters');
            }
            if (name.length > 200) {
                throw new Error('Procedure name must not exceed 200 characters');
            }

            const duplicate = await this.adminProcedureRepository.findByName(name);
            if (duplicate && duplicate.id !== id) {
                throw new Error('Procedure with this name already exists');
            }

            input.name = name;
        }

        if (input.description !== undefined) {
            const description = input.description.trim();
            if (!description) {
                throw new Error('Procedure description is required');
            }
            if (description.length > 2000) {
                throw new Error('Procedure description must not exceed 2000 characters');
            }
            input.description = description;
        }

        if (input.facultyId !== undefined && input.facultyId !== null) {
            const facultyExists = await this.adminProcedureRepository.existsFaculty(input.facultyId);
            if (!facultyExists) {
                throw new Error('Specified faculty does not exist');
            }
        }

        if (input.careerId !== undefined && input.careerId !== null) {
            const careerExists = await this.adminProcedureRepository.existsCareer(input.careerId);
            if (!careerExists) {
                throw new Error('Specified career does not exist');
            }
        }

        if (input.requirements?.length) {
            for (const req of input.requirements) {
                if (!req.name?.trim()) {
                    throw new Error('Each requirement must have a name');
                }
            }
        }

        logger.info('Updating procedure', { procedureId: id, fields: Object.keys(input) });
        return this.adminProcedureRepository.update(id, input);
    }

    async deleteProcedure(id: string): Promise<void> {
        const existing = await this.adminProcedureRepository.findById(id);
        if (!existing) {
            throw new Error('Procedure not found');
        }

        logger.info('Deleting procedure', { procedureId: id });
        await this.adminProcedureRepository.delete(id);
    }
}
