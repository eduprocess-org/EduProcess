const test = require('node:test');
const assert = require('node:assert/strict');

const { StatusHistoryService } = require('../../dist/application/procedures/status-history.service');

const STATUS_LABELS = {
    pending: 'Submitted',
    in_review: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected',
};

const service = new StatusHistoryService();

// ─── Timeline Tests ───────────────────────────────────────────────────────────

test('StatusHistoryService - buildTimeline: creates first entry from creation date', () => {
    const timeline = service.buildTimeline(
        { createdAt: new Date('2026-06-10'), status: 'pending' },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 1);
    assert.equal(timeline[0].status, 'Submitted');
    assert.equal(timeline[0].date, '2026-06-10');
    assert.equal(timeline[0].description, 'Request submitted successfully.');
});

test('StatusHistoryService - buildTimeline: includes audit log entries', () => {
    const timeline = service.buildTimeline(
        {
            createdAt: new Date('2026-06-10'),
            status: 'in_review',
            auditLogs: [
                { action: 'STATUS_CHANGE', oldValue: 'pending', newValue: 'in_review', createdAt: new Date('2026-06-11') },
            ],
        },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 2);
    assert.equal(timeline[0].status, 'Submitted');
    assert.equal(timeline[1].status, 'Under Review');
    assert.equal(timeline[1].date, '2026-06-11');
});

test('StatusHistoryService - buildTimeline: includes full flow (pending -> in_review -> approved)', () => {
    const timeline = service.buildTimeline(
        {
            createdAt: new Date('2026-06-10'),
            status: 'approved',
            auditLogs: [
                { action: 'STATUS_CHANGE', oldValue: 'pending', newValue: 'in_review', createdAt: new Date('2026-06-11') },
                { action: 'STATUS_CHANGE', oldValue: 'in_review', newValue: 'approved', createdAt: new Date('2026-06-12') },
            ],
        },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 3);
    assert.equal(timeline[0].status, 'Submitted');
    assert.equal(timeline[0].date, '2026-06-10');
    assert.equal(timeline[1].status, 'Under Review');
    assert.equal(timeline[1].date, '2026-06-11');
    assert.equal(timeline[2].status, 'Approved');
    assert.equal(timeline[2].date, '2026-06-12');
});

test('StatusHistoryService - buildTimeline: includes observations as descriptions', () => {
    const timeline = service.buildTimeline(
        {
            createdAt: new Date('2026-06-10'),
            status: 'rejected',
            auditLogs: [
                { action: 'STATUS_CHANGE', oldValue: 'pending', newValue: 'in_review', createdAt: new Date('2026-06-11') },
                { action: 'STATUS_CHANGE', oldValue: 'in_review', newValue: 'rejected', createdAt: new Date('2026-06-12') },
            ],
            observations: [
                { comment: 'Documentation is incomplete', createdAt: new Date('2026-06-12') },
            ],
        },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 3);
    const lastEntry = timeline[timeline.length - 1];
    assert.equal(lastEntry.description, 'Documentation is incomplete');
});

test('StatusHistoryService - buildTimeline: observation on pending request does not duplicate Submitted', () => {
    const timeline = service.buildTimeline(
        {
            createdAt: new Date('2026-06-10'),
            status: 'pending',
            observations: [
                { comment: 'We need additional documents', createdAt: new Date('2026-06-11') },
            ],
        },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 1);
    assert.equal(timeline[0].status, 'Submitted');
    assert.equal(timeline[0].description, 'We need additional documents');
});

test('StatusHistoryService - buildTimeline: observation on same status as last entry does not duplicate', () => {
    const timeline = service.buildTimeline(
        {
            createdAt: new Date('2026-06-10'),
            status: 'in_review',
            auditLogs: [
                { action: 'STATUS_CHANGE', oldValue: 'pending', newValue: 'in_review', createdAt: new Date('2026-06-11') },
            ],
            observations: [
                { comment: 'Under review observation', createdAt: new Date('2026-06-12') },
            ],
        },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 2);
    assert.equal(timeline[1].description, 'Under review observation');
});

test('StatusHistoryService - buildTimeline: non-STATUS_CHANGE audit logs are ignored', () => {
    const timeline = service.buildTimeline(
        {
            createdAt: new Date('2026-06-10'),
            status: 'pending',
            auditLogs: [
                { action: 'LOGIN', oldValue: null, newValue: null, createdAt: new Date('2026-06-11') },
                { action: 'VIEW', oldValue: null, newValue: null, createdAt: new Date('2026-06-12') },
            ],
        },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 1);
});

test('StatusHistoryService - buildTimeline: sorts entries chronologically', () => {
    const timeline = service.buildTimeline(
        {
            createdAt: new Date('2026-06-10'),
            status: 'approved',
            auditLogs: [
                { action: 'STATUS_CHANGE', oldValue: 'pending', newValue: 'in_review', createdAt: new Date('2026-06-15') },
                { action: 'STATUS_CHANGE', oldValue: 'in_review', newValue: 'approved', createdAt: new Date('2026-06-12') },
            ],
        },
        STATUS_LABELS
    );

    assert.equal(timeline.length, 3);
    assert.equal(timeline[0].date, '2026-06-10');
    assert.equal(timeline[1].date, '2026-06-12');
    assert.equal(timeline[2].date, '2026-06-15');
});
