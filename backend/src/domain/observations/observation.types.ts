export interface ObservationDTO {
    id: string;
    requestId: string;
    adminId: string;
    comment: string;
    createdAt: Date;
    adminName?: string;
    studentId?: string;
}

export interface CreateObservationInput {
    requestId: string;
    adminId: string;
    comment: string;
    adminName?: string;
}
