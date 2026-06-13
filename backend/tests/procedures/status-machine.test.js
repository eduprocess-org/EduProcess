const test = require('node:test');
const assert = require('node:assert/strict');

const { isTransitionValid, getNextPossibleStatuses, STATUS_LABELS } = require('../../dist/domain/procedures/status-machine');

// ─── Status Machine (Pure Logic) ──────────────────────────────────────────────

test('StatusMachine - isTransitionValid: pending to in_review is valid', () => {
    assert.equal(isTransitionValid('pending', 'in_review'), true);
});

test('StatusMachine - isTransitionValid: pending to approved is invalid', () => {
    assert.equal(isTransitionValid('pending', 'approved'), false);
});

test('StatusMachine - isTransitionValid: pending to rejected is invalid', () => {
    assert.equal(isTransitionValid('pending', 'rejected'), false);
});

test('StatusMachine - isTransitionValid: in_review to approved is valid', () => {
    assert.equal(isTransitionValid('in_review', 'approved'), true);
});

test('StatusMachine - isTransitionValid: in_review to rejected is valid', () => {
    assert.equal(isTransitionValid('in_review', 'rejected'), true);
});

test('StatusMachine - isTransitionValid: in_review to pending is invalid (no rollback)', () => {
    assert.equal(isTransitionValid('in_review', 'pending'), false);
});

test('StatusMachine - isTransitionValid: approved to any is invalid (terminal)', () => {
    assert.equal(isTransitionValid('approved', 'in_review'), false);
    assert.equal(isTransitionValid('approved', 'pending'), false);
    assert.equal(isTransitionValid('approved', 'rejected'), false);
});

test('StatusMachine - isTransitionValid: rejected to any is invalid (terminal)', () => {
    assert.equal(isTransitionValid('rejected', 'in_review'), false);
    assert.equal(isTransitionValid('rejected', 'pending'), false);
    assert.equal(isTransitionValid('rejected', 'approved'), false);
});

test('StatusMachine - isTransitionValid: unknown status returns false', () => {
    assert.equal(isTransitionValid('unknown', 'pending'), false);
    assert.equal(isTransitionValid('', 'pending'), false);
});

test('StatusMachine - getNextPossibleStatuses: pending can go to in_review', () => {
    const next = getNextPossibleStatuses('pending');
    assert.deepEqual(next, ['in_review']);
});

test('StatusMachine - getNextPossibleStatuses: in_review can go to approved or rejected', () => {
    const next = getNextPossibleStatuses('in_review');
    assert.equal(next.length, 2);
    assert.ok(next.includes('approved'));
    assert.ok(next.includes('rejected'));
});

test('StatusMachine - getNextPossibleStatuses: approved has no transitions', () => {
    const next = getNextPossibleStatuses('approved');
    assert.deepEqual(next, []);
});

test('StatusMachine - getNextPossibleStatuses: rejected has no transitions', () => {
    const next = getNextPossibleStatuses('rejected');
    assert.deepEqual(next, []);
});

test('StatusMachine - getNextPossibleStatuses: unknown status returns empty', () => {
    const next = getNextPossibleStatuses('nonexistent');
    assert.deepEqual(next, []);
});

test('StatusMachine - STATUS_LABELS maps correctly', () => {
    assert.equal(STATUS_LABELS.pending, 'Submitted');
    assert.equal(STATUS_LABELS.in_review, 'Under Review');
    assert.equal(STATUS_LABELS.approved, 'Approved');
    assert.equal(STATUS_LABELS.rejected, 'Rejected');
});
