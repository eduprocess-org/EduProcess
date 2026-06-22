const test = require('node:test');
const assert = require('node:assert/strict');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';
const { AdminDashboardService } = require('../../dist/application/admin/admin-dashboard.service.js');

// ─── Mock Repository ─────────────────────────────────────────────────────────

class MockAdminDashboardRepository {
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
            { procedureTypeId: 'proc-3', procedureName: 'Grade Appeal', count: 40 },
        ];
        this.allRequests = {
            data: [
                {
                    id: 'req-1',
                    studentName: 'Juan Perez',
                    studentEmail: 'juan@uce.edu.ec',
                    procedureName: 'Transcript Request',
                    career: 'Sistemas de Informacion',
                    semester: '7mo',
                    status: 'pending',
                    createdAt: '2026-06-16T00:00:00.000Z',
                    updatedAt: '2026-06-16T00:00:00.000Z',
                },
            ],
            total: 1,
            page: 1,
            limit: 10,
            totalPages: 1,
        };
        this.requestDetail = {
            id: 'req-1',
            student: { id: 'stu-1', firstName: 'Juan', lastName: 'Perez', email: 'juan@uce.edu.ec', career: 'Sistemas de Informacion' },
            procedureType: { id: 'proc-1', name: 'Transcript Request', description: 'Request for academic transcript' },
            career: 'Sistemas de Informacion',
            semester: '7mo',
            reason: 'Need transcript for job application',
            status: 'pending',
            createdAt: '2026-06-16T00:00:00.000Z',
            updatedAt: '2026-06-16T00:00:00.000Z',
        };
        this.requestDocuments = [
            { id: 'doc-1', fileName: 'transcript.pdf', fileUrl: 'https://storage.example.com/doc-1', uploadedAt: '2026-06-16T00:00:00.000Z' },
        ];
        this.requestHistory = [
            { id: 'log-1', action: 'created', oldValue: null, newValue: 'pending', adminName: 'Admin User', createdAt: '2026-06-16T00:00:00.000Z' },
        ];
    }

    async getDashboardStats() { return this.stats; }
    async getRecentRequests() { return this.recentRequests; }
    async getRequestsByProcedureType() { return this.requestsByProcedureType; }
    async getAllRequests() { return this.allRequests; }
    async getRequestDetail() { return this.requestDetail; }
    async getRequestDocuments() { return this.requestDocuments; }
    async getRequestHistory() { return this.requestHistory; }
}

class MockAdminDashboardRepositoryEmpty {
    constructor() {
        this.stats = { totalRequests: 0, pendingRequests: 0, approvedRequests: 0, rejectedRequests: 0 };
        this.recentRequests = [];
        this.requestsByProcedureType = [];
        this.allRequests = { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
    }

    async getDashboardStats() { return this.stats; }
    async getRecentRequests() { return this.recentRequests; }
    async getRequestsByProcedureType() { return this.requestsByProcedureType; }
    async getAllRequests() { return this.allRequests; }
    async getRequestDetail() { return null; }
    async getRequestDocuments() { return []; }
    async getRequestHistory() { return []; }
}

class MockAdminDashboardRepositoryError {
    async getDashboardStats() { throw new Error('Database connection failed'); }
    async getRecentRequests() { throw new Error('Database connection failed'); }
    async getRequestsByProcedureType() { throw new Error('Database connection failed'); }
    async getAllRequests() { throw new Error('Database connection failed'); }
    async getRequestDetail() { throw new Error('Database connection failed'); }
    async getRequestDocuments() { throw new Error('Database connection failed'); }
    async getRequestHistory() { throw new Error('Database connection failed'); }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test('AdminDashboardService - getDashboardStats returns correct stats', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const stats = await service.getDashboardStats();

    assert.equal(stats.totalRequests, 125);
    assert.equal(stats.pendingRequests, 42);
    assert.equal(stats.approvedRequests, 70);
    assert.equal(stats.rejectedRequests, 13);
});

test('AdminDashboardService - getRecentRequests returns requests array', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const requests = await service.getRecentRequests();

    assert.equal(requests.length, 2);
    assert.equal(requests[0].id, 'req-1');
    assert.equal(requests[0].studentName, 'Juan Perez');
    assert.equal(requests[0].procedureName, 'Transcript Request');
    assert.equal(requests[0].status, 'PENDING');
    assert.equal(requests[1].status, 'APPROVED');
});

test('AdminDashboardService - handles empty data correctly', async () => {
    const repo = new MockAdminDashboardRepositoryEmpty();
    const service = new AdminDashboardService(repo);

    const stats = await service.getDashboardStats();
    const requests = await service.getRecentRequests();

    assert.equal(stats.totalRequests, 0);
    assert.equal(stats.pendingRequests, 0);
    assert.equal(stats.approvedRequests, 0);
    assert.equal(stats.rejectedRequests, 0);
    assert.equal(requests.length, 0);
});

test('AdminDashboardService - throws on repository error', async () => {
    const repo = new MockAdminDashboardRepositoryError();
    const service = new AdminDashboardService(repo);

    await assert.rejects(
        () => service.getDashboardStats(),
        { message: 'Database connection failed' }
    );

    await assert.rejects(
        () => service.getRecentRequests(),
        { message: 'Database connection failed' }
    );

    await assert.rejects(
        () => service.getRequestsByProcedureType(),
        { message: 'Database connection failed' }
    );
});

test('AdminDashboardService - getRequestsByProcedureType returns correct data', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const result = await service.getRequestsByProcedureType();

    assert.equal(result.length, 3);
    assert.equal(result[0].procedureName, 'Transcript Request');
    assert.equal(result[0].count, 50);
    assert.equal(result[1].procedureName, 'Enrollment Certificate');
    assert.equal(result[1].count, 35);
});

test('AdminDashboardService - getRequestsByProcedureType handles empty data', async () => {
    const repo = new MockAdminDashboardRepositoryEmpty();
    const service = new AdminDashboardService(repo);

    const result = await service.getRequestsByProcedureType();

    assert.equal(result.length, 0);
});

// ─── New Tests: Request Management ──────────────────────────────────────────

test('AdminDashboardService - getAllRequests returns paginated results', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const result = await service.getAllRequests({}, { page: 1, limit: 10 }, { field: 'createdAt', direction: 'desc' });

    assert.equal(result.data.length, 1);
    assert.equal(result.total, 1);
    assert.equal(result.page, 1);
    assert.equal(result.limit, 10);
    assert.equal(result.totalPages, 1);
    assert.equal(result.data[0].studentName, 'Juan Perez');
    assert.equal(result.data[0].studentEmail, 'juan@uce.edu.ec');
    assert.equal(result.data[0].procedureName, 'Transcript Request');
});

test('AdminDashboardService - getAllRequests handles empty results', async () => {
    const repo = new MockAdminDashboardRepositoryEmpty();
    const service = new AdminDashboardService(repo);

    const result = await service.getAllRequests({}, { page: 1, limit: 10 }, { field: 'createdAt', direction: 'desc' });

    assert.equal(result.data.length, 0);
    assert.equal(result.total, 0);
    assert.equal(result.totalPages, 0);
});

test('AdminDashboardService - getAllRequests passes filters to repository', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const result = await service.getAllRequests(
        { status: 'pending', career: 'Sistemas de Informacion' },
        { page: 1, limit: 5 },
        { field: 'updatedAt', direction: 'asc' }
    );

    assert.ok(result);
    assert.equal(result.data.length, 1);
});

test('AdminDashboardService - getRequestDetail returns request detail', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const detail = await service.getRequestDetail('req-1');

    assert.equal(detail.id, 'req-1');
    assert.equal(detail.student.firstName, 'Juan');
    assert.equal(detail.student.lastName, 'Perez');
    assert.equal(detail.student.email, 'juan@uce.edu.ec');
    assert.equal(detail.procedureType.name, 'Transcript Request');
    assert.equal(detail.status, 'pending');
});

test('AdminDashboardService - getRequestDetail throws when not found', async () => {
    const repo = new MockAdminDashboardRepositoryEmpty();
    const service = new AdminDashboardService(repo);

    await assert.rejects(
        () => service.getRequestDetail('nonexistent'),
        { message: 'Request not found' }
    );
});

test('AdminDashboardService - getRequestDocuments returns document list', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const docs = await service.getRequestDocuments('req-1');

    assert.equal(docs.length, 1);
    assert.equal(docs[0].fileName, 'transcript.pdf');
    assert.equal(docs[0].fileUrl, 'https://storage.example.com/doc-1');
});

test('AdminDashboardService - getRequestDocuments returns empty array when no documents', async () => {
    const repo = new MockAdminDashboardRepositoryEmpty();
    const service = new AdminDashboardService(repo);

    const docs = await service.getRequestDocuments('req-1');

    assert.equal(docs.length, 0);
});

test('AdminDashboardService - getRequestHistory returns audit log entries', async () => {
    const repo = new MockAdminDashboardRepository();
    const service = new AdminDashboardService(repo);

    const history = await service.getRequestHistory('req-1');

    assert.equal(history.length, 1);
    assert.equal(history[0].action, 'created');
    assert.equal(history[0].oldValue, null);
    assert.equal(history[0].newValue, 'pending');
    assert.equal(history[0].adminName, 'Admin User');
});

test('AdminDashboardService - getRequestHistory returns empty array when no history', async () => {
    const repo = new MockAdminDashboardRepositoryEmpty();
    const service = new AdminDashboardService(repo);

    const history = await service.getRequestHistory('req-1');

    assert.equal(history.length, 0);
});

test('AdminDashboardService - throws on repository error for new methods', async () => {
    const repo = new MockAdminDashboardRepositoryError();
    const service = new AdminDashboardService(repo);

    await assert.rejects(
        () => service.getAllRequests({}, { page: 1, limit: 10 }, { field: 'createdAt', direction: 'desc' }),
        { message: 'Database connection failed' }
    );

    await assert.rejects(
        () => service.getRequestDocuments('req-1'),
        { message: 'Database connection failed' }
    );

    await assert.rejects(
        () => service.getRequestHistory('req-1'),
        { message: 'Database connection failed' }
    );
});
