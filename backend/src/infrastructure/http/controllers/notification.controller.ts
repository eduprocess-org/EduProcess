import { Request, Response } from 'express';
import { NotificationService } from '../../../application/notifications/notification.service';
import { handleError } from '../utils/error-handler';

interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    public getNotifications = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const notifications = await this.notificationService.getNotifications(userId);

            const mapped = notifications.map((n) => ({
                id: n.id,
                title: n.title,
                message: n.message,
                type: n.type,
                read: n.isRead,
                createdAt: n.createdAt,
                userId: n.userId,
            }));

            res.status(200).json({ success: true, data: mapped });
        } catch (error) {
            handleError(error, res, 'NotificationController');
        }
    };

    public markAsRead = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const { id } = req.params;
            await this.notificationService.markAsRead(id, userId);

            res.status(200).json({ success: true, message: 'Notification marked as read' });
        } catch (error) {
            handleError(error, res, 'NotificationController');
        }
    };

    public markAllAsRead = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            await this.notificationService.markAllAsRead(userId);

            res.status(200).json({ success: true, message: 'All notifications marked as read' });
        } catch (error) {
            handleError(error, res, 'NotificationController');
        }
    };
}
