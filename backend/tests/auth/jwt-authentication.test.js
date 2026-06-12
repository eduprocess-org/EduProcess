const test = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';

const jwtConfig = require('../../dist/infrastructure/config/jwt.config.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { AuthService } = require('../../dist/application/auth/auth.service.js');

const createResponse = () => {
    const response = {
        statusCode: 200,
        body: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        },
    };

    return response;
};

const runMiddleware = (authorization) => {
    const request = { headers: { authorization } };
    const response = createResponse();
    let nextCalled = false;

    authMiddleware(request, response, () => {
        nextCalled = true;
    });

    return { request, response, nextCalled };
};

test('generates and verifies session and refresh tokens', () => {
    const payload = {
        userId: 'user-123',
        email: 'student@uce.edu.ec',
        role: 'student',
    };

    const sessionToken = jwtConfig.generateSessionToken(payload);
    const verifiedSessionPayload = jwtConfig.verifySessionToken(sessionToken);

    assert.equal(verifiedSessionPayload.userId, payload.userId);
    assert.equal(verifiedSessionPayload.email, payload.email);
    assert.equal(verifiedSessionPayload.role, payload.role);

    const refreshToken = jwtConfig.generateRefreshToken({ userId: payload.userId });
    const verifiedRefreshPayload = jwtConfig.verifyRefreshToken(refreshToken);

    assert.equal(typeof verifiedRefreshPayload, 'object');
    assert.equal(verifiedRefreshPayload.userId, payload.userId);
});

test('auth service returns both tokens on login', async () => {
    const payload = {
        userId: 'user-123',
        email: 'student@uce.edu.ec',
        role: 'student',
    };

    const repository = {
        async findByEmail(email) {
            if (email !== payload.email) {
                return null;
            }

            return {
                id: payload.userId,
                email: payload.email,
                passwordHash: bcrypt.hashSync('password123', 10),
                firstName: 'Student',
                lastName: 'User',
                role: 'student',
                createdAt: new Date(),
            };
        },
        async createStudentAccount() {
            throw new Error('Not used in this test');
        },
    };

    const authService = new AuthService(repository);

    const loginResult = await authService.login({
        email: payload.email,
        password: 'password123',
    });

    assert.ok(loginResult.data.tokens.sessionToken.length > 0);
    assert.ok(loginResult.data.tokens.refreshToken.length > 0);
});

test('auth middleware accepts valid tokens and rejects invalid cases', () => {
    const payload = {
        userId: 'user-123',
        email: 'student@uce.edu.ec',
        role: 'student',
    };

    const sessionToken = jwtConfig.generateSessionToken(payload);
    const validAuthResult = runMiddleware(`Bearer ${sessionToken}`);

    assert.equal(validAuthResult.nextCalled, true);
    assert.equal(validAuthResult.request.user.userId, payload.userId);

    const missingTokenResult = runMiddleware(undefined);

    assert.equal(missingTokenResult.response.statusCode, 401);
    assert.equal(missingTokenResult.response.body.code, 'MISSING_TOKEN');

    const invalidTokenResult = runMiddleware('Bearer invalid-token');

    assert.equal(invalidTokenResult.response.statusCode, 401);
    assert.equal(invalidTokenResult.response.body.code, 'INVALID_TOKEN');

    const expiredToken = jwt.sign(
        {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
            exp: Math.floor(Date.now() / 1000) - 10,
        },
        process.env.JWT_SESSION_SECRET,
        { noTimestamp: true }
    );

    const expiredTokenResult = runMiddleware(`Bearer ${expiredToken}`);

    assert.equal(expiredTokenResult.response.statusCode, 401);
    assert.equal(expiredTokenResult.response.body.code, 'TOKEN_EXPIRED');
});

test('auth service refreshes token correctly', async () => {
    const payload = {
        userId: 'user-123',
        email: 'student@uce.edu.ec',
        role: 'student',
    };

    const repository = {
        async findByEmail() { return null; },
        async createStudentAccount() { throw new Error('Not used'); },
        async findById(id) {
            if (id !== payload.userId) return null;
            return {
                id: payload.userId,
                email: payload.email,
                passwordHash: 'hash',
                firstName: 'Student',
                lastName: 'User',
                role: 'student',
                createdAt: new Date(),
            };
        }
    };

    const authService = new AuthService(repository);
    const validRefreshToken = jwtConfig.generateRefreshToken({ userId: payload.userId });

    const refreshResult = await authService.refreshToken(validRefreshToken);
    assert.equal(refreshResult.success, true);
    assert.ok(refreshResult.data.tokens.sessionToken.length > 0);
    assert.ok(refreshResult.data.tokens.refreshToken.length > 0);
    assert.equal(refreshResult.data.user.email, payload.email);

    try {
        await authService.refreshToken('invalid-token');
        assert.fail('Should have thrown an error');
    } catch (error) {
        assert.equal(error.message, 'Invalid or expired refresh token');
    }
});

test('auth service logout returns success', async () => {
    const authService = new AuthService({});
    const result = await authService.logout();
    assert.equal(result.success, true);
});