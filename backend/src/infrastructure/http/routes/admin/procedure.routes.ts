import { Router } from 'express';
import { AdminProcedureController } from '../../controllers/admin/procedure.controller';
import { AdminProcedureService } from '../../../../application/admin/procedures/admin-procedure.service';
import { PrismaAdminProcedureRepository } from '../../../persistence/prisma/admin/prisma-admin-procedure.repository';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { adminMiddleware } from '../../middlewares/admin.middleware';

const router = Router();

const repository = new PrismaAdminProcedureRepository();
const service = new AdminProcedureService(repository);
const controller = new AdminProcedureController(service);

router.get('/admin/procedures', authMiddleware, adminMiddleware, controller.getAll);
router.get('/admin/procedures/:id', authMiddleware, adminMiddleware, controller.getById);
router.post('/admin/procedures', authMiddleware, adminMiddleware, controller.create);
router.put('/admin/procedures/:id', authMiddleware, adminMiddleware, controller.update);
router.delete('/admin/procedures/:id', authMiddleware, adminMiddleware, controller.delete);

export default router;
