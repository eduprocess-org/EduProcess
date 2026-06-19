import { Router } from 'express';
import { CareerController } from '../controllers/career.controller';
import { CareerService } from '../../../application/career/career.service';
import { PrismaCareerRepository } from '../../persistence/prisma/career/prisma-career.repository';
import { authMiddleware } from '../middlewares/auth.middleware';

const careerRouter = Router();

const repository = new PrismaCareerRepository();
const service = new CareerService(repository);
const controller = new CareerController(service);

careerRouter.get('/careers', controller.getAll);

export default careerRouter;
