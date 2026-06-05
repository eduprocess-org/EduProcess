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
            },
        });

        return {
            id: createdUser.id,
            email: createdUser.email,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            role: createdUser.role,
        };
    }
}