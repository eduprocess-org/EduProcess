const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';

const { ProcedureController } = require('../../dist/infrastructure/http/controllers/procedure.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { adminMiddleware } = require('../../dist/infrastructure/http/middlewares/admin.middleware.js');
const { Router } = require('express');

// ─── Mock Service (bypasses Supabase) ─────────────────────────────────────────

const STATUS_LABELS = { pending: 'Submitted', in_review: 'Under Review', approved: 'Approved', rejected: 'Rejected' };

class FullFlowMockService {
    constructor() {
        this.procedures = [
            { id: 'proc-1', name: 'Academic Transcript', description: 'Official transcript', requirementsText: 'Valid ID', isActive: true },
            { id: 'proc-2', name: 'Enrollment Certificate', description: 'Proof of enrollment', requirementsText: 'None', isActive: true },
        ];
        this.requests = [];
        this.auditLogs = [];
        this.auditLogId = 1;
        this.observations = [];
    }

    async getAllProcedures(studentId) { return this.procedures; }

    async getProcedureDetails(id) {
        const proc = this.procedures.find(p => p.id === id);
        if (!proc) throw new Error('Procedure not found');
        return { ...proc, requirements: [] };
    }

    async createRequest(studentId, procedureId, files) {
        const req = {
            id: `req-${this.requests.length + 1}`,
            studentId,
            procedureTypeId: procedureId,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
            procedure: this.procedures.find(p => p.id === procedureId),
            documents: files.map(f => ({ fileName: f.originalname, fileUrl: `https://fake-url.com/${f.originalname}` })),
        };
        this.requests.push(req);
        this.auditLogs.push({ requestId: req.id, id: `audit-${this.auditLogId++}`, action: 'STATUS_CHANGE', oldValue: null, newValue: 'pending', createdAt: new Date() });
        return req;
    }

    async getStudentRequests(studentId) {
        return this.requests.filter(r => r.studentId === studentId).map(r => ({ ...r, procedure: this.procedures.find(p => p.id === r.procedureTypeId) }));
    }

    async getRequestTracking(requestId, studentId) {
        const req = this.requests.find(r => r.id === requestId && r.studentId === studentId);
        if (!req) throw new Error('Request not found or unauthorized');
        return { ...req, observations: this.observations.filter(o => o.requestId === requestId), auditLogs: this.auditLogs.filter(l => l.requestId === requestId) };
    }

    async updateRequestStatus(requestId, newStatus, userId, userRole, comment) {
        if (userRole !== 'admin') throw new Error('Only administrators can update request status');
        const req = this.requests.find(r => r.id === requestId);
        if (!req) throw new Error('Request not found');

        const { isTransitionValid } = require('../../dist/domain/procedures/status-machine');
        if (!isTransitionValid(req.status, newStatus)) {
            throw new Error(`Invalid status transition from ${req.status} to ${newStatus}`);
        }

        const oldStatus = req.status;
        req.status = newStatus;
        req.updatedAt = new Date();
        if (comment) {
            this.observations.push({ id: `obs-${Date.now()}`, requestId, comment, createdAt: new Date(), adminName: 'Admin Test' });
        }
        this.auditLogs.push({ requestId, id: `audit-${this.auditLogId++}`, action: 'STATUS_CHANGE', oldValue: oldStatus, newValue: newStatus, createdAt: new Date() });
        return { ...req, observations: this.observations.filter(o => o.requestId === requestId), auditLogs: this.auditLogs.filter(l => l.requestId === requestId) };
    }

    async getRequestTimeline(requestId, studentId) {
        const req = this.requests.find(r => r.id === requestId && r.studentId === studentId);
        if (!req) throw new Error('Request not found or unauthorized');
        const { StatusHistoryService } = require('../../dist/application/procedures/status-history.service');
        const shs = new StatusHistoryService();
        return shs.buildTimeline({
            createdAt: req.createdAt,
            status: req.status,
            observations: this.observations.filter(o => o.requestId === requestId),
            auditLogs: this.auditLogs.filter(l => l.requestId === requestId),
        }, STATUS_LABELS);
    }

    async adminGetRequestTimeline(requestId) {
        const req = this.requests.find(r => r.id === requestId);
        if (!req) throw new Error('Request not found');
        const { StatusHistoryService } = require('../../dist/application/procedures/status-history.service');
        const shs = new StatusHistoryService();
        return shs.buildTimeline({
            createdAt: req.createdAt,
            status: req.status,
            observations: this.observations.filter(o => o.requestId === requestId),
            auditLogs: this.auditLogs.filter(l => l.requestId === requestId),
        }, STATUS_LABELS);
    }
}

// ─── Build app ────────────────────────────────────────────────────────────────

const buildApp = () => {
    const app = express();
    app.use(express.json());

    const service = new FullFlowMockService();
    const controller = new ProcedureController(service);

    const router = Router();
    router.get('/procedures', authMiddleware, controller.getProcedures);
    router.get('/procedures/:id', authMiddleware, controller.getProcedureDetails);
    router.get('/requests', authMiddleware, controller.getStudentRequests);
    router.post('/requests', authMiddleware, (req, res, next) => {
        req.files = req.files || [];
        if (req.headers['x-mock-files']) {
            req.files = [{ originalname: 'document.pdf', buffer: Buffer.from('pdf'), mimetype: 'application/pdf' }];
        }
        if (!req.body.procedureId) req.body.procedureId = 'proc-1';
        next();
    }, controller.createRequest);
    router.get('/requests/:id/tracking', authMiddleware, controller.getRequestTracking);
    router.get('/requests/:id/timeline', authMiddleware, controller.getRequestTimeline);
    router.patch('/requests/:id/status', authMiddleware, adminMiddleware, controller.updateRequestStatus);
    router.get('/admin/requests/:id/timeline', authMiddleware, adminMiddleware, controller.adminGetRequestTimeline);

    app.use('/api/v1', router);
    return app;
};

const studentToken = jwt.sign(
    { userId: 'student-1', email: 'student@uce.edu.ec', role: 'student' },
    process.env.JWT_SESSION_SECRET,
    { expiresIn: '1h' }
);

const adminToken = jwt.sign(
    { userId: 'admin-1', email: 'admin@uce.edu.ec', role: 'admin' },
    process.env.JWT_SESSION_SECRET,
    { expiresIn: '1h' }
);

// ─── Full Flow Test ───────────────────────────────────────────────────────────

test('FULL FLOW: complete request lifecycle end-to-end', async () => {
    const app = buildApp();

    // 1. Student lists procedures
    const proceduresRes = await supertest(app)
        .get('/api/v1/procedures')
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(proceduresRes.status, 200);
    assert.equal(proceduresRes.body.data.length, 2);
    const procedureId = proceduresRes.body.data[0].id;
    assert.ok(procedureId);

    // 2. Student views procedure details
    const detailsRes = await supertest(app)
        .get(`/api/v1/procedures/${procedureId}`)
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(detailsRes.status, 200);
    assert.equal(detailsRes.body.data.name, 'Academic Transcript');

    // 3. Student creates a request with file
    const createRes = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${studentToken}`)
        .set('x-mock-files', 'true')
        .field('procedureId', procedureId);
    assert.equal(createRes.status, 201);
    const requestId = createRes.body.data.id;
    assert.ok(requestId);

    // 4. Student lists their requests
    const requestsRes = await supertest(app)
        .get('/api/v1/requests')
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(requestsRes.status, 200);
    assert.equal(requestsRes.body.data.length, 1);
    assert.equal(requestsRes.body.data[0].procedure?.name || requestsRes.body.data[0].procedureName, 'Academic Transcript');

    // 5. Student views request tracking
    const trackingRes = await supertest(app)
        .get(`/api/v1/requests/${requestId}/tracking`)
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(trackingRes.status, 200);
    assert.equal(trackingRes.body.data.status, 'pending');

    // 6. Student views timeline (initially just "Submitted")
    const timelineRes = await supertest(app)
        .get(`/api/v1/requests/${requestId}/timeline`)
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(timelineRes.status, 200);
    assert.equal(timelineRes.body.data.length, 1);

    // 7. Admin moves request to in_review
    const reviewRes = await supertest(app)
        .patch(`/api/v1/requests/${requestId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'in_review', comment: 'Documentation is being reviewed.' });
    assert.equal(reviewRes.status, 200);
    assert.equal(reviewRes.body.data.status, 'in_review');

    // 8. Student views updated tracking
    const tracking2Res = await supertest(app)
        .get(`/api/v1/requests/${requestId}/tracking`)
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(tracking2Res.status, 200);
    assert.equal(tracking2Res.body.data.status, 'in_review');

    // 9. Student views updated timeline (should have 2 entries now)
    const timeline2Res = await supertest(app)
        .get(`/api/v1/requests/${requestId}/timeline`)
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(timeline2Res.status, 200);
    assert.equal(timeline2Res.body.data.length, 2);
    assert.equal(timeline2Res.body.data[1].status, 'Under Review');

    // 10. Admin approves the request
    const approveRes = await supertest(app)
        .patch(`/api/v1/requests/${requestId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'approved', comment: 'All documents are valid. Request approved.' });
    assert.equal(approveRes.status, 200);
    assert.equal(approveRes.body.data.status, 'approved');

    // 11. Admin views full timeline
    const adminTimelineRes = await supertest(app)
        .get(`/api/v1/admin/requests/${requestId}/timeline`)
        .set('Authorization', `Bearer ${adminToken}`);
    assert.equal(adminTimelineRes.status, 200);
    assert.equal(adminTimelineRes.body.data.length, 3);
    assert.equal(adminTimelineRes.body.data[2].status, 'Approved');

    // 12. Student cannot change status (non-admin)
    const studentChangeRes = await supertest(app)
        .patch(`/api/v1/requests/${requestId}/status`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ status: 'in_review' });
    assert.equal(studentChangeRes.status, 403);

    // 13. Cannot transition from terminal state (approved -> anything)
    const invalidTransitionRes = await supertest(app)
        .patch(`/api/v1/requests/${requestId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'in_review' });
    assert.equal(invalidTransitionRes.status, 422);
    assert.ok(invalidTransitionRes.body.message.includes('Invalid status transition'));

    // 14. Student views final tracking
    const finalTrackingRes = await supertest(app)
        .get(`/api/v1/requests/${requestId}/tracking`)
        .set('Authorization', `Bearer ${studentToken}`);
    assert.equal(finalTrackingRes.status, 200);
    assert.equal(finalTrackingRes.body.data.status, 'approved');
});
