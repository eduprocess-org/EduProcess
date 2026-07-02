export type NotificationType =
    | 'REQUEST_CREATED'
    | 'REQUEST_UPDATED'
    | 'REQUEST_APPROVED'
    | 'REQUEST_REJECTED'
    | 'ADMIN_OBSERVATION';

export interface NotificationDTO {
    id: string;
    title: string;
    message: string;
    type: NotificationType | null;
    isRead: boolean;
    createdAt: Date;
    userId: string;
}

export interface CreateNotificationInput {
    userId: string;
    title: string;
    message: string;
    typeName?: NotificationType;
}
