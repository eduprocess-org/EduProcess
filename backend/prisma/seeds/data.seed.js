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
            name: 'Faculty of Engineering',
            description: 'Faculty of Engineering and Applied Sciences',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000002',
            name: 'Faculty of Medicine',
            description: 'Faculty of Medical Sciences',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000003',
            name: 'Faculty of Law',
            description: 'Faculty of Law and Social Sciences',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000004',
            name: 'Faculty of Economics',
            description: 'Faculty of Economics and Business',
        },
        {
            id: 'a1000000-0000-0000-0000-000000000005',
            name: 'Faculty of Sciences',
            description: 'Faculty of Mathematical and Physical Sciences',
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
            name: 'Civil Engineering',
            description: 'Civil Engineering program',
            facultyId: 'a1000000-0000-0000-0000-000000000001',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000002',
            name: 'Systems Engineering',
            description: 'Computer Systems Engineering program',
            facultyId: 'a1000000-0000-0000-0000-000000000001',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000003',
            name: 'General Medicine',
            description: 'Medicine program',
            facultyId: 'a1000000-0000-0000-0000-000000000002',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000004',
            name: 'Law',
            description: 'Legal Sciences program',
            facultyId: 'a1000000-0000-0000-0000-000000000003',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000005',
            name: 'Business Administration',
            description: 'Business Administration program',
            facultyId: 'a1000000-0000-0000-0000-000000000004',
        },
        {
            id: 'b1000000-0000-0000-0000-000000000006',
            name: 'Applied Mathematics',
            description: 'Mathematics program',
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
            name: 'Enrollment Certificate',
            description: 'Certificate proving current student enrollment',
            requirementsText: 'Valid ID or passport required. Certificate is valid for 30 days.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000002',
            name: 'Transcript',
            description: 'Official academic transcript of the student',
            requirementsText: 'Valid ID or passport required. Specify the desired academic period.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000003',
            name: 'Proof of Studies',
            description: 'Certificate proving active student status',
            requirementsText: 'Valid ID or passport required.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000004',
            name: 'Credit Transfer',
            description: 'Academic credit transfer process from another institution',
            requirementsText: 'Notarized transcript from the originating institution. Current study plan. Written application.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000005',
            name: 'Change of Major',
            description: 'Application for change of major within the university',
            requirementsText: 'Must have completed at least one semester. Minimum GPA of 8/10. Written application with justification.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000006',
            name: 'Diploma and Degree',
            description: 'Process for obtaining professional diploma and degree',
            requirementsText: 'All study plan courses approved. Thesis or graduation exam approved. No outstanding debts with the university.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000007',
            name: 'Re-enrollment',
            description: 'Re-enrollment process for students who stopped attending',
            requirementsText: 'Written application. Payment of re-enrollment fees. Certificate of no outstanding debts.',
            isActive: true,
        },
        {
            id: 'c1000000-0000-0000-0000-000000000008',
            name: 'Good Conduct Certificate',
            description: 'Certificate of good student conduct',
            requirementsText: 'Valid ID or passport required. No disciplinary sanctions on record.',
            isActive: true,
        },
        // Faculty-specific procedures
        {
            id: 'c2000000-0000-0000-0000-000000000001',
            name: 'Pre-professional Internship',
            description: 'Application for pre-professional internship in the Faculty of Engineering',
            requirementsText: 'At least 70% of study plan completed. Company acceptance letter. Accident insurance.',
            isActive: true,
            facultyId: 'a1000000-0000-0000-0000-000000000001',
        },
        {
            id: 'c2000000-0000-0000-0000-000000000002',
            name: 'Rotating Internship',
            description: 'Application for rotating internship in the Faculty of Medicine',
            requirementsText: 'All clinical courses approved. Current health certificate. Civil liability insurance.',
            isActive: true,
            facultyId: 'a1000000-0000-0000-0000-000000000002',
        },
        // Career-specific procedures
        {
            id: 'c2000000-0000-0000-0000-000000000003',
            name: 'Programming Competency Certificate',
            description: 'Certificate of programming competency for Systems Engineering',
            requirementsText: 'Pass competency exam in at least 3 programming languages. Submit project portfolio.',
            isActive: true,
            facultyId: 'a1000000-0000-0000-0000-000000000001',
            careerId: 'b1000000-0000-0000-0000-000000000002',
        },
        {
            id: 'c2000000-0000-0000-0000-000000000004',
            name: 'Thesis Topic Approval',
            description: 'Application for thesis topic approval for the Law program',
            requirementsText: 'Research proposal of at least 10 pages. Thesis advisor acceptance letter. Academic background.',
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
