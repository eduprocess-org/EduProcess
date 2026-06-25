import { Request, Response } from 'express';
import { AdminProcedureService } from '../../../application/admin/procedures/admin-procedure.service';
import { handleError } from '../utils/error-handler';

export class AdminProcedureController {
    constructor(private readonly adminProcedureService: AdminProcedureService) {}

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const { search, isActive, facultyId, careerId, page, limit, sortBy, order } = req.query;

            const filters = {
                search: search as string | undefined,
                isActive: isActive !== undefined ? isActive === 'true' : undefined,
                facultyId: facultyId as string | undefined,
                careerId: careerId as string | undefined,
            };

            const pagination = {
                page: page ? parseInt(page as string, 10) : 1,
                limit: limit ? parseInt(limit as string, 10) : 10,
            };

            const sort = {
                field: (sortBy as 'name' | 'createdAt' | 'updatedAt') || 'createdAt',
                direction: (order as 'asc' | 'desc') || 'desc',
            };

            const result = await this.adminProcedureService.getAllProcedures(filters, pagination, sort);
            res.status(200).json({ success: true, data: result.data, pagination: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages } });
        } catch (error) {
            handleError(error, res, 'AdminProcedureController');
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const procedure = await this.adminProcedureService.getProcedureById(id);
            res.status(200).json({ success: true, data: procedure });
        } catch (error) {
            handleError(error, res, 'AdminProcedureController');
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const procedure = await this.adminProcedureService.createProcedure(req.body);
            res.status(201).json({ success: true, data: procedure });
        } catch (error) {
            handleError(error, res, 'AdminProcedureController');
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const procedure = await this.adminProcedureService.updateProcedure(id, req.body);
            res.status(200).json({ success: true, data: procedure });
        } catch (error) {
            handleError(error, res, 'AdminProcedureController');
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.adminProcedureService.deleteProcedure(id);
            res.status(200).json({ success: true, message: 'Procedure deleted successfully' });
        } catch (error) {
            handleError(error, res, 'AdminProcedureController');
        }
    };
}
