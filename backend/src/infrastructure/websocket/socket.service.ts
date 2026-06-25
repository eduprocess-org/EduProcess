import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { logger } from '../config/logger.config';

export class SocketService {
    private static instance: SocketService | null = null;
    private io: Server | null = null;

    private constructor() {}

    static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    initialize(httpServer: HttpServer): void {
        if (this.io) {
            logger.warn('Socket.IO ya fue inicializado');
            return;
        }

        this.io = new Server(httpServer, {
            cors: {
                origin: process.env.FRONTEND_URL || 'http://localhost:5173',
                methods: ['GET', 'POST'],
                credentials: true,
            },
            pingTimeout: 60000,
            pingInterval: 25000,
        });

        this.setupConnectionHandling();
        logger.info('Socket.IO inicializado correctamente');
    }

    private setupConnectionHandling(): void {
        if (!this.io) return;

        this.io.on('connection', (socket: Socket) => {
            logger.info(`Cliente conectado: ${socket.id}`);

            socket.on('join:user', (userId: string) => {
                socket.join(`user:${userId}`);
                logger.info(`Socket ${socket.id} unido a sala user:${userId}`);
            });

            socket.on('join:admin', () => {
                socket.join('admins');
                logger.info(`Socket ${socket.id} unido a sala admins`);
            });

            socket.on('disconnect', (reason: string) => {
                logger.info(`Cliente desconectado: ${socket.id}, razón: ${reason}`);
            });
        });
    }

    emitToUser(userId: string, event: string, data: unknown): void {
        if (!this.io) {
            logger.warn('Socket.IO no inicializado, no se puede emitir evento');
            return;
        }
        this.io.to(`user:${userId}`).emit(event, data);
    }

    emitToAdmins(event: string, data: unknown): void {
        if (!this.io) {
            logger.warn('Socket.IO no inicializado, no se puede emitir evento');
            return;
        }
        this.io.to('admins').emit(event, data);
    }

    emitToAll(event: string, data: unknown): void {
        if (!this.io) {
            logger.warn('Socket.IO no inicializado, no se puede emitir evento');
            return;
        }
        this.io.emit(event, data);
    }

    getIO(): Server | null {
        return this.io;
    }

    isInitialized(): boolean {
        return this.io !== null;
    }
}
