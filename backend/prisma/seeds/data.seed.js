require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('=== Seeding Faculties ===\n');

    const faculties = [
        {
            id: 'a1000000-0000-0000-0000-000000000001',
            name: 'Facultad de Ingeniería',
            description: 'Facultad de Ingeniería y Ciencias Aplicadas',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000002',
            name: 'Facultad de Medicina',
            description: 'Facultad de Ciencias Médicas',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000003',
            name: 'Facultad de Jurisprudencia',
            description: 'Facultad de Jurisprudencia y Ciencias Sociales',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000004',
            name: 'Facultad de Economía',
            description: 'Facultad de Economía y Negocios',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000005',
            name: 'Facultad de Ciencias',
            description: 'Facultad de Ciencias Matemáticas y Física',
        },
    ];

    for (const f of faculties) {
        await prisma.faculty.upsert({
            where: { id: f.id },
            update: { name: f.name, description: f.description },
            create: f,
        });
        console.log(`  ✓ ${f.name}`);
    }

    console.log('\n=== Seeding Careers ===\n');

    const careers = [
        {
            id: 'b1000000-0000-0000-0000-000000000001',
            name: 'Ingeniería Civil',
            description: 'Carrera de Ingeniería Civil',
            facultyId: 'a1000000-0000-0000-0000-000000000001',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000002',
            name: 'Ingeniería en Sistemas',
            description: 'Carrera de Ingeniería en Sistemas Computacionales',
            facultyId: 'a1000000-0000-0000-0000-000000000001',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000003',
            name: 'Medicina General',
            description: 'Carrera de Medicina',
            facultyId: 'a1000000-0000-0000-0000-000000000002',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000004',
            name: 'Derecho',
            description: 'Carrera de Ciencias Jurídicas',
            facultyId: 'a1000000-0000-0000-0000-000000000003',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000005',
            name: 'Administración de Empresas',
            description: 'Carrera de Administración',
            facultyId: 'a1000000-0000-0000-0000-000000000004',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000006',
            name: 'Matemáticas Aplicadas',
            description: 'Carrera de Matemáticas',
            facultyId: 'a1000000-0000-0000-0000-000000000005',
        },
    ];

    for (const c of careers) {
        await prisma.career.upsert({
            where: { id: c.id },
            update: { name: c.name, description: c.description, facultyId: c.facultyId },
            create: c,
        });
        console.log(`  ✓ ${c.name}`);
    }

    console.log('\n=== Seeding Procedure Types ===\n');

    const procedures = [
        // Global procedures (no faculty, no career)
        {
            id: 'c1000000-0000-0000-0000-000000000001',
            name: 'Certificado de Matrícula',
            description: 'Certificado que acredita la matrícula vigente del estudiante',
            requirementsText: 'Presentar cédula de identidad o pasaporte vigente. El certificado tiene una validez de 30 días.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000002',
            name: 'Certificado de Notas',
            description: 'Certificado con el historial académico del estudiante',
            requirementsText: 'Presentar cédula de identidad o pasaporte vigente. Indicar el período académico deseado.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000003',
            name: 'Constancia de Estudios',
            description: 'Constancia que acredita que el estudiante se encuentra activo',
            requirementsText: 'Presentar cédula de identidad o pasaporte vigente.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000004',
            name: 'Traslado de Créditos',
            description: 'Proceso de transferencia de créditos académicos desde otra institución',
            requirementsText: 'Presentar certificado de notas notarizado de la institución de origen. Plan de estudios vigente. Solicitud escrita.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000005',
            name: 'Cambio de Carrera',
            description: 'Solicitud de cambio de carrera dentro de la universidad',
            requirementsText: 'Haber completado al menos un semestre. Promedio mínimo de 8/10. Solicitud escrita con justificación.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000006',
            name: 'Diploma y Título',
            description: 'Proceso de obtención del diploma y título profesional',
            requirementsText: 'Haber aprobado todas las materias del plan de estudios. Tesis aprobada o examen de grado aprobado. No tener deudas con la universidad.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000007',
            name: 'Reincorporación',
            description: 'Proceso de reincorporación para estudiantes que dejaron de cursar',
            requirementsText: 'Solicitud escrita. Pago de tasas de reincorporación. Certificado de no tener deudas.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000008',
            name: 'Constancia de Buen Conducción',
            description: 'Certificado de buena conducta estudiantil',
            requirementsText: 'Presentar cédula de identidad o pasaporte vigente. No tener sanciones disciplinarias.',
            isActive: true,
        },
        // Faculty-specific procedures
        {
            id: 'c2000000-0000-0000-0000-000000000001',
            name: 'Prácticas Preprofesionales',
            description: 'Solicitud para realizar prácticas preprofesionales en la Facultad de Ingeniería',
            requirementsText: 'Haber aprobado al menos el 70% del plan de estudios. Carta de aceptación de la empresa. Seguro de accidentes.',
            isActive: true,
            facultyId: 'a1000000-0000-0000-0000-000000000001',
        },
        {
            id: 'c2000000-0000-0000-0000-000000000002',
            name: 'Internado Rotatorio',
            description: 'Solicitud para realizar el internado rotatorio en la Facultad de Medicina',
            requirementsText: 'Haber aprobado todas las materias clínicas. Certificado de salud vigente. Seguro de responsabilidad civil.',
            isActive: true,
            facultyId: 'a1000000-0000-0000-0000-000000000002',
        },
        // Career-specific procedures
        {
            id: 'c2000000-0000-0000-0000-000000000003',
            name: 'Certificado de Competencia en Programación',
            description: 'Certificado que acredita competencia en programación para Ingeniería en Sistemas',
            requirementsText: 'Aprobar examen de competencia en al menos 3 lenguajes de programación. Presentar portafolio de proyectos.',
            isActive: true,
            facultyId: 'a1000000-0000-0000-0000-000000000001',
            careerId: 'b1000000-0000-0000-0000-000000000002',
        },
        {
            id: 'c2000000-0000-0000-0000-000000000004',
            name: 'Aprobación de Tema de Grado',
            description: 'Solicitud de aprobación del tema de tesis para la carrera de Derecho',
            requirementsText: 'Propuesta de investigación de al menos 10 páginas. Carta de aceptación del director de tesis. Antecedentes académicos.',
            isActive: true,
            facultyId: 'a1000000-0000-0000-0000-000000000003',
            careerId: 'b1000000-0000-0000-0000-000000000004',
        },
    ];

    for (const proc of procedures) {
        await prisma.procedureType.upsert({
            where: { id: proc.id },
            update: {
                name: proc.name,
                description: proc.description,
                requirementsText: proc.requirementsText,
                isActive: proc.isActive,
                facultyId: proc.facultyId ?? null,
                careerId: proc.careerId ?? null,
            },
            create: proc,
        });
        const scope = proc.careerId ? 'Career' : proc.facultyId ? 'Faculty' : 'Global';
        console.log(`  ✓ ${proc.name} [${scope}]`);
    }

    console.log('\n=== Seed completed ===');
    console.log(`  Faculties:  ${faculties.length}`);
    console.log(`  Careers:    ${careers.length}`);
    console.log(`  Procedures: ${procedures.length}`);
}

main()
    .catch((e) => {
        console.error('Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
