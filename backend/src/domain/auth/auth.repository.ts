import { AuthUserDTO, UserModel } from './auth.types';

export interface CreateStudentAccountInput {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

export interface AuthRepository {
    findByEmail(email: string): Promise<UserModel | null>;
    findById(id: string): Promise<UserModel | null>;
    createStudentAccount(input: CreateStudentAccountInput): Promise<AuthUserDTO>;
}