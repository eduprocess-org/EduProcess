const test = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';

const http = require('node:http');
const express = require('express');
const supertest = require('supertest');

const { AuthService } = require('../../dist/application/auth/auth.service.js');
const { AuthController } = require('../../dist/infrastructure/http/controllers/auth.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { Router } = require('express');
const { generateSessionToken, generateRefreshToken } = require('../../dist/infrastructure/config/jwt.config.js');

// ─── In-memory mock repository ────────────────────────────────────────────────

const buildMockRepository = () => {
    const db = new Map();

    return {
        async findByEmail(email) {
            return db.get(email) ?? null;
        },
        async findById(id) {
            for (const user of db.values()) {
                if (user.id === id) return user;
            }
            return null;
        },
        async createStudentAccount(input) {
            const user = {
                id: `user-${Date.now()}`,
                email: input.email,
                passwordHash: input.passwordHash,
                firstName: input.firstName,
                lastName: input.lastName,
                role: 'student',
                createdAt: new Date(),
<<<<<<< HEAD
=======
                career: input.careerId
                    ? { id: input.careerId, name: 'Information Systems' }
                    : null,
>>>>>>> qa
            };
            db.set(input.email, user);
            return {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
<<<<<<< HEAD
=======
                career: user.career?.name,
>>>>>>> qa
            };
        },
        _seed(user) {
            db.set(user.email, user);
        },
    };
};

// ─── Build test Express app ────────────────────────────────────────────────────

const buildTestApp = (repository) => {
    const app = express();
    app.use(express.json());

    const authService = new AuthService(repository);
    const authController = new AuthController(authService);

    const router = Router();
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    router.post('/refresh', authController.refresh);
    router.get('/me', authMiddleware, authController.me);
    router.post('/logout', authMiddleware, authController.logout);

    app.use('/api/v1/auth', router);
    return app;
};

// ─── Tests ────────────────────────────────────────────────────────────────────

test('POST /register - registers a new student successfully', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/register').send({
        firstName: 'Ana',
        lastName: 'Torres',
        email: 'ana.torres@uce.edu.ec',
        password: 'SecurePass123',
    });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.email === 'ana.torres@uce.edu.ec');
});

test('POST /register - rejects duplicate email with 409', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    await request.post('/api/v1/auth/register').send({
        firstName: 'Ana',
        lastName: 'Torres',
        email: 'ana.torres@uce.edu.ec',
        password: 'SecurePass123',
    });

    const res = await request.post('/api/v1/auth/register').send({
        firstName: 'Ana',
        lastName: 'Torres',
        email: 'ana.torres@uce.edu.ec',
        password: 'SecurePass123',
    });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
});

test('POST /register - rejects non-institutional email with 400', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/register').send({
        firstName: 'Ana',
        lastName: 'Torres',
        email: 'ana.torres@gmail.com',
        password: 'SecurePass123',
    });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /register - rejects missing fields with 400', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/register').send({
        email: 'ana.torres@uce.edu.ec',
    });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /login - returns session and refresh tokens on success', async () => {
    const repo = buildMockRepository();
    repo._seed({
        id: 'user-seeded',
        email: 'carlos@uce.edu.ec',
        passwordHash: bcrypt.hashSync('myPassword99', 10),
        firstName: 'Carlos',
        lastName: 'Ruiz',
        role: 'student',
        createdAt: new Date(),
    });

    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/login').send({
        email: 'carlos@uce.edu.ec',
        password: 'myPassword99',
    });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.tokens.sessionToken.length > 0);
    assert.ok(res.body.data.tokens.refreshToken.length > 0);
    assert.equal(res.body.data.user.email, 'carlos@uce.edu.ec');
});

test('POST /login - rejects wrong password with 401', async () => {
    const repo = buildMockRepository();
    repo._seed({
        id: 'user-seeded',
        email: 'carlos@uce.edu.ec',
        passwordHash: bcrypt.hashSync('myPassword99', 10),
        firstName: 'Carlos',
        lastName: 'Ruiz',
        role: 'student',
        createdAt: new Date(),
    });

    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/login').send({
        email: 'carlos@uce.edu.ec',
        password: 'wrongPassword',
    });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('POST /login - rejects unknown email with 401', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/login').send({
        email: 'noone@uce.edu.ec',
        password: 'anyPassword',
    });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /me - returns user context with valid session token', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const token = generateSessionToken({
        userId: 'user-abc',
        email: 'valid@uce.edu.ec',
        role: 'student',
    });

    const res = await request
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.user.userId, 'user-abc');
    assert.equal(res.body.data.user.email, 'valid@uce.edu.ec');
});

test('GET /me - rejects request without token (MISSING_TOKEN)', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.get('/api/v1/auth/me');

    assert.equal(res.status, 401);
    assert.equal(res.body.code, 'MISSING_TOKEN');
});

test('GET /me - rejects invalid token (INVALID_TOKEN)', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer this-is-not-a-valid-jwt');

    assert.equal(res.status, 401);
    assert.equal(res.body.code, 'INVALID_TOKEN');
});

test('GET /me - rejects expired token (TOKEN_EXPIRED)', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const expiredToken = jwt.sign(
        {
            userId: 'user-abc',
            email: 'valid@uce.edu.ec',
            role: 'student',
            exp: Math.floor(Date.now() / 1000) - 60,
        },
        process.env.JWT_SESSION_SECRET,
        { noTimestamp: true }
    );

    const res = await request
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`);

    assert.equal(res.status, 401);
    assert.equal(res.body.code, 'TOKEN_EXPIRED');
});

test('POST /refresh - issues new tokens with valid refresh token', async () => {
    const repo = buildMockRepository();
    repo._seed({
        id: 'user-refresh',
        email: 'refresh@uce.edu.ec',
        passwordHash: 'hash',
        firstName: 'Refresh',
        lastName: 'User',
        role: 'student',
        createdAt: new Date(),
    });

    const app = buildTestApp(repo);
    const request = supertest(app);

    const refreshToken = generateRefreshToken({ userId: 'user-refresh' });

    const res = await request.post('/api/v1/auth/refresh').send({ refreshToken });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.tokens.sessionToken.length > 0);
    assert.ok(res.body.data.tokens.refreshToken.length > 0);
    assert.equal(res.body.data.user.email, 'refresh@uce.edu.ec');
});

test('POST /refresh - rejects invalid refresh token with 401', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/refresh').send({
        refreshToken: 'garbage-token',
    });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('POST /refresh - rejects missing refresh token with 400', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/refresh').send({});

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /logout - returns success for authenticated user', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const token = generateSessionToken({
        userId: 'user-abc',
        email: 'valid@uce.edu.ec',
        role: 'student',
    });

    const res = await request
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
});

test('POST /logout - rejects unauthenticated logout with 401', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/logout');

    assert.equal(res.status, 401);
});
<<<<<<< HEAD
=======

// ─── Career field tests ─────────────────────────────────────────────────────

test('POST /register - registers student with careerId successfully', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/register').send({
        firstName: 'Luis',
        lastName: 'Mendoza',
        email: 'luis.mendoza@uce.edu.ec',
        password: 'SecurePass123',
        careerId: 'career-uuid-123',
    });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.career, 'Information Systems');
});

test('POST /register - registers student without careerId (optional)', async () => {
    const repo = buildMockRepository();
    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/register').send({
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@uce.edu.ec',
        password: 'SecurePass123',
    });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.career, undefined);
});

test('POST /login - returns career in user data when career exists', async () => {
    const repo = buildMockRepository();
    repo._seed({
        id: 'user-with-career',
        email: 'career@uce.edu.ec',
        passwordHash: bcrypt.hashSync('myPassword99', 10),
        firstName: 'Career',
        lastName: 'User',
        role: 'student',
        createdAt: new Date(),
        career: { id: 'career-uuid-123', name: 'Civil Engineering' },
    });

    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/login').send({
        email: 'career@uce.edu.ec',
        password: 'myPassword99',
    });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.user.career, 'Civil Engineering');
});

test('POST /login - returns undefined career when user has no career', async () => {
    const repo = buildMockRepository();
    repo._seed({
        id: 'user-no-career',
        email: 'nocareer@uce.edu.ec',
        passwordHash: bcrypt.hashSync('myPassword99', 10),
        firstName: 'No',
        lastName: 'Career',
        role: 'student',
        createdAt: new Date(),
        career: null,
    });

    const app = buildTestApp(repo);
    const request = supertest(app);

    const res = await request.post('/api/v1/auth/login').send({
        email: 'nocareer@uce.edu.ec',
        password: 'myPassword99',
    });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.user.career, undefined);
});

test('POST /refresh - returns career in user data', async () => {
    const repo = buildMockRepository();
    repo._seed({
        id: 'user-refresh-career',
        email: 'refreshcareer@uce.edu.ec',
        passwordHash: 'hash',
        firstName: 'Refresh',
        lastName: 'Career',
        role: 'student',
        createdAt: new Date(),
        career: { id: 'career-uuid-456', name: 'Industrial Engineering' },
    });

    const app = buildTestApp(repo);
    const request = supertest(app);

    const refreshToken = generateRefreshToken({ userId: 'user-refresh-career' });

    const res = await request.post('/api/v1/auth/refresh').send({ refreshToken });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.user.career, 'Industrial Engineering');
});
>>>>>>> qa
