const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';
process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { AdminProcedureController } = require('../../dist/infrastructure/http/controllers/admin-procedure.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { adminMiddleware } = require('../../dist/infrastructure/http/middlewares/admin.middleware.js');
const { Router } = require('express');

// ─── Mock Service ─────────────────────────────────────────────────────────────

class MockAdminProcedureService {
    constructor() {
        this.shouldFail = false;
        this.procedures = [
            {
                id: 'proc-1',
                name: 'Transcript Request',
                description: 'Official academic transcript',
                requirementsText: 'Bring valid ID',
                isActive: true,
                facultyId: null,
                careerId: null,
                facultyName: null,
                careerName: null,
                requirements: [
                    { id: 'req-1', name: 'Valid ID', description: 'Government ID', isMandatory: true },
                ],
                requirementsCount: 1,
                createdAt: '2026-06-01T00:00:00.000Z',
                updatedAt: '2026-06-10T00:00:00.000Z',
            },
            {
                id: 'proc-2',
                name: 'Enrollment Certificate',
                description: 'Certificate of enrollment',
                requirementsText: '',
                isActive: false,
                facultyId: null,
                careerId: null,
                facultyName: null,
                careerName: null,
                requirements: [],
                requirementsCount: 0,
                createdAt: '2026-06-02T00:00:00.000Z',
                updatedAt: '2026-06-09T00:00:00.000Z',
            },
        ];
    }

    async getAllProcedures(filters, pagination, sort) {
        if (this.shouldFail) throw new Error('Database error');
        let data = [...this.procedures];
        if (filters.isActive !== undefined) {
            data = data.filter((p) => p.isActive === filters.isActive);
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            data = data.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
        }
        return {
            data: data.slice(0, pagination.limit),
            total: data.length,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(data.length / pagination.limit),
        };
    }

    async getProcedureById(id) {
        if (this.shouldFail) throw new Error('Database error');
        const p = this.procedures.find((p) => p.id === id);
        if (!p) throw new Error('Procedure not found');
        return p;
    }

    async createProcedure(input) {
        if (this.shouldFail) throw new Error('Database error');
        const name = input.name ? input.name.trim() : '';
        if (!name) throw new Error('Procedure name is required');
        if (name.length < 3) throw new Error('Procedure name must be at least 3 characters');
        if (name.length > 200) throw new Error('Procedure name must not exceed 200 characters');

        const description = input.description ? input.description.trim() : '';
        if (!description) throw new Error('Procedure description is required');
        if (description.length > 2000) throw new Error('Procedure description must not exceed 2000 characters');

        const duplicate = this.procedures.find((p) => p.name.toLowerCase() === name.toLowerCase());
        if (duplicate) throw new Error('Procedure with this name already exists');

        if (input.facultyId && input.facultyId !== 'fac-valid') {
            throw new Error('Specified faculty does not exist');
        }
        if (input.careerId && input.careerId !== 'car-valid') {
            throw new Error('Specified career does not exist');
        }

        if (input.requirements && input.requirements.length) {
            for (const req of input.requirements) {
                if (!req.name || !req.name.trim()) {
                    throw new Error('Each requirement must have a name');
                }
            }
        }

        return {
            id: 'proc-new',
            name,
            description,
            requirementsText: input.requirementsText || '',
            isActive: input.isActive !== undefined ? input.isActive : true,
            facultyId: input.facultyId || null,
            careerId: input.careerId || null,
            facultyName: null,
            careerName: null,
            requirements: (input.requirements || []).map((r, i) => ({
                id: `r-${i}`,
                name: r.name.trim(),
                description: r.description,
                isMandatory: r.isMandatory !== undefined ? r.isMandatory : true,
            })),
        };
    }

    async updateProcedure(id, input) {
        if (this.shouldFail) throw new Error('Database error');
        const p = this.procedures.find((p) => p.id === id);
        if (!p) throw new Error('Procedure not found');
        return { ...p, ...input, updatedAt: new Date().toISOString() };
    }

    async deleteProcedure(id) {
        if (this.shouldFail) throw new Error('Database error');
        const p = this.procedures.find((p) => p.id === id);
        if (!p) throw new Error('Procedure not found');
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

    const controller = new AdminProcedureController(service);
    const router = Router();

    router.get('/admin/procedures', authMiddleware, adminMiddleware, controller.getAll);
    router.get('/admin/procedures/:id', authMiddleware, adminMiddleware, controller.getById);
    router.post('/admin/procedures', authMiddleware, adminMiddleware, controller.create);
    router.put('/admin/procedures/:id', authMiddleware, adminMiddleware, controller.update);
    router.delete('/admin/procedures/:id', authMiddleware, adminMiddleware, controller.delete);

    app.use('/api/v1', router);
    return app;
}

// ─── Tests: GET /admin/procedures ─────────────────────────────────────────

test('GET /admin/procedures - returns all procedures with valid admin token', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.equal(res.body.data.length, 2);
    assert.equal(res.body.data[0].name, 'Transcript Request');
    assert.equal(res.body.pagination.total, 2);
});

test('GET /admin/procedures - rejects request without token', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);

    const res = await supertest(app)
        .get('/api/v1/admin/procedures');

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
});

test('GET /admin/procedures - rejects student role', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
});

test('GET /admin/procedures - filters by isActive', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures?isActive=true')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 1);
    assert.equal(res.body.data[0].isActive, true);
});

test('GET /admin/procedures - filters by search', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures?search=Transcript')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 1);
    assert.equal(res.body.data[0].name, 'Transcript Request');
});

test('GET /admin/procedures - returns 500 on service error', async () => {
    const service = new MockAdminProcedureService();
    service.shouldFail = true;
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
});

// ─── Tests: GET /admin/procedures/:id ─────────────────────────────────────

test('GET /admin/procedures/:id - returns procedure by ID', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures/proc-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.id, 'proc-1');
    assert.equal(res.body.data.name, 'Transcript Request');
    assert.equal(res.body.data.requirements.length, 1);
});

test('GET /admin/procedures/:id - returns 404 when not found', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures/nonexistent')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
});

test('GET /admin/procedures/:id - rejects student role', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .get('/api/v1/admin/procedures/proc-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
});

// ─── Tests: POST /admin/procedures ────────────────────────────────────────

test('POST /admin/procedures - creates procedure successfully', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'New Procedure',
            description: 'New description',
            requirementsText: 'Some reqs',
            isActive: true,
            requirements: [{ name: 'Req 1', description: 'First req', isMandatory: true }],
        });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.name, 'New Procedure');
    assert.equal(res.body.data.requirements.length, 1);
});

test('POST /admin/procedures - returns 400 when name is missing', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: '', description: 'desc' });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /admin/procedures - returns 400 when description is missing', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Valid Name', description: '' });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /admin/procedures - returns 409 when duplicate name', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Transcript Request', description: 'Some description' });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
});

test('POST /admin/procedures - returns 400 when faculty does not exist', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New Procedure', description: 'Some desc', facultyId: 'fac-invalid' });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /admin/procedures - returns 400 when career does not exist', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New Procedure', description: 'Some desc', careerId: 'car-invalid' });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /admin/procedures - returns 400 when requirement has no name', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'New Procedure',
            description: 'Some desc',
            requirements: [{ name: '', description: 'Some req', isMandatory: true }],
        });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
});

test('POST /admin/procedures - rejects request without token', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .send({ name: 'Test', description: 'Test desc' });

    assert.equal(res.status, 401);
});

test('POST /admin/procedures - rejects student role', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .post('/api/v1/admin/procedures')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Test', description: 'Test desc' });

    assert.equal(res.status, 403);
});

// ─── Tests: PUT /admin/procedures/:id ─────────────────────────────────────

test('PUT /admin/procedures/:id - updates procedure successfully', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .put('/api/v1/admin/procedures/proc-1')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Name', description: 'Updated desc' });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.name, 'Updated Name');
});

test('PUT /admin/procedures/:id - returns 404 when not found', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .put('/api/v1/admin/procedures/nonexistent')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Test' });

    assert.equal(res.status, 404);
});

test('PUT /admin/procedures/:id - rejects student role', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .put('/api/v1/admin/procedures/proc-1')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Test' });

    assert.equal(res.status, 403);
});

// ─── Tests: DELETE /admin/procedures/:id ──────────────────────────────────

test('DELETE /admin/procedures/:id - deletes procedure successfully', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .delete('/api/v1/admin/procedures/proc-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
});

test('DELETE /admin/procedures/:id - returns 404 when not found', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createAdminToken();

    const res = await supertest(app)
        .delete('/api/v1/admin/procedures/nonexistent')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 404);
});

test('DELETE /admin/procedures/:id - rejects student role', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);
    const token = createStudentToken();

    const res = await supertest(app)
        .delete('/api/v1/admin/procedures/proc-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 403);
});

test('DELETE /admin/procedures/:id - rejects request without token', async () => {
    const service = new MockAdminProcedureService();
    const app = buildApp(service);

    const res = await supertest(app)
        .delete('/api/v1/admin/procedures/proc-1');

    assert.equal(res.status, 401);
});
