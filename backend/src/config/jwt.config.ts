import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/auth.types';

const JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'session-fallback-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-fallback-secret';

const SESSION_EXPIRATION = '5m';
const REFRESH_EXPIRATION = '24h';

export const generateSessionToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SESSION_SECRET, { expiresIn: SESSION_EXPIRATION });
};

export const generateRefreshToken = (payload: { userId: string }): string => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION });
};

export const verifySessionToken = (token: string): TokenPayload => {
    return jwt.verify(token, JWT_SESSION_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};