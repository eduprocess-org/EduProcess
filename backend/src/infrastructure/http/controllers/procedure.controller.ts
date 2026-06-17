import { Request, Response } from 'express';
import multer from 'multer';
import { ProcedureService } from '../../../application/procedures/procedure.service';
import { logger } from '../../config/logger.config';

interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export class ProcedureController {
    constructor(private readonly procedureService: ProcedureService) {}

    public getProcedures = async (req: AuthRequest, res: Response) => {
        try {
            const studentId = req.user?.userId;
            const procedures = await this.procedureService.getAllProcedures(studentId);
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

            const { procedureId, semester, reason } = req.body;
            if (!procedureId) {
                return res.status(400).json({ success: false, message: 'procedureId is required' });
            }

            const files = req.files as Express.Multer.File[];
            if (!files || files.length === 0) {
                return res.status(400).json({ success: false, message: 'At least one document is required' });
            }

            const request = await this.procedureService.createRequest(studentId, procedureId, files, { semester, reason });
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

    public updateRequestStatus = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user?.userId;
            const userRole = req.user?.role;
            if (!userId || !userRole) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const { id } = req.params;
            const { status, comment } = req.body;

            if (!status) {
                return res.status(400).json({ success: false, message: 'status is required' });
            }

            const request = await this.procedureService.updateRequestStatus(
                id,
                status,
                userId,
                userRole,
                comment
            );

            res.status(200).json({ success: true, data: request });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    public getRequestTimeline = async (req: AuthRequest, res: Response) => {
        try {
            const studentId = req.user?.userId;
            if (!studentId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const { id } = req.params;
            const timeline = await this.procedureService.getRequestTimeline(id, studentId);
            res.status(200).json({ success: true, data: timeline });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    public adminGetRequestTimeline = async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const timeline = await this.procedureService.adminGetRequestTimeline(id);
            res.status(200).json({ success: true, data: timeline });
        } catch (error) {
            this.handleError(error, res);
        }
    };

    private handleError(error: unknown, res: Response) {
        if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ success: false, message: 'File exceeds the 5MB size limit' });
        }

        const message = error instanceof Error ? error.message : 'Internal server error';

        if (message.startsWith('Unsupported file type')) {
            return res.status(400).json({ success: false, message });
        }

        if (message === 'Procedure not found' || message === 'Request not found or unauthorized') {
            return res.status(404).json({ success: false, message });
        }

        if (message === 'Procedure is not available for new requests') {
            return res.status(409).json({ success: false, message });
        }

        if (message === 'Failed to upload document') {
            return res.status(502).json({ success: false, message });
        }

        if (message.startsWith('Invalid status transition')) {
            return res.status(422).json({ success: false, message });
        }

        if (message === 'Only administrators can update request status') {
            return res.status(403).json({ success: false, message });
        }

        logger.error('Unhandled error in ProcedureController', { error: message });
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
