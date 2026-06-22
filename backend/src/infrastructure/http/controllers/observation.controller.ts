import { Request, Response } from 'express';
import { ObservationService } from '../../../application/observations/observation.service';
import { handleError } from '../utils/error-handler';

interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export class ObservationController {
    constructor(private readonly observationService: ObservationService) {}

    createObservation = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const userRole = req.user?.role;
            if (!userId || !userRole) {
                res.status(401).json({ success: false, message: 'Unauthorized' });
                return;
            }

            const { requestId } = req.params;
            const { comment } = req.body;

            if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
                res.status(400).json({ success: false, message: 'comment is required' });
                return;
            }

            const observation = await this.observationService.createObservation({
                requestId,
                adminId: userId,
                comment,
            });

            res.status(201).json({ success: true, data: observation });
        } catch (error) {
            handleError(error, res, 'ObservationController');
        }
    };

    getObservationsByRequest = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { requestId } = req.params;
            const observations = await this.observationService.getObservationsByRequest(requestId);
            res.status(200).json({ success: true, data: observations });
        } catch (error) {
            handleError(error, res, 'ObservationController');
        }
    };

    getObservationById = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const observation = await this.observationService.getObservationById(id);
            res.status(200).json({ success: true, data: observation });
        } catch (error) {
            handleError(error, res, 'ObservationController');
        }
    };

    deleteObservation = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.observationService.deleteObservation(id);
            res.status(200).json({ success: true, message: 'Observation deleted successfully' });
        } catch (error) {
            handleError(error, res, 'ObservationController');
        }
    };
}
