require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Find an existing user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log('No users found in database. Create a user first.');
    return;
  }
  console.log('Using user:', user.id, user.email);

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
  console.log('Notification types ready:', Object.keys(catalogs).join(', '));

  // Create test notifications
  const notifications = [
    {
      userId: user.id,
      typeId: catalogs['REQUEST_CREATED'],
      title: 'Solicitud Creada',
      message: 'Tu solicitud de Certificado de Notas ha sido creada exitosamente.',
      isRead: false,
    },
    {
      userId: user.id,
      typeId: catalogs['REQUEST_APPROVED'],
      title: 'Solicitud Aprobada',
      message: 'Tu solicitud de Constancia de Estudios ha sido aprobada por el administrador.',
      isRead: false,
    },
    {
      userId: user.id,
      typeId: catalogs['REQUEST_REJECTED'],
      title: 'Solicitud Rechazada',
      message: 'Tu solicitud de Prácticas Preprofesionales fue rechazada. Revisa los comentarios.',
      isRead: true,
    },
    {
      userId: user.id,
      typeId: catalogs['ADMIN_OBSERVATION'],
      title: 'Observación Administrativa',
      message: 'El administrador agregó un comentario en tu solicitud de Internado Rotatorio.',
      isRead: false,
    },
  ];

  for (const data of notifications) {
    const created = await prisma.notification.create({ data });
    console.log('Created notification:', created.id, '-', created.title);
  }

  console.log('\nDone! 4 test notifications created for user:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
