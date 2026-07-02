require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const userId = process.argv[2];
  if (!userId) {
    console.log('Usage: node seed-for-user.js <userId>');
    return;
  }

  // Create notification type catalog entries
  const types = ['REQUEST_CREATED', 'REQUEST_APPROVED', 'REQUEST_REJECTED', 'ADMIN_OBSERVATION'];
  const catalogs = {};
  for (const name of types) {
    const catalog = await prisma.notificationTypeCatalog.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    catalogs[name] = catalog.id;
  }

  // Create test notifications for this user
  const notifications = [
    {
      userId,
      typeId: catalogs['REQUEST_CREATED'],
      title: 'Solicitud Creada',
      message: 'Tu solicitud de Certificado de Notas ha sido creada exitosamente.',
      isRead: false,
    },
    {
      userId,
      typeId: catalogs['REQUEST_APPROVED'],
      title: 'Solicitud Aprobada',
      message: 'Tu solicitud de Constancia de Estudios ha sido aprobada.',
      isRead: false,
    },
    {
      userId,
      typeId: catalogs['REQUEST_REJECTED'],
      title: 'Solicitud Rechazada',
      message: 'Tu solicitud de Prácticas Preprofesionales fue rechazada.',
      isRead: true,
    },
    {
      userId,
      typeId: catalogs['ADMIN_OBSERVATION'],
      title: 'Observación Administrativa',
      message: 'El administrador agregó un comentario en tu solicitud.',
      isRead: false,
    },
  ];

  for (const data of notifications) {
    const created = await prisma.notification.create({ data });
    console.log('Created:', created.id, '-', created.title);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
