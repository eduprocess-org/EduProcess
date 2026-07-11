require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const uuid = () => crypto.randomUUID();

const STUDENT_EMAIL = 'student@uce.edu.ec';
const STUDENT_PASSWORD = 'password123';
const ADMIN_EMAIL = 'admin@uce.edu.ec';
const ADMIN_PASSWORD = 'password123';

const PROCEDURE_TYPES = [
    {
        id: uuid(),
        name: 'Constancia de Estudios',
        description: 'Solicitud de constancia de estudios para trámites personales',
        requirementsText: 'Presentar cédula de identidad y carnet estudiantil',
        requirements: [
            { name: 'Cédula de identidad', description: 'Fotocopia de cédula', isMandatory: true },
            { name: 'Carnet estudiantil', description: 'Fotocopia del carnet', isMandatory: true },
        ],
    },
    {
        id: uuid(),
        name: 'Historial Académico',
        description: 'Solicitud del historial académico completo',
        requirementsText: 'Presentar solicitud escrita y documento de identidad',
        requirements: [
            { name: 'Solicitud escrita', description: 'Carta de solicitud firmada', isMandatory: true },
            { name: 'Documento de identidad', description: 'Fotocopia de cédula', isMandatory: true },
        ],
    },
    {
        id: uuid(),
        name: 'Reposición de Materia',
        description: 'Trámite para reposición de materia reprobada',
        requirementsText: 'Presentar certificado de notas y formulario de reposición',
        requirements: [
            { name: 'Certificado de notas', description: 'Certificado con nota reprobada', isMandatory: true },
            { name: 'Formulario', description: 'Formulario de reposición llenado', isMandatory: true },
            { name: 'Justificativo', description: 'Documento justificativo (opcional)', isMandatory: false },
        ],
    },
];

async function main() {
    console.log('=== Seeding test data for Postman workspace ===\n');

    // 1. Create or find admin user
    let admin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
    if (!admin) {
        const adminHash = await bcryptjs.hash(ADMIN_PASSWORD, 10);
        admin = await prisma.user.create({
            data: {
                firstName: 'Admin',
                lastName: 'EduProcess',
                email: ADMIN_EMAIL,
                passwordHash: adminHash,
                role: 'admin',
            },
        });
        console.log(`[OK] Admin user created: ${admin.email}`);
    } else {
        console.log(`[OK] Admin user exists: ${admin.email}`);
    }

    // 2. Create or find student user
    let student = await prisma.user.findUnique({ where: { email: STUDENT_EMAIL } });
    if (!student) {
        const studentHash = await bcryptjs.hash(STUDENT_PASSWORD, 10);
        student = await prisma.user.create({
            data: {
                firstName: 'Student',
                lastName: 'Test',
                email: STUDENT_EMAIL,
                passwordHash: studentHash,
                role: 'student',
            },
        });
        console.log(`[OK] Student user created: ${student.email}`);
    } else {
        console.log(`[OK] Student user exists: ${student.email}`);
    }

    // 3. Create procedure types
    console.log('\nCreating procedure types...');
    for (const proc of PROCEDURE_TYPES) {
        const existing = await prisma.procedureType.findFirst({ where: { name: proc.name } });
        if (!existing) {
            await prisma.procedureType.create({
                data: {
                    id: proc.id,
                    name: proc.name,
                    description: proc.description,
                    requirementsText: proc.requirementsText,
                    isActive: true,
                    procedureRequirements: {
                        create: proc.requirements.map((r) => ({
                            name: r.name,
                            description: r.description,
                            isMandatory: r.isMandatory,
                        })),
                    },
                },
            });
            console.log(`  [OK] Created: ${proc.name}`);
        } else {
            console.log(`  [SKIP] Exists: ${proc.name}`);
        }
    }

    // 4. Get procedure types for requests
    const procedures = await prisma.procedureType.findMany({ where: { isActive: true } });

    // 5. Create sample requests
    console.log('\nCreating sample requests...');
    const statuses = ['pending', 'in_review', 'approved', 'rejected'];

    for (let i = 0; i < Math.min(3, procedures.length); i++) {
        const proc = procedures[i];
        const status = statuses[i % statuses.length];

        const existingRequest = await prisma.procedureRequest.findFirst({
            where: { studentId: student.id, procedureTypeId: proc.id },
        });

        if (!existingRequest) {
            const request = await prisma.procedureRequest.create({
                data: {
                    studentId: student.id,
                    procedureTypeId: proc.id,
                    career: 'Ingeniería en Sistemas',
                    semester: '2026-A',
                    reason: `Solicitud de prueba: ${proc.name}`,
                    status: status,
                },
            });
            console.log(`  [OK] Request created: ${proc.name} (${status}) - ID: ${request.id}`);

            // Create audit log
            await prisma.auditLog.create({
                data: {
                    procedureRequestId: request.id,
                    userId: admin.id,
                    action: 'STATUS_CHANGE',
                    oldValue: null,
                    newValue: status,
                },
            });

            // Create observation for in_review or approved requests
            if (status === 'in_review' || status === 'approved') {
                await prisma.observation.create({
                    data: {
                        requestId: request.id,
                        adminId: admin.id,
                        comment: 'Documentación revisada correctamente.',
                    },
                });
                console.log(`    [OK] Observation added`);
            }

            // Create notification for student
            await prisma.notification.create({
                data: {
                    userId: student.id,
                    title: 'Solicitud actualizada',
                    message: `Su solicitud "${proc.name}" ha sido cambiada a estado: ${status}`,
                    isRead: false,
                },
            });
        } else {
            console.log(`  [SKIP] Request exists: ${proc.name}`);
        }
    }

    // 6. Create notification types if not exist
    const notificationTypes = [
        'REQUEST_CREATED',
        'REQUEST_UPDATED',
        'REQUEST_APPROVED',
        'REQUEST_REJECTED',
        'ADMIN_OBSERVATION',
    ];

    for (const typeName of notificationTypes) {
        const existing = await prisma.notificationTypeCatalog.findFirst({ where: { name: typeName } });
        if (!existing) {
            await prisma.notificationTypeCatalog.create({ data: { name: typeName } });
        }
    }
    console.log('\n[OK] Notification types ensured');

    // 7. Print summary
    console.log('\n=== SEED COMPLETE ===');
    console.log('\nCredentials for Postman:');
    console.log(`  Student: ${STUDENT_EMAIL} / ${STUDENT_PASSWORD}`);
    console.log(`  Admin:   ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);

    const requestCount = await prisma.procedureRequest.count({ where: { studentId: student.id } });
    console.log(`\nData created:`);
    console.log(`  - ${procedures.length} procedure types`);
    console.log(`  - ${requestCount} requests`);

    // Print IDs for Postman environment
    console.log('\nIDs for Postman environment variables:');
    if (procedures.length > 0) {
        console.log(`  procedureTypeId: ${procedures[0].id}`);
    }

    const firstRequest = await prisma.procedureRequest.findFirst({ where: { studentId: student.id } });
    if (firstRequest) {
        console.log(`  requestId: ${firstRequest.id}`);
    }

    const firstNotification = await prisma.notification.findFirst({ where: { userId: student.id } });
    if (firstNotification) {
        console.log(`  notificationId: ${firstNotification.id}`);
    }

    const firstObservation = await prisma.observation.findFirst();
    if (firstObservation) {
        console.log(`  observationId: ${firstObservation.id}`);
    }
}

main()
    .catch((e) => {
        console.error('Error seeding test data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
