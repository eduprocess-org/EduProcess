import { SocketService } from './socket.service';

export interface StatusChangeEvent {
    requestId: string;
    studentId: string;
    oldStatus: string;
    newStatus: string;
    procedureName: string;
    updatedAt: string;
}

export interface NewRequestEvent {
    requestId: string;
    studentName: string;
    procedureName: string;
    career: string;
    status: string;
    createdAt: string;
}

export interface ObservationEvent {
    requestId: string;
    studentId: string;
    observationId: string;
    comment: string;
    adminName: string;
    createdAt: string;
}

export class SocketEvents {
    constructor(private socketService: SocketService) {}

    notifyStatusChange(event: StatusChangeEvent): void {
        this.socketService.emitToUser(event.studentId, 'request:statusChanged', {
            requestId: event.requestId,
            oldStatus: event.oldStatus,
            newStatus: event.newStatus,
            procedureName: event.procedureName,
            updatedAt: event.updatedAt,
        });

        this.socketService.emitToAdmins('dashboard:requestUpdated', {
            requestId: event.requestId,
            newStatus: event.newStatus,
            updatedAt: event.updatedAt,
        });
    }

    notifyNewRequest(event: NewRequestEvent): void {
        this.socketService.emitToAdmins('dashboard:newRequest', {
            requestId: event.requestId,
            studentName: event.studentName,
            procedureName: event.procedureName,
            career: event.career,
            status: event.status,
            createdAt: event.createdAt,
        });
    }

    notifyNewObservation(event: ObservationEvent): void {
        this.socketService.emitToUser(event.studentId, 'request:newObservation', {
            requestId: event.requestId,
            observationId: event.observationId,
            comment: event.comment,
            adminName: event.adminName,
            createdAt: event.createdAt,
        });

        this.socketService.emitToAdmins('dashboard:newObservation', {
            requestId: event.requestId,
            adminName: event.adminName,
            createdAt: event.createdAt,
        });
    }
}
