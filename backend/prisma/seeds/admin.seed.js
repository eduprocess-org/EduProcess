require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcryptjs = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const ADMIN_EMAIL = 'admin@uce.edu.ec';
const ADMIN_PASSWORD = 'Admin123456';

async function main() {
    console.log('Seeding admin user...');

    const existing = await prisma.user.findUnique({
        where: { email: ADMIN_EMAIL },
    });

    if (existing) {
        console.log(`Admin user already exists (${ADMIN_EMAIL}), skipping.`);
        return;
    }

    const passwordHash = await bcryptjs.hash(ADMIN_PASSWORD, 10);

    const admin = await prisma.user.create({
        data: {
            firstName: 'Admin',
            lastName: 'EduProcess',
            email: ADMIN_EMAIL,
            passwordHash,
            role: 'admin',
        },
    });

    console.log('Admin user created successfully:');
    console.log(`  Email:    ${admin.email}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log(`  Role:     ${admin.role}`);
    console.log(`  ID:       ${admin.id}`);
}

main()
    .catch((e) => {
        console.error('Error seeding admin user:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
