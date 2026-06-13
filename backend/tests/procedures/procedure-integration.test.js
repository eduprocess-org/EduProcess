const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';

const { ProcedureController } = require('../../dist/infrastructure/http/controllers/procedure.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { Router } = require('express');

// ─── Mock Service ─────────────────────────────────────────────────────────────

class MockProcedureService {
    constructor() {
        this.procedures = [
            { id: 'proc-1', name: 'Certificado de Matrícula', isActive: true },
            { id: 'proc-2', name: 'Cambio de Carrera', isActive: true }
        ];
        this.requests = [
            { id: 'req-1', studentId: 'student-123', procedureTypeId: 'proc-1', status: 'pending' }
        ];
    }

    async getAllProcedures() {
        return this.procedures;
    }

    async getProcedureDetails(id) {
        const proc = this.procedures.find(p => p.id === id);
        if (!proc) throw new Error('Procedure not found');
        return { ...proc, requirements: [] };
    }

    async createRequest(studentId, procedureId, files) {
        if (procedureId === 'invalid-proc') throw new Error('Procedure not found');
        
        const newReq = {
            id: `req-${Date.now()}`,
            studentId,
            procedureTypeId: procedureId,
            status: 'pending',
            documents: files.map(f => ({ fileName: f.originalname, fileUrl: `https://fake-url.com/${f.originalname}` }))
        };
        this.requests.push(newReq);
        return newReq;
    }

    async getStudentRequests(studentId) {
        return this.requests.filter(r => r.studentId === studentId);
    }

    async getRequestTracking(requestId, studentId) {
        const req = this.requests.find(r => r.id === requestId && r.studentId === studentId);
        if (!req) throw new Error('Request not found or unauthorized');
        return { ...req, trackingTimeline: [] };
    }
}

// ─── Build test Express app ────────────────────────────────────────────────────

const buildTestApp = () => {
    const app = express();
    app.use(express.json());

    const service = new MockProcedureService();
    const controller = new ProcedureController(service);

    // Mock multer array middleware since we are testing endpoints behavior
    const mockUpload = (req, res, next) => {
        if (!req.files) req.files = [];
        next();
    };

    const router = Router();
    router.get('/procedures', authMiddleware, controller.getProcedures);
    router.get('/procedures/:id', authMiddleware, controller.getProcedureDetails);
    router.get('/requests', authMiddleware, controller.getStudentRequests);
    
    // For POST /requests we inject some fake files if a specific header is passed, to simulate multer
    router.post('/requests', authMiddleware, (req, res, next) => {
        if (req.headers['x-mock-files']) {
            req.files = [{ originalname: 'test.pdf', buffer: Buffer.from('fake'), mimetype: 'application/pdf' }];
        } else {
            req.files = [];
        }
        next();
    }, controller.createRequest);
    
    router.get('/requests/:id/tracking', authMiddleware, controller.getRequestTracking);

    app.use('/api/v1', router);
    return app;
};

const generateToken = (userId) => {
    return jwt.sign(
        { userId, email: 'student@uce.edu.ec', role: 'student' },
        process.env.JWT_SESSION_SECRET || 'test-session-secret-2026',
        { expiresIn: '1h' }
    );
};

// ─── Tests ────────────────────────────────────────────────────────────────────

test('GET /procedures - returns all active procedures', async () => {
    const app = buildTestApp();
    const token = generateToken('student-123');
    
    const res = await supertest(app)
        .get('/api/v1/procedures')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 2);
});

test('GET /procedures/:id - returns procedure details', async () => {
    const app = buildTestApp();
    const token = generateToken('student-123');
    
    const res = await supertest(app)
        .get('/api/v1/procedures/proc-1')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.id, 'proc-1');
});

test('GET /procedures/:id - returns 404 for invalid procedure', async () => {
    const app = buildTestApp();
    const token = generateToken('student-123');
    
    const res = await supertest(app)
        .get('/api/v1/procedures/invalid')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
});

test('POST /requests - creates request successfully when files provided', async () => {
    const app = buildTestApp();
    const token = generateToken('student-123');
    
    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .set('x-mock-files', 'true') // triggers the mock multer
        .send({ procedureId: 'proc-1' });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.procedureTypeId, 'proc-1');
    assert.equal(res.body.data.documents.length, 1);
});

test('POST /requests - rejects if no files provided', async () => {
    const app = buildTestApp();
    const token = generateToken('student-123');
    
    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .send({ procedureId: 'proc-1' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'At least one document is required');
});

test('GET /requests - returns student requests', async () => {
    const app = buildTestApp();
    const token = generateToken('student-123');
    
    const res = await supertest(app)
        .get('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.length, 1);
});

test('GET /requests/:id/tracking - returns request tracking info', async () => {
    const app = buildTestApp();
    const token = generateToken('student-123');
    
    const res = await supertest(app)
        .get('/api/v1/requests/req-1/tracking')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.id, 'req-1');
});

test('GET /requests/:id/tracking - returns 404 if request belongs to another student', async () => {
    const app = buildTestApp();
    const token = generateToken('student-999'); // different student
    
    const res = await supertest(app)
        .get('/api/v1/requests/req-1/tracking')
        .set('Authorization', `Bearer ${token}`);

    assert.equal(res.status, 404);
});
