export type UserRole = 'student' | 'admin';

export interface RegisterAuthRequest {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    careerId?: string;
}

export interface LoginAuthRequest {
    email: string;
    password: string;
}

export interface AuthUserDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    career?: string;
}

export interface AuthTokensDTO {
    sessionToken: string;
    refreshToken: string;
}

export interface RegisterAuthResponse {
    success: boolean;
    message: string;
    data: AuthUserDTO;
}

export interface LoginAuthResponse {
    success: boolean;
    message: string;
    data: {
        user: AuthUserDTO;
        tokens: AuthTokensDTO;
    };
}

export interface UserModel {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    createdAt: Date;
}

export interface ProfileModel {
    id: string;
    userId: string;
    careerId: string | null;
    phone: string;
    department: string | null;
    position: string | null;
}

export interface SessionTokenPayload {
    userId: string;
    email: string;
    role: UserRole;
}

export interface RefreshTokenPayload {
    userId: string;
}

export type TokenPayload = SessionTokenPayload;