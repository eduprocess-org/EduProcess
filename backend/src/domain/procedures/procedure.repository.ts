import {
    CreateRequestInput,
    ProcedureRequestDTO,
    ProcedureTypeDTO,
    UpdateStatusInput,
    AuditLogEntryDTO,
} from './procedure.types';

export interface ProcedureRepository {
    findAllActive(): Promise<ProcedureTypeDTO[]>;
    findById(id: string): Promise<ProcedureTypeDTO | null>;
    createRequest(input: CreateRequestInput): Promise<ProcedureRequestDTO>;
    findRequestsByStudent(studentId: string): Promise<ProcedureRequestDTO[]>;
    findRequestTracking(requestId: string, studentId: string): Promise<ProcedureRequestDTO | null>;
    findByIdWithoutAuth(requestId: string): Promise<ProcedureRequestDTO | null>;
    updateStatus(input: UpdateStatusInput): Promise<ProcedureRequestDTO>;
    createAuditLog(requestId: string, userId: string, action: string, oldValue: string | null, newValue: string | null): Promise<AuditLogEntryDTO>;
    findAuditLogsByRequest(requestId: string): Promise<AuditLogEntryDTO[]>;
}
