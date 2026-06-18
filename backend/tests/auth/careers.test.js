const test = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcryptjs');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';

const http = require('node:http');
const express = require('express');
const supertest = require('supertest');

const { CareerController } = require('../../dist/infrastructure/http/controllers/career.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { generateSessionToken } = require('../../dist/infrastructure/config/jwt.config.js');
const { Router } = require('express');

// ─── Mock service ─────────────────────────────────────────────────────────────

const mockCareers = [
    {
        id: 'career-1',
        name: 'Information Systems',
        description: 'Systems engineering career',
        faculty: { id: 'faculty-1', name: 'Faculty of Engineering' },
    },
    {
        id: 'career-2',
        name: 'Civil Engineering',
        description: 'Civil engineering career',
        faculty: { id: 'faculty-1', name: 'Faculty of Engineering' },
    },
];

class MockCareerService {
    async getAllCareers() {
        return mockCareers;
    }
}

// ─── Build test Express app ───────────────────────────────────────────────────

const buildTestApp = () => {
    const app = express();
    app.use(express.json());

    const service = new MockCareerService();
    const careerController = new CareerController(service);

    const router = Router();
    router.get('/careers', authMiddleware, careerController.getAll);

    app.use('/api/v1', router);
    return app;
};

// ─── Tests ────────────────────────────────────────────────────────────────────

test('GET /careers - returns list of careers with valid token', async () => {
    const app = buildTestApp();
    const request = supertest(app);

    const token = generateSessionToken({
        userId: 'user-abc',
        email: 'valid@uce.edu.ec',
        role: 'student',
    });

    const res = await request
        .get('/api/v1/careers')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.equal(res.body.data.length, 2);
    assert.equal(res.body.data[0].name, 'Information Systems');
    assert.equal(res.body.data[1].name, 'Civil Engineering');
});

test('GET /careers - each career includes faculty info', async () => {
    const app = buildTestApp();
    const request = supertest(app);

    const token = generateSessionToken({
        userId: 'user-abc',
        email: 'valid@uce.edu.ec',
        role: 'student',
    });

    const res = await request
        .get('/api/v1/careers')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.ok(res.body.data[0].faculty);
    assert.equal(res.body.data[0].faculty.name, 'Faculty of Engineering');
});

test('GET /careers - rejects request without token', async () => {
    const app = buildTestApp();
    const request = supertest(app);

    const res = await request.get('/api/v1/careers');

    assert.equal(res.status, 401);
});

test('GET /careers - rejects request with invalid token', async () => {
    const app = buildTestApp();
    const request = supertest(app);

    const res = await request
        .get('/api/v1/careers')
        .set('Authorization', 'Bearer invalid-token');

    assert.equal(res.status, 401);
});
