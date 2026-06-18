const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const multer = require('multer');

process.env.JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET || 'test-session-secret-2026';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test-refresh-secret-2026';
process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://fake-supabase-url.com';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key';

const { ProcedureController } = require('../../dist/infrastructure/http/controllers/procedure.controller.js');
const { authMiddleware } = require('../../dist/infrastructure/http/middlewares/auth.middleware.js');
const { Router } = require('express');

const ACCEPTED_MIME_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
];

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

// ─── Mock Service ─────────────────────────────────────────────────────────────

class MockProcedureService {
    async getAllProcedures(studentId) { return []; }
    async getProcedureDetails(id) { throw new Error('Procedure not found'); }
    async createRequest(studentId, procedureId, files) {
        return { id: 'req-new', studentId, procedureTypeId: procedureId, status: 'pending', documents: [] };
    }
    async getStudentRequests() { return []; }
    async getRequestTracking() { throw new Error('Request not found or unauthorized'); }
}

// ─── Build app with real multer ────────────────────────────────────────────────

const buildRealUploadApp = () => {
    const app = express();
    app.use(express.json());

    const service = new MockProcedureService();
    const controller = new ProcedureController(service);

    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: FILE_SIZE_LIMIT },
        fileFilter: (_req, file, cb) => {
            if (ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(`Unsupported file type: ${file.mimetype}. Accepted: PDF, DOCX, JPEG, PNG`));
            }
        },
    });

    const router = Router();
    router.post('/requests', authMiddleware, upload.array('documents'), controller.createRequest);
    router.use((err, _req, res, next) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ success: false, message: 'File exceeds the 5MB size limit' });
        }
        if (err?.message?.startsWith('Unsupported file type')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next(err);
    });
    app.use('/api/v1', router);

    return app;
};

const generateToken = (userId = 'student-123') => jwt.sign(
    { userId, email: 'student@uce.edu.ec', role: 'student' },
    process.env.JWT_SESSION_SECRET,
    { expiresIn: '1h' }
);

// ─── Upload Validation Tests ───────────────────────────────────────────────────

test('POST /requests - accepts a valid PDF file (application/pdf)', async () => {
    const app = buildRealUploadApp();
    const token = generateToken();

    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .field('procedureId', 'proc-1')
        .attach('documents', Buffer.from('%PDF-1.4 fake content'), { filename: 'document.pdf', contentType: 'application/pdf' });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
});

test('POST /requests - accepts a valid PNG image (image/png)', async () => {
    const app = buildRealUploadApp();
    const token = generateToken();

    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .field('procedureId', 'proc-1')
        .attach('documents', Buffer.from('fake-png-content'), { filename: 'photo.png', contentType: 'image/png' });

    assert.equal(res.status, 201);
});

test('POST /requests - accepts a valid JPEG image (image/jpeg)', async () => {
    const app = buildRealUploadApp();
    const token = generateToken();

    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .field('procedureId', 'proc-1')
        .attach('documents', Buffer.from('fake-jpeg-content'), { filename: 'photo.jpg', contentType: 'image/jpeg' });

    assert.equal(res.status, 201);
});

test('POST /requests - rejects unsupported file type (text/plain) with 400', async () => {
    const app = buildRealUploadApp();
    const token = generateToken();

    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .field('procedureId', 'proc-1')
        .attach('documents', Buffer.from('hello'), { filename: 'notes.txt', contentType: 'text/plain' });

    assert.equal(res.status, 400);
    assert.ok(res.body.message.startsWith('Unsupported file type'));
});

test('POST /requests - rejects unsupported file type (image/gif) with 400', async () => {
    const app = buildRealUploadApp();
    const token = generateToken();

    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .field('procedureId', 'proc-1')
        .attach('documents', Buffer.from('GIF89a'), { filename: 'anim.gif', contentType: 'image/gif' });

    assert.equal(res.status, 400);
    assert.ok(res.body.message.startsWith('Unsupported file type'));
});

test('POST /requests - rejects file exceeding 5MB limit with 400', async () => {
    const app = buildRealUploadApp();
    const token = generateToken();

    const oversizedBuffer = Buffer.alloc(6 * 1024 * 1024, 'x'); // 6MB

    const res = await supertest(app)
        .post('/api/v1/requests')
        .set('Authorization', `Bearer ${token}`)
        .field('procedureId', 'proc-1')
        .attach('documents', oversizedBuffer, { filename: 'large.pdf', contentType: 'application/pdf' });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, 'File exceeds the 5MB size limit');
});
