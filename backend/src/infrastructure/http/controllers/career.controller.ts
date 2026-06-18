import { Request, Response } from 'express';
import { CareerService } from '../../../application/career/career.service';
import { handleError } from '../utils/error-handler';

export class CareerController {
    constructor(private readonly careerService: CareerService) {}

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const careers = await this.careerService.getAllCareers();
            res.status(200).json({ success: true, data: careers });
        } catch (error) {
            handleError(error, res, "CareerController");
        }
    };
}
