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

    findByName(name: string): Promise<AdminProcedureDetail | null>;

    existsFaculty(facultyId: string): Promise<boolean>;

    existsCareer(careerId: string): Promise<boolean>;

    create(input: CreateProcedureInput): Promise<AdminProcedureDetail>;

    update(id: string, input: UpdateProcedureInput): Promise<AdminProcedureDetail>;

    countActiveRequests(procedureTypeId: string): Promise<number>;

    delete(id: string): Promise<void>;
}
