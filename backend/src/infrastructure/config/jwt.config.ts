import jwt, { type JwtPayload } from 'jsonwebtoken';
import {
    RefreshTokenPayload,
    SessionTokenPayload,
    TokenPayload,
} from '../../domain/auth/auth.types';

if (!process.env.JWT_SESSION_SECRET) {
    throw new Error('JWT_SESSION_SECRET is not defined');
}

if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
}

const JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const SESSION_EXPIRATION = '5m';
const REFRESH_EXPIRATION = '24h';

export const generateSessionToken = (payload: SessionTokenPayload): string => {
    return jwt.sign(payload, JWT_SESSION_SECRET, { expiresIn: SESSION_EXPIRATION });
};

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION });
};

export const generateAuthTokens = (payload: SessionTokenPayload): { sessionToken: string; refreshToken: string } => {
    return {
        sessionToken: generateSessionToken(payload),
        refreshToken: generateRefreshToken({ userId: payload.userId }),
    };
};

export const verifySessionToken = (token: string): TokenPayload => {
    return jwt.verify(token, JWT_SESSION_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};