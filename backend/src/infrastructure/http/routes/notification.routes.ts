import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../../../application/notifications/notification.service';
import { PrismaNotificationRepository } from '../../persistence/prisma/notification/prisma-notification.repository';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const repository = new PrismaNotificationRepository();
const service = new NotificationService(repository);
const controller = new NotificationController(service);

router.get('/notifications', authMiddleware, controller.getNotifications);
router.patch('/notifications/:id/read', authMiddleware, controller.markAsRead);
router.patch('/notifications/read-all', authMiddleware, controller.markAllAsRead);

export default router;
