const test = require('node:test');
const assert = require('node:assert/strict');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';
const { ObservationService } = require('../../dist/application/observations/observation.service.js');

// ─── Mock Repository ─────────────────────────────────────────────────────────

class MockObservationRepository {
    constructor() {
        this.observations = [];
        this.nextId = 1;
        this.shouldFail = false;
    }

    async create(input) {
        if (this.shouldFail) throw new Error('Database error');
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

    async findByRequest(requestId) {
        if (this.shouldFail) throw new Error('Database error');
        return this.observations.filter(o => o.requestId === requestId);
    }

    async findById(id) {
        if (this.shouldFail) throw new Error('Database error');
        return this.observations.find(o => o.id === id) || null;
    }

    async delete(id) {
        if (this.shouldFail) throw new Error('Database error');
        this.observations = this.observations.filter(o => o.id !== id);
    }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test('ObservationService - createObservation creates observation successfully', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    const result = await service.createObservation({
        requestId: 'req-1',
        adminId: 'admin-1',
        comment: 'Please review the attached documents',
    });

    assert.equal(result.requestId, 'req-1');
    assert.equal(result.adminId, 'admin-1');
    assert.equal(result.comment, 'Please review the attached documents');
    assert.ok(result.id);
    assert.ok(result.createdAt);
});

test('ObservationService - createObservation trims whitespace from comment', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    const result = await service.createObservation({
        requestId: 'req-1',
        adminId: 'admin-1',
        comment: '  Needs more details  ',
    });

    assert.equal(result.comment, 'Needs more details');
});

test('ObservationService - createObservation rejects empty comment', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    await assert.rejects(
        () => service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: '' }),
        { message: 'Observation comment is required' }
    );
});

test('ObservationService - createObservation rejects whitespace-only comment', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    await assert.rejects(
        () => service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: '   ' }),
        { message: 'Observation comment is required' }
    );
});

test('ObservationService - getObservationsByRequest returns observations for a request', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'First comment' });
    await service.createObservation({ requestId: 'req-1', adminId: 'admin-2', comment: 'Second comment' });
    await service.createObservation({ requestId: 'req-2', adminId: 'admin-1', comment: 'Other request' });

    const results = await service.getObservationsByRequest('req-1');
    assert.equal(results.length, 2);
    assert.equal(results[0].comment, 'First comment');
    assert.equal(results[1].comment, 'Second comment');
});

test('ObservationService - getObservationsByRequest returns empty array when no observations', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    const results = await service.getObservationsByRequest('req-nonexistent');
    assert.equal(results.length, 0);
});

test('ObservationService - getObservationById returns observation when found', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    const created = await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'Test' });
    const found = await service.getObservationById(created.id);

    assert.equal(found.id, created.id);
    assert.equal(found.comment, 'Test');
});

test('ObservationService - getObservationById throws when not found', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    await assert.rejects(
        () => service.getObservationById('obs-nonexistent'),
        { message: 'Observation not found' }
    );
});

test('ObservationService - deleteObservation deletes successfully', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    const created = await service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'To delete' });
    await service.deleteObservation(created.id);

    const found = await service.getObservationById(created.id).catch(() => null);
    assert.equal(found, null);
});

test('ObservationService - deleteObservation throws when not found', async () => {
    const repo = new MockObservationRepository();
    const service = new ObservationService(repo);

    await assert.rejects(
        () => service.deleteObservation('obs-nonexistent'),
        { message: 'Observation not found' }
    );
});

test('ObservationService - createObservation throws on repository error', async () => {
    const repo = new MockObservationRepository();
    repo.shouldFail = true;
    const service = new ObservationService(repo);

    await assert.rejects(
        () => service.createObservation({ requestId: 'req-1', adminId: 'admin-1', comment: 'Test' }),
        { message: 'Database error' }
    );
});
