import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifySessionToken } from '../../config/jwt.config';
import { TokenPayload } from '../../../domain/auth/auth.types';

export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            success: false,
            code: 'MISSING_TOKEN',
            message: 'No token provided.',
        });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifySessionToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                success: false,
                code: 'TOKEN_EXPIRED',
                message: 'The session token has expired.',
            });
            return;
        }

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                code: 'INVALID_TOKEN',
                message: 'The session token is invalid.',
            });
            return;
        }

        res.status(401).json({
            success: false,
            code: 'UNAUTHORIZED',
            message: 'Authentication failed.',
        });
    }
};