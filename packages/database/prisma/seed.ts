import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { slug: 'fcos-flow' },
    update: {},
    create: { name: 'FCOS Flow', slug: 'fcos-flow' },
  });

  await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', label: 'Administrator' },
  });
  await prisma.role.upsert({
    where: { name: 'FC_LEAD' },
    update: {},
    create: { name: 'FC_LEAD', label: 'FC Lead' },
  });
  await prisma.role.upsert({
    where: { name: 'PROCESS_OWNER' },
    update: {},
    create: { name: 'PROCESS_OWNER', label: 'Process Owner' },
  });
  await prisma.role.upsert({
    where: { name: 'SUPERVISOR' },
    update: {},
    create: { name: 'SUPERVISOR', label: 'Supervisor' },
  });
  await prisma.role.upsert({
    where: { name: 'CAPTAIN' },
    update: {},
    create: { name: 'CAPTAIN', label: 'Captain' },
  });

  const site = await prisma.site.upsert({
    where: { organizationId_code: { organizationId: org.id, code: 'SITE001' } },
    update: {},
    create: { organizationId: org.id, name: 'Main Site', code: 'SITE001' },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@fcos.app' },
    update: {},
    create: {
      organizationId: org.id,
      email: 'admin@fcos.app',
      name: 'Admin',
      authProviderId: 'system',
    },
  });

  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  if (adminRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
      update: {},
      create: { userId: adminUser.id, roleId: adminRole.id },
    });
  }

  const existing = await prisma.frameType.count();
  if (existing === 0) {
    await prisma.frameType.createMany({
      data: [
        { name: 'G4 Frame', code: 'G4', capacity: 24 },
        { name: 'G6 Frame', code: 'G6', capacity: 48 },
      ],
    });
  }

  console.log('Seed complete');
  console.log(`Organization: ${org.id}`);
  console.log(`Site: ${site.id}`);
  console.log(`Admin user: ${adminUser.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
