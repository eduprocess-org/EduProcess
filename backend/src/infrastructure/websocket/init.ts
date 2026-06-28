import { createServer, Server as HttpServer } from 'http';
import { Application } from 'express';
import { SocketService } from './socket.service';
import { SocketEvents } from './socket.events';

let httpServer: HttpServer | null = null;
let socketEvents: SocketEvents | null = null;

export function initializeWebSocket(app: Application): { httpServer: HttpServer; socketEvents: SocketEvents } {
    if (httpServer && socketEvents) {
        return { httpServer, socketEvents };
    }

    httpServer = createServer(app);
    const socketService = SocketService.getInstance();
    socketService.initialize(httpServer);
    socketEvents = new SocketEvents(socketService);

    return { httpServer, socketEvents };
}

export function getSocketEvents(): SocketEvents | null {
    return socketEvents;
}
