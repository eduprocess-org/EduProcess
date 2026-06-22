import { Router } from 'express';
import { AuthService } from '../../../application/auth/auth.service';
import { PrismaAuthRepository } from '../../persistence/prisma/prisma-auth.repository';
import { AuthController } from '../controllers/auth.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

const authRouter = Router();

const authRepository = new PrismaAuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);

authRouter.get('/me', authMiddleware as any, authController.me);
authRouter.post('/logout', authMiddleware as any, authController.logout);

export default authRouter;