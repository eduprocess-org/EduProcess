export type UserRole = 'student' | 'admin';

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

export interface TokenPayload {
    userId: string;
    email: string;
    role: UserRole;
}