import { Router } from 'express';
import { ObservationController } from '../controllers/observation.controller';
import { ObservationService } from '../../../application/observations/observation.service';
import { PrismaObservationRepository } from '../../persistence/prisma/observation/prisma-observation.repository';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { getSocketEvents } from '../../websocket';

const router = Router();

const repository = new PrismaObservationRepository();
const socketEvents = getSocketEvents();
const service = new ObservationService(repository, socketEvents ?? undefined);
const controller = new ObservationController(service);

router.post(
    '/admin/requests/:requestId/observations',
    authMiddleware,
    adminMiddleware,
    controller.createObservation
);

router.get(
    '/admin/requests/:requestId/observations',
    authMiddleware,
    adminMiddleware,
    controller.getObservationsByRequest
);

router.get(
    '/admin/observations/:id',
    authMiddleware,
    adminMiddleware,
    controller.getObservationById
);

router.delete(
    '/admin/observations/:id',
    authMiddleware,
    adminMiddleware,
    controller.deleteObservation
);

export default router;
