import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { ProcedureController } from '../controllers/procedure.controller';
import { ProcedureService } from '../../../application/procedures/procedure.service';
import { PrismaProcedureRepository } from '../../persistence/prisma/procedure/prisma-procedure.repository';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { getSocketEvents } from '../../websocket';

const router = Router();

const ACCEPTED_MIME_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        if (ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Unsupported file type: ${file.mimetype}. Accepted: PDF, DOCX, JPEG, PNG`));
        }
    },
});

const handleMulterError = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File exceeds the 5MB size limit' });
    }
    if (err?.message?.startsWith('Unsupported file type')) {
        return res.status(400).json({ success: false, message: err.message });
    }
    next(err);
};

const repository = new PrismaProcedureRepository();
const socketEvents = getSocketEvents();
const service = new ProcedureService(repository, socketEvents ?? undefined);
const controller = new ProcedureController(service);

router.get('/procedures', authMiddleware, controller.getProcedures);
router.get('/procedures/:id', authMiddleware, controller.getProcedureDetails);

router.get('/requests', authMiddleware, controller.getStudentRequests);
router.post('/requests', authMiddleware, upload.array('documents'), controller.createRequest);
router.use(handleMulterError);
router.get('/requests/:id/tracking', authMiddleware, controller.getRequestTracking);
router.get('/requests/:id/timeline', authMiddleware, controller.getRequestTimeline);

router.patch('/requests/:id/status', authMiddleware, adminMiddleware, controller.updateRequestStatus);

router.get('/admin/requests/:id/timeline', authMiddleware, adminMiddleware, controller.adminGetRequestTimeline);

export default router;
