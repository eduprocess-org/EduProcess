const test = require('node:test');
const assert = require('node:assert/strict');

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';
const { AdminProcedureService } = require('../../dist/application/admin/procedures/admin-procedure.service.js');

// ─── Mock Repository ─────────────────────────────────────────────────────────

class MockAdminProcedureRepository {
    constructor() {
        this.procedures = [
            {
                id: 'proc-1',
                name: 'Transcript Request',
                description: 'Request for official academic transcript',
                requirementsText: 'Must bring ID',
                isActive: true,
                facultyId: null,
                careerId: null,
                facultyName: null,
                careerName: null,
                requirements: [
                    { id: 'req-1', name: 'Valid ID', description: 'Government-issued ID', isMandatory: true },
                ],
                requirementsCount: 1,
                createdAt: '2026-06-01T00:00:00.000Z',
                updatedAt: '2026-06-10T00:00:00.000Z',
            },
            {
                id: 'proc-2',
                name: 'Enrollment Certificate',
                description: 'Certificate proving current enrollment',
                requirementsText: 'None',
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
        this.nextId = 3;
    }

    async findAll(filters, pagination, sort) {
        let data = [...this.procedures];

        if (filters.isActive !== undefined) {
            data = data.filter((p) => p.isActive === filters.isActive);
        }

        if (filters.search) {
            const q = filters.search.toLowerCase();
            data = data.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
            );
        }

        const total = data.length;
        const page = pagination.page;
        const limit = pagination.limit;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const paged = data.slice(start, start + limit);

        return {
            data: paged,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async findById(id) {
        return this.procedures.find((p) => p.id === id) || null;
    }

    async findByName(name) {
        const lower = name.toLowerCase();
        return this.procedures.find((p) => p.name.toLowerCase() === lower) || null;
    }

    async existsFaculty(facultyId) {
        return facultyId === 'fac-valid';
    }

    async existsCareer(careerId) {
        return careerId === 'car-valid';
    }

    async create(input) {
        const newProc = {
            id: `proc-${this.nextId++}`,
            name: input.name,
            description: input.description,
            requirementsText: input.requirementsText || '',
            isActive: input.isActive !== undefined ? input.isActive : true,
            facultyId: input.facultyId || null,
            careerId: input.careerId || null,
            facultyName: null,
            careerName: null,
            requirements: (input.requirements || []).map((r, i) => ({
                id: `new-req-${i}`,
                name: r.name,
                description: r.description,
                isMandatory: r.isMandatory !== undefined ? r.isMandatory : true,
            })),
            requirementsCount: (input.requirements || []).length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.procedures.push(newProc);
        return newProc;
    }

    async update(id, input) {
        const idx = this.procedures.findIndex((p) => p.id === id);
        if (idx === -1) return null;

        const existing = this.procedures[idx];
        const updated = {
            ...existing,
            ...(input.name !== undefined && { name: input.name }),
            ...(input.description !== undefined && { description: input.description }),
            ...(input.requirementsText !== undefined && { requirementsText: input.requirementsText }),
            ...(input.isActive !== undefined && { isActive: input.isActive }),
            ...(input.facultyId !== undefined && { facultyId: input.facultyId }),
            ...(input.careerId !== undefined && { careerId: input.careerId }),
            updatedAt: new Date().toISOString(),
        };

        if (input.requirements) {
            updated.requirements = input.requirements.map((r, i) => ({
                id: `req-${i}`,
                name: r.name,
                description: r.description,
                isMandatory: r.isMandatory !== undefined ? r.isMandatory : true,
            }));
            updated.requirementsCount = input.requirements.length;
        }

        this.procedures[idx] = updated;
        return updated;
    }

    async delete(id) {
        const idx = this.procedures.findIndex((p) => p.id === id);
        if (idx === -1) return;
        this.procedures[idx].isActive = false;
    }
}

class MockAdminProcedureRepositoryEmpty {
    async findAll() {
        return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
    }

    async findById() {
        return null;
    }

    async findByName() {
        return null;
    }

    async existsFaculty() {
        return false;
    }

    async existsCareer() {
        return false;
    }

    async create() {
        throw new Error('Should not be called');
    }

    async update() {
        throw new Error('Should not be called');
    }

    async delete() {
        throw new Error('Should not be called');
    }
}

class MockAdminProcedureRepositoryError {
    async findAll() { throw new Error('Database connection failed'); }
    async findById() { throw new Error('Database connection failed'); }
    async findByName() { throw new Error('Database connection failed'); }
    async existsFaculty() { throw new Error('Database connection failed'); }
    async existsCareer() { throw new Error('Database connection failed'); }
    async create() { throw new Error('Database connection failed'); }
    async update() { throw new Error('Database connection failed'); }
    async delete() { throw new Error('Database connection failed'); }
}

// ─── Tests: getAllProcedures ─────────────────────────────────────────────────

test('AdminProcedureService - getAllProcedures returns paginated results', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.getAllProcedures(
        {},
        { page: 1, limit: 10 },
        { field: 'name', direction: 'asc' }
    );

    assert.equal(result.data.length, 2);
    assert.equal(result.total, 2);
    assert.equal(result.page, 1);
    assert.equal(result.limit, 10);
    assert.equal(result.totalPages, 1);
});

test('AdminProcedureService - getAllProcedures filters by isActive', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.getAllProcedures(
        { isActive: true },
        { page: 1, limit: 10 },
        { field: 'name', direction: 'asc' }
    );

    assert.equal(result.data.length, 1);
    assert.equal(result.data[0].id, 'proc-1');
    assert.equal(result.data[0].isActive, true);
});

test('AdminProcedureService - getAllProcedures filters by search', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.getAllProcedures(
        { search: 'Transcript' },
        { page: 1, limit: 10 },
        { field: 'name', direction: 'asc' }
    );

    assert.equal(result.data.length, 1);
    assert.equal(result.data[0].name, 'Transcript Request');
});

test('AdminProcedureService - getAllProcedures returns empty when no match', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.getAllProcedures(
        { search: 'NonexistentXYZ' },
        { page: 1, limit: 10 },
        { field: 'name', direction: 'asc' }
    );

    assert.equal(result.data.length, 0);
    assert.equal(result.total, 0);
});

test('AdminProcedureService - getAllProcedures paginates correctly', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.getAllProcedures(
        {},
        { page: 1, limit: 1 },
        { field: 'name', direction: 'asc' }
    );

    assert.equal(result.data.length, 1);
    assert.equal(result.total, 2);
    assert.equal(result.totalPages, 2);
});

test('AdminProcedureService - getAllProcedures returns empty result set', async () => {
    const repo = new MockAdminProcedureRepositoryEmpty();
    const service = new AdminProcedureService(repo);

    const result = await service.getAllProcedures(
        {},
        { page: 1, limit: 10 },
        { field: 'name', direction: 'asc' }
    );

    assert.equal(result.data.length, 0);
    assert.equal(result.total, 0);
    assert.equal(result.totalPages, 0);
});

// ─── Tests: getProcedureById ─────────────────────────────────────────────────

test('AdminProcedureService - getProcedureById returns procedure', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.getProcedureById('proc-1');

    assert.equal(result.id, 'proc-1');
    assert.equal(result.name, 'Transcript Request');
    assert.equal(result.isActive, true);
    assert.equal(result.requirements.length, 1);
    assert.equal(result.requirements[0].name, 'Valid ID');
});

test('AdminProcedureService - getProcedureById throws when not found', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.getProcedureById('nonexistent'),
        { message: 'Procedure not found' }
    );
});

test('AdminProcedureService - getProcedureById throws on repository error', async () => {
    const repo = new MockAdminProcedureRepositoryError();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.getProcedureById('anything'),
        { message: 'Database connection failed' }
    );
});

// ─── Tests: createProcedure ──────────────────────────────────────────────────

test('AdminProcedureService - createProcedure creates successfully', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.createProcedure({
        name: 'New Procedure',
        description: 'New procedure description',
        requirementsText: 'Some requirements',
        isActive: true,
        requirements: [{ name: 'Req 1', description: 'First requirement', isMandatory: true }],
    });

    assert.equal(result.name, 'New Procedure');
    assert.equal(result.description, 'New procedure description');
    assert.equal(result.isActive, true);
    assert.equal(result.requirements.length, 1);
    assert.equal(result.requirements[0].name, 'Req 1');
    assert.ok(result.id);
});

test('AdminProcedureService - createProcedure throws when name is empty', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: '', description: 'desc' }),
        { message: 'Procedure name is required' }
    );
});

test('AdminProcedureService - createProcedure throws when description is empty', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'Valid Name', description: '' }),
        { message: 'Procedure description is required' }
    );
});

test('AdminProcedureService - createProcedure throws when name is too short', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'AB', description: 'Valid description' }),
        { message: 'Procedure name must be at least 3 characters' }
    );
});

test('AdminProcedureService - createProcedure throws when name is too long', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'A'.repeat(201), description: 'Valid description' }),
        { message: 'Procedure name must not exceed 200 characters' }
    );
});

test('AdminProcedureService - createProcedure throws when description is too long', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'Valid Name', description: 'A'.repeat(2001) }),
        { message: 'Procedure description must not exceed 2000 characters' }
    );
});

test('AdminProcedureService - createProcedure throws when name already exists', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'Transcript Request', description: 'Some desc' }),
        { message: 'Procedure with this name already exists' }
    );
});

test('AdminProcedureService - createProcedure throws when faculty does not exist', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'New Procedure', description: 'Desc', facultyId: 'fac-invalid' }),
        { message: 'Specified faculty does not exist' }
    );
});

test('AdminProcedureService - createProcedure throws when career does not exist', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'New Procedure', description: 'Desc', careerId: 'car-invalid' }),
        { message: 'Specified career does not exist' }
    );
});

test('AdminProcedureService - createProcedure throws when requirement has no name', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({
            name: 'New Procedure',
            description: 'Desc',
            requirements: [{ name: '', description: 'Some desc', isMandatory: true }],
        }),
        { message: 'Each requirement must have a name' }
    );
});

test('AdminProcedureService - createProcedure with valid facultyId and careerId passes', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.createProcedure({
        name: 'New Procedure',
        description: 'New procedure description',
        facultyId: 'fac-valid',
        careerId: 'car-valid',
    });

    assert.equal(result.name, 'New Procedure');
    assert.equal(result.description, 'New procedure description');
});

test('AdminProcedureService - createProcedure trims whitespace', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.createProcedure({
        name: '  Spaced Name  ',
        description: '  Spaced Desc  ',
    });

    assert.equal(result.name, 'Spaced Name');
    assert.equal(result.description, 'Spaced Desc');
});

test('AdminProcedureService - createProcedure throws on repository error', async () => {
    const repo = new MockAdminProcedureRepositoryError();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.createProcedure({ name: 'Test', description: 'Desc' }),
        { message: 'Database connection failed' }
    );
});

// ─── Tests: updateProcedure ──────────────────────────────────────────────────

test('AdminProcedureService - updateProcedure updates successfully', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.updateProcedure('proc-1', {
        name: 'Updated Name',
        description: 'Updated description',
        isActive: false,
    });

    assert.equal(result.name, 'Updated Name');
    assert.equal(result.description, 'Updated description');
    assert.equal(result.isActive, false);
});

test('AdminProcedureService - updateProcedure updates requirements', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.updateProcedure('proc-1', {
        requirements: [
            { name: 'New Req 1', description: 'New desc', isMandatory: true },
        ],
    });

    assert.equal(result.requirements.length, 1);
    assert.equal(result.requirements[0].name, 'New Req 1');
});

test('AdminProcedureService - updateProcedure throws when not found', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('nonexistent', { name: 'Test' }),
        { message: 'Procedure not found' }
    );
});

test('AdminProcedureService - updateProcedure throws on repository error', async () => {
    const repo = new MockAdminProcedureRepositoryError();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { name: 'Test' }),
        { message: 'Database connection failed' }
    );
});

test('AdminProcedureService - updateProcedure throws when name is empty', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { name: '' }),
        { message: 'Procedure name is required' }
    );
});

test('AdminProcedureService - updateProcedure throws when name is too short', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { name: 'AB' }),
        { message: 'Procedure name must be at least 3 characters' }
    );
});

test('AdminProcedureService - updateProcedure throws when name is too long', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { name: 'A'.repeat(201) }),
        { message: 'Procedure name must not exceed 200 characters' }
    );
});

test('AdminProcedureService - updateProcedure throws when description is empty', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { description: '' }),
        { message: 'Procedure description is required' }
    );
});

test('AdminProcedureService - updateProcedure throws when description is too long', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { description: 'A'.repeat(2001) }),
        { message: 'Procedure description must not exceed 2000 characters' }
    );
});

test('AdminProcedureService - updateProcedure throws when name already exists on another procedure', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-2', { name: 'Transcript Request' }),
        { message: 'Procedure with this name already exists' }
    );
});

test('AdminProcedureService - updateProcedure allows keeping the same name', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.updateProcedure('proc-1', { name: 'Transcript Request' });

    assert.equal(result.name, 'Transcript Request');
});

test('AdminProcedureService - updateProcedure throws when faculty does not exist', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { facultyId: 'fac-invalid' }),
        { message: 'Specified faculty does not exist' }
    );
});

test('AdminProcedureService - updateProcedure throws when career does not exist', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', { careerId: 'car-invalid' }),
        { message: 'Specified career does not exist' }
    );
});

test('AdminProcedureService - updateProcedure throws when requirement has no name', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.updateProcedure('proc-1', {
            requirements: [{ name: '', description: 'Some desc', isMandatory: true }],
        }),
        { message: 'Each requirement must have a name' }
    );
});

test('AdminProcedureService - updateProcedure partial update works', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    const result = await service.updateProcedure('proc-1', { description: 'Just updating description' });

    assert.equal(result.id, 'proc-1');
    assert.equal(result.name, 'Transcript Request');
    assert.equal(result.description, 'Just updating description');
});

// ─── Tests: deleteProcedure ──────────────────────────────────────────────────

test('AdminProcedureService - deleteProcedure soft-deletes (sets isActive false)', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await service.deleteProcedure('proc-1');

    const result = await service.getProcedureById('proc-1');
    assert.equal(result.isActive, false);
});

test('AdminProcedureService - deleteProcedure throws when not found', async () => {
    const repo = new MockAdminProcedureRepository();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.deleteProcedure('nonexistent'),
        { message: 'Procedure not found' }
    );
});

test('AdminProcedureService - deleteProcedure throws on repository error', async () => {
    const repo = new MockAdminProcedureRepositoryError();
    const service = new AdminProcedureService(repo);

    await assert.rejects(
        () => service.deleteProcedure('anything'),
        { message: 'Database connection failed' }
    );
});
