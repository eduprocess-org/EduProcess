export interface ProcedureRequirementDTO {
    id: string;
    name: string;
    description: string;
    isMandatory: boolean;
}

export interface ProcedureTypeDTO {
    id: string;
    name: string;
    description: string;
    requirementsText: string;
    isActive: boolean;
    requirements?: ProcedureRequirementDTO[];
}

export interface UploadedDocumentDTO {
    id: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: Date;
}

export interface ObservationDTO {
    id: string;
    comment: string;
    createdAt: Date;
    adminName?: string;
}

export interface ProcedureRequestDTO {
    id: string;
    studentId: string;
    procedureTypeId: string;
    career?: string;
    semester?: string;
    reason?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    procedure?: Partial<ProcedureTypeDTO>;
    documents?: UploadedDocumentDTO[];
    observations?: ObservationDTO[];
    auditLogs?: AuditLogEntryDTO[];
}

export interface AuditLogEntryDTO {
    id: string;
    action: string;
    oldValue: string | null;
    newValue: string | null;
    createdAt: Date;
    adminName?: string;
}

export interface CreateRequestInput {
    studentId: string;
    procedureTypeId: string;
    career?: string;
    semester?: string;
    reason?: string;
    documents: Array<{
        fileName: string;
        fileUrl: string;
    }>;
}

export interface UpdateStatusInput {
    requestId: string;
    newStatus: string;
    userId: string;
    comment?: string;
}
