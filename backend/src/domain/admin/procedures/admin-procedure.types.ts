export interface AdminProcedureListItem {
    id: string;
    name: string;
    description: string;
    requirementsText: string;
    isActive: boolean;
    facultyId: string | null;
    careerId: string | null;
    facultyName: string | null;
    careerName: string | null;
    requirementsCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdminProcedureDetail {
    id: string;
    name: string;
    description: string;
    requirementsText: string;
    isActive: boolean;
    facultyId: string | null;
    careerId: string | null;
    facultyName: string | null;
    careerName: string | null;
    requirements: AdminProcedureRequirement[];
}

export interface AdminProcedureRequirement {
    id: string;
    name: string;
    description: string;
    isMandatory: boolean;
}

export interface CreateProcedureInput {
    name: string;
    description: string;
    requirementsText: string;
    facultyId?: string | null;
    careerId?: string | null;
    isActive?: boolean;
    requirements?: Array<{
        name: string;
        description: string;
        isMandatory?: boolean;
    }>;
}

export interface UpdateProcedureInput {
    name?: string;
    description?: string;
    requirementsText?: string;
    facultyId?: string | null;
    careerId?: string | null;
    isActive?: boolean;
    requirements?: Array<{
        id?: string;
        name: string;
        description: string;
        isMandatory?: boolean;
    }>;
}

export interface AdminProcedureFilters {
    search?: string;
    isActive?: boolean;
    facultyId?: string;
    careerId?: string;
}

export interface AdminProcedurePagination {
    page: number;
    limit: number;
}

export interface AdminProcedureSort {
    field: 'name' | 'createdAt' | 'updatedAt';
    direction: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
