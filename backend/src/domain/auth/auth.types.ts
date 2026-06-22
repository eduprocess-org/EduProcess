export type UserRole = 'student' | 'admin';

export interface RegisterAuthRequest {
<<<<<<< HEAD
    /** Prefer sending explicit names from frontend. Kept optional for backward compatibility. */
=======
>>>>>>> qa
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
<<<<<<< HEAD
=======
    careerId?: string;
>>>>>>> qa
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
<<<<<<< HEAD
=======
    career?: string;
>>>>>>> qa
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