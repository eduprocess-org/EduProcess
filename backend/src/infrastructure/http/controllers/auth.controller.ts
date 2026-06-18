import { Request, Response } from 'express';
import { AuthService } from '../../../application/auth/auth.service';
import {
    LoginAuthRequest,
    RegisterAuthRequest,
} from '../../../domain/auth/auth.types';
import { handleError } from '../utils/error-handler';

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const body = req.body as Partial<RegisterAuthRequest>;

            if (!this.isValidRegisterBody(body)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid register payload',
                });
            }

            const result = await this.authService.registerStudent(body);

            return res.status(201).json(result);
        } catch (error) {
            return handleError(error, res, "AuthController") as any;
        }
    };

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const body = req.body as Partial<LoginAuthRequest>;

            if (!this.isValidLoginBody(body)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid login payload',
                });
            }

            const result = await this.authService.login(body);

            return res.status(200).json(result);
        } catch (error) {
            return handleError(error, res, "AuthController") as any;
        }
    };

    me = async (req: Request, res: Response): Promise<Response> => {
        try {
            // req.user is injected by the authMiddleware
            const user = (req as any).user;
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User context not found',
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    user
                }
            });
        } catch (error) {
            return handleError(error, res, "AuthController") as any;
        }
    };

    refresh = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required',
                });
            }

            const result = await this.authService.refreshToken(refreshToken);

            return res.status(200).json(result);
        } catch (error) {
            return handleError(error, res, "AuthController") as any;
        }
    };

    logout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = await this.authService.logout();
            return res.status(200).json(result);
        } catch (error) {
            return handleError(error, res, "AuthController") as any;
        }
    };

    private isValidRegisterBody(body: Partial<RegisterAuthRequest>): body is RegisterAuthRequest {
        const hasExplicitNames =
            typeof body.firstName === 'string' &&
            typeof body.lastName === 'string' &&
            body.firstName.trim().length > 0 &&
            body.lastName.trim().length > 0;

        const hasFullName = typeof body.fullName === 'string' && body.fullName.trim().length > 0;

        return Boolean(
            (hasExplicitNames || hasFullName) &&
            body.email &&
            body.password &&
            typeof body.email === 'string' &&
            typeof body.password === 'string'
        );
    }

    private isValidLoginBody(body: Partial<LoginAuthRequest>): body is LoginAuthRequest {
        return Boolean(
            body.email &&
            body.password &&
            typeof body.email === 'string' &&
            typeof body.password === 'string'
        );
    }
}