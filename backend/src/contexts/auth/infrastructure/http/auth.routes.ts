import { Router } from 'express';
import { AuthService } from '../../application/auth.service';
import { PrismaAuthRepository } from '../persistence/prisma-auth.repository';
import { AuthController } from './auth.controller';

const authRouter = Router();

const authRepository = new PrismaAuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;