import { Request, Response, NextFunction } from 'express';
import { verifySessionToken } from '../../config/jwt.config';
import { TokenPayload } from '../../../../contexts/auth/domain/types/auth.types';

export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Unauthorized access missing token' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifySessionToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired session token' });
    }
};