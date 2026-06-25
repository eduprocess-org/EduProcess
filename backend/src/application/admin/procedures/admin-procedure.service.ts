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
        if (!input.name || input.name.trim().length === 0) {
            throw new Error('Procedure name is required');
        }
        if (!input.description || input.description.trim().length === 0) {
            throw new Error('Procedure description is required');
        }

        logger.info('Creating procedure', { name: input.name });
        return this.adminProcedureRepository.create({
            ...input,
            name: input.name.trim(),
            description: input.description.trim(),
            requirementsText: input.requirementsText?.trim() ?? '',
        });
    }

    async updateProcedure(id: string, input: UpdateProcedureInput): Promise<AdminProcedureDetail> {
        const existing = await this.adminProcedureRepository.findById(id);
        if (!existing) {
            throw new Error('Procedure not found');
        }

        logger.info('Updating procedure', { procedureId: id });
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
