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
    adminName?: string; // Optional: computed or fetched relation
}

export interface ProcedureRequestDTO {
    id: string;
    studentId: string;
    procedureTypeId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    procedure?: Partial<ProcedureTypeDTO>;
    documents?: UploadedDocumentDTO[];
    observations?: ObservationDTO[];
}

// Input Types

export interface CreateRequestInput {
    studentId: string;
    procedureTypeId: string;
    documents: Array<{
        fileName: string;
        fileUrl: string;
    }>;
}
