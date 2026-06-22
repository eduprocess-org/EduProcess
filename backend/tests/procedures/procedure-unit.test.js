const test = require('node:test');
const assert = require('node:assert/strict');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';
const { ProcedureService } = require('../../dist/application/procedures/procedure.service.js');

// ─── Mock Repository ─────────────────────────────────────────────────────────

class MockPrismaProcedureRepository {
    constructor() {
        this.procedures = [
            { id: 'proc-1', name: 'Certificado de Matrícula', isActive: true, procedureRequirements: [] },
            { id: 'proc-2', name: 'Cambio de Carrera', isActive: true, procedureRequirements: [] }
        ];
        this.requests = [];
    }

    async findAllActive(userCareerId, userFacultyId) {
        return this.procedures.filter(p => p.isActive);
    }

    async findStudentCareer(studentId) {
        return { careerId: null, facultyId: null, careerName: null };
    }

    async findById(id) {
        return this.procedures.find(p => p.id === id) || null;
    }

    async createRequest(input) {
        const newReq = {
            id: `req-${Date.now()}`,
            studentId: input.studentId,
            procedureTypeId: input.procedureTypeId,
            status: 'pending',
            documents: input.documents,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.requests.push(newReq);
        return newReq;
    }

    async findRequestsByStudent(studentId) {
        return this.requests.filter(r => r.studentId === studentId);
    }

    async findRequestTracking(requestId, studentId) {
        return this.requests.find(r => r.id === requestId && r.studentId === studentId) || null;
    }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test('ProcedureRepository - Mock implementation functions correctly', async () => {
    const repo = new MockPrismaProcedureRepository();
    
    // Test findAllActive
    const active = await repo.findAllActive();
    assert.equal(active.length, 2);

    // Test findById
    const proc = await repo.findById('proc-1');
    assert.equal(proc.name, 'Certificado de Matrícula');

    const notFound = await repo.findById('invalid');
    assert.equal(notFound, null);

    // Test createRequest and retrieve
    const req = await repo.createRequest({
        studentId: 'student-99',
        procedureTypeId: 'proc-1',
        documents: [{ fileName: 'doc.pdf', fileUrl: 'http://url.com' }]
    });

    assert.equal(req.studentId, 'student-99');
    assert.equal(req.documents.length, 1);

    const studentReqs = await repo.findRequestsByStudent('student-99');
    assert.equal(studentReqs.length, 1);

    const tracking = await repo.findRequestTracking(req.id, 'student-99');
    assert.equal(tracking.id, req.id);
});

test('ProcedureService - getAllProcedures', async () => {
    const repo = new MockPrismaProcedureRepository();
    const service = new ProcedureService(repo);

    const result = await service.getAllProcedures();
    assert.equal(result.length, 2);
});

test('ProcedureService - getProcedureDetails throws on invalid ID', async () => {
    const repo = new MockPrismaProcedureRepository();
    const service = new ProcedureService(repo);

    try {
        await service.getProcedureDetails('invalid-id');
        assert.fail('Should have thrown');
    } catch (error) {
        assert.equal(error.message, 'Procedure not found');
    }
});

test('ProcedureService - createRequest throws on invalid procedure', async () => {
    const repo = new MockPrismaProcedureRepository();
    const service = new ProcedureService(repo);

    try {
        await service.createRequest('student-1', 'invalid-id', [{ originalname: 'x.pdf', buffer: Buffer.from('x'), mimetype: 'application/pdf' }]);
        assert.fail('Should have thrown');
    } catch (error) {
        assert.equal(error.message, 'Procedure not found');
    }
});

test('ProcedureService - createRequest throws when no files provided', async () => {
    const repo = new MockPrismaProcedureRepository();
    const service = new ProcedureService(repo);

    try {
        await service.createRequest('student-1', 'proc-1', []);
        assert.fail('Should have thrown');
    } catch (error) {
        assert.equal(error.message, 'At least one document must be provided');
    }
});

test('ProcedureService - createRequest throws when procedure is inactive', async () => {
    const repo = new MockPrismaProcedureRepository();
    repo.procedures.push({ id: 'proc-inactive', name: 'Trámite Cerrado', isActive: false, procedureRequirements: [] });
    const service = new ProcedureService(repo);

    try {
        await service.createRequest('student-1', 'proc-inactive', [{ originalname: 'x.pdf', buffer: Buffer.from('x'), mimetype: 'application/pdf' }]);
        assert.fail('Should have thrown');
    } catch (error) {
        assert.equal(error.message, 'Procedure is not available for new requests');
    }
});

test('ProcedureService - getRequestTracking throws if not found', async () => {
    const repo = new MockPrismaProcedureRepository();
    const service = new ProcedureService(repo);

    try {
        await service.getRequestTracking('req-1', 'student-1');
        assert.fail('Should have thrown');
    } catch (error) {
        assert.equal(error.message, 'Request not found or unauthorized');
    }
});
