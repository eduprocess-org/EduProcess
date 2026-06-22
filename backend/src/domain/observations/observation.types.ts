export interface ObservationDTO {
    id: string;
    requestId: string;
    adminId: string;
    comment: string;
    createdAt: Date;
    adminName?: string;
}

export interface CreateObservationInput {
    requestId: string;
    adminId: string;
    comment: string;
}
