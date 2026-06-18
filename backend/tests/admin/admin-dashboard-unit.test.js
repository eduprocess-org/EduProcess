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
    }

    async getDashboardStats() {
        return this.stats;
    }

    async getRecentRequests() {
        return this.recentRequests;
    }

    async getRequestsByProcedureType() {
        return this.requestsByProcedureType;
    }
}

class MockAdminDashboardRepositoryEmpty {
    constructor() {
        this.stats = {
            totalRequests: 0,
            pendingRequests: 0,
            approvedRequests: 0,
            rejectedRequests: 0,
        };
        this.recentRequests = [];
        this.requestsByProcedureType = [];
    }

    async getDashboardStats() {
        return this.stats;
    }

    async getRecentRequests() {
        return this.recentRequests;
    }

    async getRequestsByProcedureType() {
        return this.requestsByProcedureType;
    }
}

class MockAdminDashboardRepositoryError {
    async getDashboardStats() {
        throw new Error('Database connection failed');
    }

    async getRecentRequests() {
        throw new Error('Database connection failed');
    }

    async getRequestsByProcedureType() {
        throw new Error('Database connection failed');
    }
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
