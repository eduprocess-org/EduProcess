const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';
process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { AdminDashboardController } = require('../../dist/infrastructure/http/controllers/admin/dashboard.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { adminMiddleware } = require('../../dist/infrastructure/http/middlewares/admin.middleware.js');
const { Router } = require('express');

// ─── Mock Service ─────────────────────────────────────────────────────────────

class MockAdminDashboardService {
    constructor() {
        this.stats = {
            totalRequests: 125,
            pendingRequests: 42,
            approvedRequests: 70,
            rejectedRequests: 13,
        };
        this.recentRequests = [
            {
                id: 'req-1',
                studentName: 'Juan Perez',
                procedureName: 'Transcript Request',
                status: 'PENDING',
                createdAt: '2026-06-16T00:00:00.000Z',
            },
            {
                id: 'req-2',
                studentName: 'Maria Lopez',
                procedureName: 'Enrollment Certificate',
                status: 'APPROVED',
                createdAt: '2026-06-15T00:00:00.000Z',
            },
        ];
        this.requestsByProcedureType = [
            { procedureTypeId: 'proc-1', procedureName: 'Transcript Request', count: 50 },
            { procedureTypeId: 'proc-2', procedureName: 'Enrollment Certificate', count: 35 },
        ];
        this.shouldFail = false;
    }

    async getDashboardStats() {
        if (this.shouldFail) throw new Error('Database error');
        return this.stats;
    }

    async getRecentRequests() {
        if (this.shouldFail) throw new Error('Database error');
        return this.recentRequests;
    }

    async getRequestsByProcedureType() {
        if (this.shouldFail) throw new Error('Database error');
        return this.requestsByProcedureType;
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function createAdminToken() {
    return jwt.sign(
        { userId: 'admin-1', email: 'admin@test.com', role: 'admin' },
        process.env.JWT_SESSION_SECRET,
        { expiresIn: '1h' }
    );
}

function createStudentToken() {
    return jwt.sign(
        { userId: 'student-1', email: 'student@test.com', role: 'student' },
        process.env.JWT_SESSION_SECRET,
        { expiresIn: '1h' }
    );
}

function buildApp(service) {
    const app = express();
    app.use(express.json());

    const controller = new AdminDashboardController(service);
    const router = Router();

    router.get(
        '/admin/dashboard/stats',
        authMiddleware,
        adminMiddleware,
        controller.getDashboardStats
    );

    router.get(
        '/admin/dashboard/recent-requests',
        authMiddleware,
        adminMiddleware,
        controller.getRecentRequests
    );

    router.get(
        '/admin/dashboard/requests-by-procedure',
        authMiddleware,
        adminMiddleware,
        controller.getRequestsByProcedureType
    );

    app.use('/api/v1', router);
    return app;
}

// ─── Tests: GET /admin/dashboard/stats ────────────────────────────────────────

test('GET /admin/dashboard/stats - returns stats with valid admin token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/stats')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.totalRequests, 125);
    assert.equal(res.body.data.pendingRequests, 42);
    assert.equal(res.body.data.approvedRequests, 70);
    assert.equal(res.body.data.rejectedRequests, 13);
});

test('GET /admin/dashboard/stats - rejects request without token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/stats');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/dashboard/stats - rejects student role', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/stats')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/dashboard/stats - returns 500 on service error', async () => {
    const service = new MockAdminDashboardService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/stats')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});

// ─── Tests: GET /admin/dashboard/recent-requests ─────────────────────────────

test('GET /admin/dashboard/recent-requests - returns requests with valid admin token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/recent-requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 2);
    assert.equal(res.body.data[0].studentName, 'Juan Perez');
    assert.equal(res.body.data[0].procedureName, 'Transcript Request');
    assert.equal(res.body.data[0].status, 'PENDING');
});

test('GET /admin/dashboard/recent-requests - rejects request without token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/recent-requests');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/dashboard/recent-requests - rejects student role', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/recent-requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/dashboard/recent-requests - returns 500 on service error', async () => {
    const service = new MockAdminDashboardService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/recent-requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});

// ─── Tests: Empty data ────────────────────────────────────────────────────────

test('GET /admin/dashboard/recent-requests - returns empty array when no requests', async () => {
    const service = new MockAdminDashboardService();
    service.recentRequests = [];
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/recent-requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 0);
});

// ─── Tests: GET /admin/dashboard/requests-by-procedure ────────────────────────

test('GET /admin/dashboard/requests-by-procedure - returns data with valid admin token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/requests-by-procedure')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 2);
    assert.equal(res.body.data[0].procedureName, 'Transcript Request');
    assert.equal(res.body.data[0].count, 50);
});

test('GET /admin/dashboard/requests-by-procedure - rejects request without token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/requests-by-procedure');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/dashboard/requests-by-procedure - rejects student role', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/requests-by-procedure')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/dashboard/requests-by-procedure - returns 500 on service error', async () => {
    const service = new MockAdminDashboardService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/dashboard/requests-by-procedure')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});
