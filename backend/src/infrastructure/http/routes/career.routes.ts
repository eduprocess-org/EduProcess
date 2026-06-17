import { Router } from 'express';
import { CareerController } from '../controllers/career.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const careerRouter = Router();
const careerController = new CareerController();

careerRouter.get('/careers', authMiddleware, careerController.getAll);

export default careerRouter;
