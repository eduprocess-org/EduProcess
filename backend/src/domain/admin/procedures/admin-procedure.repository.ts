import {
    AdminProcedureListItem,
    AdminProcedureDetail,
    CreateProcedureInput,
    UpdateProcedureInput,
    AdminProcedureFilters,
    AdminProcedurePagination,
    AdminProcedureSort,
    PaginatedResult,
} from './admin-procedure.types';

export interface AdminProcedureRepository {
    findAll(
        filters: AdminProcedureFilters,
        pagination: AdminProcedurePagination,
        sort: AdminProcedureSort
    ): Promise<PaginatedResult<AdminProcedureListItem>>;

    findById(id: string): Promise<AdminProcedureDetail | null>;

    create(input: CreateProcedureInput): Promise<AdminProcedureDetail>;

    update(id: string, input: UpdateProcedureInput): Promise<AdminProcedureDetail>;

    delete(id: string): Promise<void>;
}
