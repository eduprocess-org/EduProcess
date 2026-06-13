import {
    CreateRequestInput,
    ProcedureRequestDTO,
    ProcedureTypeDTO,
} from './procedure.types';

export interface ProcedureRepository {
    findAllActive(): Promise<ProcedureTypeDTO[]>;
    findById(id: string): Promise<ProcedureTypeDTO | null>;
    createRequest(input: CreateRequestInput): Promise<ProcedureRequestDTO>;
    findRequestsByStudent(studentId: string): Promise<ProcedureRequestDTO[]>;
    findRequestTracking(requestId: string, studentId: string): Promise<ProcedureRequestDTO | null>;
}
