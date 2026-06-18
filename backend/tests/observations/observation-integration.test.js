const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';
process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { ObservationController } = require('../../dist/infrastructure/http/controllers/observation.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { adminMiddleware } = require('../../dist/infrastructure/http/middlewares/admin.middleware.js');
const { Router } = require('express');

// ─── Mock Service ─────────────────────────────────────────────────────────────

class MockObservationService {
    constructor() {
        this.observations = [];
        this.nextId = 1;
        this.shouldFail = false;
        this.failMessage = 'Database error';
    }

    async createObservation(input) {
        if (this.shouldFail) throw new Error(this.failMessage);
        const obs = {
            id: `obs-${this.nextId++}`,
            requestId: input.requestId,
            adminId: input.adminId,
            comment: input.comment,
            createdAt: new Date(),
            adminName: 'Admin User',
        };
        this.observations.push(obs);
        return obs;
    }

    async getObservationsByRequest(requestId) {
        if (this.shouldFail) throw new Error(this.failMessage);
        return this.observations.filter(o => o.requestId === requestId);
    }

    async getObservationById(id) {
        if (this.shouldFail) throw new Error(this.failMessage);
        const obs = this.observations.find(o => o.id === id);
        if (!obs) throw new Error('Observation not found');
        return obs;
    }

    async deleteObservation(id) {
        if (this.shouldFail) throw new Error(this.failMessage);
        const obs = this.observations.find(o => o.id === id);
        if (!obs) throw new Error('Observation not found');
        this.observations = this.observations.filter(o => o.id !== id);
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

function buildApp(mockService) {
    const app = express();
    app.use(express.json());

    const controller = new ObservationController(mockService);
    const router = Router();

    router.post(
        '/admin/requests/:requestId/observations',
        authMiddleware,
        adminMiddleware,
        controller.createObservation
    );
    router.get(
        '/admin/requests/:requestId/observations',
        authMiddleware,
        adminMiddleware,
        controller.getObservationsByRequest
    );
    router.get(
        '/admin/observations/:id',
        authMiddleware,
        adminMiddleware,
        controller.getObservationById
    );
    router.delete(
        '/admin/observations/:id',
        authMiddleware,
        adminMiddleware,
        controller.deleteObservation
    );

    app.use('/api/v1', router);
    return app;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test('POST /admin/requests/:requestId/observations - creates observation with valid admin token', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/requests/req-1/observations')
        .set('Authorization', `Bearer ${token}`)
        .send({ comment: 'Please review documents' });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.comment, 'Please review documents');
    assert.equal(res.body.data.requestId, 'req-1');
    assert.equal(res.body.data.adminId, 'admin-1');
});

test('POST /admin/requests/:requestId/observations - rejects request without token', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);

    const res = await supertest(app)
        .post('/api/v1/admin/requests/req-1/observations')
        .send({ comment: 'Test' });

    assert.equal(res.status, 401);
});

test('POST /admin/requests/:requestId/observations - rejects student role', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .post('/api/v1/admin/requests/req-1/observations')
        .set('Authorization', `Bearer ${token}`)
        .send({ comment: 'Test' });

    assert.equal(res.status, 403);
});

test('POST /admin/requests/:requestId/observations - rejects empty comment', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/requests/req-1/observations')
        .set('Authorization', `Bearer ${token}`)
        .send({ comment: '' });

    assert.equal(res.status, 400);
});

test('POST /admin/requests/:requestId/observations - rejects missing comment', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/requests/req-1/observations')
        .set('Authorization', `Bearer ${token}`)
        .send({});

    assert.equal(res.status, 400);
});

test('POST /admin/requests/:requestId/observations - returns 500 on service error', async () => {
    const service = new MockObservationService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/requests/req-1/observations')
        .set('Authorization', `Bearer ${token}`)
        .send({ comment: 'Test' });

    assert.equal(res.status, 500);
});

test('GET /admin/requests/:requestId/observations - returns observations with valid admin token', async () => {
    const service = new MockObservationService();
    await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'First' });
    await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'Second' });
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/observations')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 2);
    assert.equal(res.body.data[0].comment, 'First');
    assert.equal(res.body.data[1].comment, 'Second');
});

test('GET /admin/requests/:requestId/observations - returns empty array when no observations', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-empty/observations')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 0);
});

test('GET /admin/requests/:requestId/observations - rejects request without token', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/requests/req-1/observations');

    assert.equal(res.status, 401);
});

test('GET /admin/observations/:id - returns observation by id', async () => {
    const service = new MockObservationService();
    const created = await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'Detail view' });
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get(`/api/v1/admin/observations/${created.id}`)
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.data.comment, 'Detail view');
});

test('GET /admin/observations/:id - returns 404 when not found', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/observations/obs-nonexistent')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 404);
});

test('DELETE /admin/observations/:id - deletes observation', async () => {
    const service = new MockObservationService();
    const created = await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'To delete' });
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .delete(`/api/v1/admin/observations/${created.id}`)
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
});

test('DELETE /admin/observations/:id - returns 404 when not found', async () => {
    const service = new MockObservationService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .delete('/api/v1/admin/observations/obs-nonexistent')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 404);
});

test('DELETE /admin/observations/:id - rejects student role', async () => {
    const service = new MockObservationService();
    const created = await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'Admin only' });
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .delete(`/api/v1/admin/observations/${created.id}`)
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
});
