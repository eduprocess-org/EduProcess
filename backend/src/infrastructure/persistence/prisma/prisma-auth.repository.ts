import { prisma } from '../database.config';
import {
    AuthRepository,
    CreateStudentAccountInput,
} from '../../../domain/auth/auth.repository';
import { AuthUserDTO, UserModel } from '../../../domain/auth/auth.types';

export class PrismaAuthRepository implements AuthRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
        return prisma.user.findUnique({
            where: { email },
            include: { career: true },
        });
    }

    async findById(id: string): Promise<UserModel | null> {
        return prisma.user.findUnique({
            where: { id },
            include: { career: true },
        });
    }

    async createStudentAccount(input: CreateStudentAccountInput): Promise<AuthUserDTO> {
        const createdUser = await prisma.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                passwordHash: input.passwordHash,
                role: 'student',
                careerId: input.careerId || null,
            },
            include: { career: true },
        });

        return {
            id: createdUser.id,
            email: createdUser.email,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            role: createdUser.role,
            career: createdUser.career?.name,
        };
    }
}