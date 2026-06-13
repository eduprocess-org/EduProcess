import { Router } from 'express';
import multer from 'multer';
import { ProcedureController } from '../controllers/procedure.controller';
import { ProcedureService } from '../../../application/procedures/procedure.service';
import { PrismaProcedureRepository } from '../../persistence/prisma/prisma-procedure.repository';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Configure multer to store files in memory
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit per file
    },
});

// Dependency Injection
const repository = new PrismaProcedureRepository();
const service = new ProcedureService(repository);
const controller = new ProcedureController(service);

// Catalog Routes
router.get('/procedures', authMiddleware, controller.getProcedures);
router.get('/procedures/:id', authMiddleware, controller.getProcedureDetails);

// Requests Routes
router.get('/requests', authMiddleware, controller.getStudentRequests);
router.post('/requests', authMiddleware, upload.array('documents'), controller.createRequest);
router.get('/requests/:id/tracking', authMiddleware, controller.getRequestTracking);

export default router;
