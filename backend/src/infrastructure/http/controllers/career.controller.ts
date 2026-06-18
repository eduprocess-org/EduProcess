import { Request, Response } from 'express';
import { prisma } from '../../persistence/database.config';

export class CareerController {
    getAll = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const careers = await prisma.career.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    faculty: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: { name: 'asc' },
            });

            return res.status(200).json({
                success: true,
                data: careers,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unexpected error';
            return res.status(500).json({
                success: false,
                message,
            });
        }
    };
}
