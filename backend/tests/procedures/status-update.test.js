const test = require('node:test');
const assert = require('node:assert/strict');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';
const { ProcedureService } = require('../../dist/application/procedures/procedure.service.js');

// ─── Mock Repository with audit support ───────────────────────────────────────

class MockStatusRepository {
    constructor() {
        this.requests = [
            {
                id: 'req-1',
                studentId: 'student-1',
                procedureTypeId: 'proc-1',
                status: 'pending',
                createdAt: new Date('2026-06-10'),
                updatedAt: new Date('2026-06-10'),
                procedure: { id: 'proc-1', name: 'Test Procedure' },
                documents: [],
                observations: [],
                auditLogs: [],
            },
            {
                id: 'req-2',
                studentId: 'student-1',
                procedureTypeId: 'proc-1',
                status: 'in_review',
                createdAt: new Date('2026-06-11'),
                updatedAt: new Date('2026-06-11'),
                procedure: { id: 'proc-1', name: 'Test Procedure' },
                documents: [],
                observations: [],
                auditLogs: [],
            },
            {
                id: 'req-3',
                studentId: 'student-1',
                procedureTypeId: 'proc-1',
                status: 'approved',
                createdAt: new Date('2026-06-12'),
                updatedAt: new Date('2026-06-12'),
                procedure: { id: 'proc-1', name: 'Test Procedure' },
                documents: [],
                observations: [],
                auditLogs: [],
            },
        ];
        this.auditLogId = 1;
    }

    async findAllActive() { return []; }
    async findById() { return null; }
    async createRequest(input) { return input; }
    async findRequestsByStudent() { return []; }

    async findRequestTracking(requestId, studentId) {
        const req = this.requests.find(r => r.id === requestId && r.studentId === studentId);
        if (!req) return null;
        return { ...req, auditLogs: this.auditLogs?.filter(l => l.requestId === requestId) ?? [] };
    }

    async findByIdWithoutAuth(requestId) {
        return this.requests.find(r => r.id === requestId) || null;
    }

    async updateStatus(input) {
        const req = this.requests.find(r => r.id === input.requestId);
        if (!req) throw new Error('Request not found');
        req.status = input.newStatus;
        req.updatedAt = new Date();
        if (input.comment) {
            req.observations.push({
                id: `obs-${Date.now()}`,
                comment: input.comment,
                createdAt: new Date(),
                adminName: 'Admin User',
            });
        }
        return { ...req, auditLogs: this.auditLogs ?? [] };
    }

    async createAuditLog(requestId, userId, action, oldValue, newValue) {
        const log = { id: `audit-${this.auditLogId++}`, action, oldValue, newValue, createdAt: new Date() };
        if (!this.auditLogs) this.auditLogs = [];
        this.auditLogs.push({ ...log, requestId });
        return log;
    }

    async findAuditLogsByRequest(requestId) {
        return (this.auditLogs ?? []).filter(l => l.requestId === requestId);
    }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test('ProcedureService - updateRequestStatus: admin can transition pending -> in_review', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    const result = await service.updateRequestStatus('req-1', 'in_review', 'admin-1', 'admin');
    assert.equal(result.status, 'in_review');
});

test('ProcedureService - updateRequestStatus: non-admin is rejected with 403', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    try {
        await service.updateRequestStatus('req-1', 'in_review', 'student-1', 'student');
        assert.fail('Should have thrown');
    } catch (error) {
        assert.equal(error.message, 'Only administrators can update request status');
    }
});

test('ProcedureService - updateRequestStatus: invalid transition is rejected', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    try {
        await service.updateRequestStatus('req-1', 'approved', 'admin-1', 'admin');
        assert.fail('Should have thrown');
    } catch (error) {
        assert.ok(error.message.startsWith('Invalid status transition'));
        assert.ok(error.message.includes('pending'));
        assert.ok(error.message.includes('approved'));
    }
});

test('ProcedureService - updateRequestStatus: non-existent request throws', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    try {
        await service.updateRequestStatus('req-nonexistent', 'in_review', 'admin-1', 'admin');
        assert.fail('Should have thrown');
    } catch (error) {
        assert.equal(error.message, 'Request not found');
    }
});

test('ProcedureService - updateRequestStatus: terminal statuses cannot transition', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    try {
        await service.updateRequestStatus('req-3', 'in_review', 'admin-1', 'admin');
        assert.fail('Should have thrown');
    } catch (error) {
        assert.ok(error.message.startsWith('Invalid status transition'));
    }
});

test('ProcedureService - updateRequestStatus: in_review can go to approved', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    const result = await service.updateRequestStatus('req-2', 'approved', 'admin-1', 'admin');
    assert.equal(result.status, 'approved');
});

test('ProcedureService - updateRequestStatus: in_review can go to rejected', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    const result = await service.updateRequestStatus('req-2', 'rejected', 'admin-1', 'admin');
    assert.equal(result.status, 'rejected');
});

test('ProcedureService - updateRequestStatus: rollback from in_review to pending is invalid', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    try {
        await service.updateRequestStatus('req-2', 'pending', 'admin-1', 'admin');
        assert.fail('Should have thrown');
    } catch (error) {
        assert.ok(error.message.startsWith('Invalid status transition'));
    }
});

test('ProcedureService - updateRequestStatus: creates audit log', async () => {
    const repo = new MockStatusRepository();
    const service = new ProcedureService(repo);

    await service.updateRequestStatus('req-1', 'in_review', 'admin-1', 'admin');

    const logs = await repo.findAuditLogsByRequest('req-1');
    assert.ok(logs.length >= 1);
    const statusLog = logs.find(l => l.action === 'STATUS_CHANGE');
    assert.ok(statusLog);
    assert.equal(statusLog.oldValue, 'pending');
    assert.equal(statusLog.newValue, 'in_review');
});
