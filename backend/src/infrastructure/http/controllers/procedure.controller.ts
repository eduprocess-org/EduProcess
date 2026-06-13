import { Request, Response } from 'express';
import { ProcedureService } from '../../../application/procedures/procedure.service';

interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export class ProcedureController {
    constructor(private readonly procedureService: ProcedureService) {}

    public getProcedures = async (req: Request, res: Response) => {
        try {
            const procedures = await this.procedureService.getAllProcedures();
            res.status(200).json({ success: true, data: procedures });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    public getProcedureDetails = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const procedure = await this.procedureService.getProcedureDetails(id);
            res.status(200).json({ success: true, data: procedure });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    public createRequest = async (req: AuthRequest, res: Response) => {
        try {
            const studentId = req.user?.userId;
            if (!studentId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const { procedureId } = req.body;
            if (!procedureId) {
                return res.status(400).json({ success: false, message: 'procedureId is required' });
            }

            const files = req.files as Express.Multer.File[];
            if (!files || files.length === 0) {
                return res.status(400).json({ success: false, message: 'At least one document is required' });
            }

            const request = await this.procedureService.createRequest(studentId, procedureId, files);
            res.status(201).json({ success: true, data: request });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    public getStudentRequests = async (req: AuthRequest, res: Response) => {
        try {
            const studentId = req.user?.userId;
            if (!studentId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const requests = await this.procedureService.getStudentRequests(studentId);
            res.status(200).json({ success: true, data: requests });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    public getRequestTracking = async (req: AuthRequest, res: Response) => {
        try {
            const studentId = req.user?.userId;
            if (!studentId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const { id } = req.params;
            const tracking = await this.procedureService.getRequestTracking(id, studentId);
            res.status(200).json({ success: true, data: tracking });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    private handleError(error: unknown, res: Response) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        
        if (message === 'Procedure not found' || message === 'Request not found or unauthorized') {
            return res.status(404).json({ success: false, message });
        }

        if (message === 'Failed to upload document') {
            return res.status(502).json({ success: false, message }); // Bad Gateway
        }

        console.error('ProcedureController Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
