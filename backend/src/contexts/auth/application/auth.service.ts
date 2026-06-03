import { comparePassword, hashPassword } from '../../../shared/infrastructure/config/hash.config';
import { generateAuthTokens } from '../../../shared/infrastructure/config/jwt.config';
import {
    AuthRepository,
    CreateStudentAccountInput,
} from '../domain/repositories/auth.repository';
import {
    AuthUserDTO,
    LoginAuthRequest,
    LoginAuthResponse,
    RegisterAuthRequest,
    RegisterAuthResponse,
    TokenPayload,
} from '../domain/types/auth.types';

export class AuthService {
    constructor(private readonly authRepository: AuthRepository) { }

    async registerStudent(request: RegisterAuthRequest): Promise<RegisterAuthResponse> {
        // (debug logs removed)
        const email = this.normalizeEmail(request.email);

        this.validateStudentEmailDomain(email);

        const existingUser = await this.authRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('A user with this email already exists');
        }
        // Prefer explicit fields from frontend; fall back to splitting fullName for backward compatibility
        let firstName: string;
        let lastName: string;

        if (request.firstName && request.lastName) {
            firstName = request.firstName.trim();
            lastName = request.lastName.trim();
        } else {
            const names = this.splitFullName(request.fullName ?? '');
            firstName = names.firstName;
            lastName = names.lastName;
        }
        const passwordHash = await hashPassword(request.password);

        const input: CreateStudentAccountInput = {
            firstName,
            lastName,
            email,
            passwordHash,
        };

        const createdUser = await this.authRepository.createStudentAccount(input);

        return {
            success: true,
            message: 'User registered successfully',
            data: createdUser,
        };
    }

    async login(request: LoginAuthRequest): Promise<LoginAuthResponse> {
        const email = this.normalizeEmail(request.email);
        const user = await this.authRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const passwordMatches = await comparePassword(request.password, user.passwordHash);

        if (!passwordMatches) {
            throw new Error('Invalid credentials');
        }

        const payload: TokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        const tokens = generateAuthTokens(payload);

        const publicUser: AuthUserDTO = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };

        return {
            success: true,
            message: 'Login successful',
            data: {
                user: publicUser,
                tokens,
            },
        };
    }

    private splitFullName(fullName: string): { firstName: string; lastName: string } {
        const normalized = fullName.trim().replace(/\s+/g, ' ');
        if (!normalized) {
            return { firstName: '', lastName: '' };
        }

        const parts = normalized.split(' ');

        if (parts.length === 1) {
            return { firstName: parts[0], lastName: '' };
        }

        if (parts.length === 2) {
            return { firstName: parts[0], lastName: parts[1] };
        }

        if (parts.length === 3) {
            return { firstName: `${parts[0]} ${parts[1]}`, lastName: parts[2] };
        }

        // 4 or more: assume two given names and the rest as surnames
        return { firstName: `${parts[0]} ${parts[1]}`, lastName: parts.slice(2).join(' ') };
    }

    private normalizeEmail(email: string): string {
        return email.trim().toLowerCase();
    }

    private validateStudentEmailDomain(email: string): void {
        if (!email.endsWith('@uce.edu.ec')) {
            throw new Error('Only institutional emails ending in @uce.edu.ec are allowed');
        }
    }
}