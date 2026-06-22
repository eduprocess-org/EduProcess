import { Request, Response } from 'express';
import { ProcedureService } from '../../../application/procedures/procedure.service';
import { handleError } from '../utils/error-handler';

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
            handleError(error, res, "ProcedureController");
        }
    };

    public getProcedureDetails = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const procedure = await this.procedureService.getProcedureDetails(id);
            res.status(200).json({ success: true, data: procedure });
        } catch (error) {
            handleError(error, res, "ProcedureController");
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
            handleError(error, res, "ProcedureController");
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
            handleError(error, res, "ProcedureController");
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
            handleError(error, res, "ProcedureController");
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
            handleError(error, res, "ProcedureController");
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
            handleError(error, res, "ProcedureController");
        }
    };

    public adminGetRequestTimeline = async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const timeline = await this.procedureService.adminGetRequestTimeline(id);
            res.status(200).json({ success: true, data: timeline });
        } catch (error) {
            handleError(error, res, "ProcedureController");
        }
    };
}
