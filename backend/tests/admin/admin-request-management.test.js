const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';
process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { AdminDashboardController } = require('../../dist/infrastructure/http/controllers/admin-dashboard.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { adminMiddleware } = require('../../dist/infrastructure/http/middlewares/admin.middleware.js');
const { Router } = require('express');

// ─── Mock Service ─────────────────────────────────────────────────────────────

class MockAdminDashboardService {
    constructor() {
        this.allRequests = {
            data: [
                {
                    id: 'req-1',
                    studentName: 'Juan Perez',
                    studentEmail: 'juan@uce.edu.ec',
                    procedureName: 'Certificado de Notas',
                    career: 'Sistemas de Informacion',
                    semester: '7mo',
                    status: 'pending',
                    createdAt: '2026-06-16T00:00:00.000Z',
                    updatedAt: '2026-06-16T00:00:00.000Z',
                },
                {
                    id: 'req-2',
                    studentName: 'Maria Lopez',
                    studentEmail: 'maria@uce.edu.ec',
                    procedureName: 'Constancia de Estudios',
                    career: 'Ingenieria Civil',
                    semester: '5to',
                    status: 'approved',
                    createdAt: '2026-06-15T00:00:00.000Z',
                    updatedAt: '2026-06-17T00:00:00.000Z',
                },
            ],
            total: 2,
            page: 1,
            limit: 10,
            totalPages: 1,
        };
        this.requestDetail = {
            id: 'req-1',
            student: { id: 'stu-1', firstName: 'Juan', lastName: 'Perez', email: 'juan@uce.edu.ec', career: 'Sistemas de Informacion' },
            procedureType: { id: 'proc-1', name: 'Certificado de Notas', description: 'Certificado oficial de notas' },
            career: 'Sistemas de Informacion',
            semester: '7mo',
            reason: 'Necesito el certificado para postular a una beca',
            status: 'pending',
            createdAt: '2026-06-16T00:00:00.000Z',
            updatedAt: '2026-06-16T00:00:00.000Z',
        };
        this.requestDocuments = [
            { id: 'doc-1', fileName: 'notas.pdf', fileUrl: 'https://storage.example.com/doc-1', uploadedAt: '2026-06-16T00:00:00.000Z' },
            { id: 'doc-2', fileName: 'cedula.pdf', fileUrl: 'https://storage.example.com/doc-2', uploadedAt: '2026-06-16T00:01:00.000Z' },
        ];
        this.requestHistory = [
            { id: 'log-2', action: 'status_changed', oldValue: 'pending', newValue: 'in_review', adminName: 'Admin Garcia', createdAt: '2026-06-17T00:00:00.000Z' },
            { id: 'log-1', action: 'created', oldValue: null, newValue: 'pending', adminName: 'System', createdAt: '2026-06-16T00:00:00.000Z' },
        ];
        this.shouldFail = false;
        this.detailNotFound = false;
    }

    async getAllRequests(filters, pagination, sort) {
        if (this.shouldFail) throw new Error('Database connection failed');
        return this.allRequests;
    }

    async getRequestDetail(id) {
        if (this.shouldFail) throw new Error('Database connection failed');
        if (this.detailNotFound || id === 'nonexistent-id') throw new Error('Request not found');
        return this.requestDetail;
    }

    async getRequestDocuments(id) {
        if (this.shouldFail) throw new Error('Database connection failed');
        return this.requestDocuments;
    }

    async getRequestHistory(id) {
        if (this.shouldFail) throw new Error('Database connection failed');
        return this.requestHistory;
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

function createExpiredToken() {
    return jwt.sign(
        { userId: 'admin-1', email: 'admin@test.com', role: 'admin' },
        process.env.JWT_SESSION_SECRET,
        { expiresIn: '0s' }
    );
}

function buildApp(service) {
    const app = express();
    app.use(express.json());

    const controller = new AdminDashboardController(service);
    const router = Router();

    router.get('/admin/requests', authMiddleware, adminMiddleware, controller.getAllRequests);
    router.get('/admin/requests/:id', authMiddleware, adminMiddleware, controller.getRequestDetail);
    router.get('/admin/requests/:id/documents', authMiddleware, adminMiddleware, controller.getRequestDocuments);
    router.get('/admin/requests/:id/history', authMiddleware, adminMiddleware, controller.getRequestHistory);

    app.use('/api/v1', router);
    return app;
}

// ══════════════════════════════════════════════════════════════════════════════
// GET /admin/requests — List All Requests
// ══════════════════════════════════════════════════════════════════════════════

test('GET /admin/requests - returns paginated requests with admin token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.data.length, 2);
    assert.equal(res.body.data.total, 2);
    assert.equal(res.body.data.page, 1);
    assert.equal(res.body.data.limit, 10);
    assert.equal(res.body.data.totalPages, 1);
    assert.equal(res.body.data.data[0].studentName, 'Juan Perez');
    assert.equal(res.body.data.data[0].procedureName, 'Certificado de Notas');
    assert.equal(res.body.data.data[0].status, 'pending');
});

test('GET /admin/requests - accepts query parameters for pagination', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests?page=2&limit=5&sortField=updatedAt&sortDirection=asc')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
});

test('GET /admin/requests - rejects without token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/requests');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests - rejects student role', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests - returns 500 on service error', async () => {
    const service = new MockAdminDashboardService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});

// ══════════════════════════════════════════════════════════════════════════════
// GET /admin/requests/:id — Request Detail
// ══════════════════════════════════════════════════════════════════════════════

test('GET /admin/requests/:id - returns request detail', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.id, 'req-1');
    assert.equal(res.body.data.student.firstName, 'Juan');
    assert.equal(res.body.data.student.lastName, 'Perez');
    assert.equal(res.body.data.student.email, 'juan@uce.edu.ec');
    assert.equal(res.body.data.procedureType.name, 'Certificado de Notas');
    assert.equal(res.body.data.status, 'pending');
    assert.equal(res.body.data.reason, 'Necesito el certificado para postular a una beca');
});

test('GET /admin/requests/:id - returns 404 when request not found', async () => {
    const service = new MockAdminDashboardService();
    service.detailNotFound = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/nonexistent-id')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, 'Request not found');
});

test('GET /admin/requests/:id - rejects without token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests/:id - rejects student role', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests/:id - returns 500 on service error', async () => {
    const service = new MockAdminDashboardService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});

// ══════════════════════════════════════════════════════════════════════════════
// GET /admin/requests/:id/documents — Request Documents
// ══════════════════════════════════════════════════════════════════════════════

test('GET /admin/requests/:id/documents - returns document list', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/documents')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 2);
    assert.equal(res.body.data[0].fileName, 'notas.pdf');
    assert.equal(res.body.data[0].fileUrl, 'https://storage.example.com/doc-1');
    assert.equal(res.body.data[1].fileName, 'cedula.pdf');
});

test('GET /admin/requests/:id/documents - returns empty array when no documents', async () => {
    const service = new MockAdminDashboardService();
    service.requestDocuments = [];
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/documents')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 0);
});

test('GET /admin/requests/:id/documents - rejects without token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/documents');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests/:id/documents - rejects student role', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/documents')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests/:id/documents - returns 500 on service error', async () => {
    const service = new MockAdminDashboardService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/documents')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});

// ══════════════════════════════════════════════════════════════════════════════
// GET /admin/requests/:id/history — Request History
// ══════════════════════════════════════════════════════════════════════════════

test('GET /admin/requests/:id/history - returns audit log entries', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/history')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 2);
    assert.equal(res.body.data[0].action, 'status_changed');
    assert.equal(res.body.data[0].oldValue, 'pending');
    assert.equal(res.body.data[0].newValue, 'in_review');
    assert.equal(res.body.data[0].adminName, 'Admin Garcia');
    assert.equal(res.body.data[1].action, 'created');
});

test('GET /admin/requests/:id/history - returns empty array when no history', async () => {
    const service = new MockAdminDashboardService();
    service.requestHistory = [];
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/history')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 0);
});

test('GET /admin/requests/:id/history - rejects without token', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/history');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests/:id/history - rejects student role', async () => {
    const service = new MockAdminDashboardService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/history')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/requests/:id/history - returns 500 on service error', async () => {
    const service = new MockAdminDashboardService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/history')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});
