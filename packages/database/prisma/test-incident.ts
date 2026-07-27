import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const org = await prisma.organization.findFirst({ where: { slug: 'fcos-flow' } });
    console.log('Org:', !!org, org?.id);

    const user = await prisma.user.findFirst({ where: { email: 'admin@fcos.app' } });
    console.log('User:', !!user, user?.id);

    if (org && user) {
      const incident = await prisma.incident.create({
        data: {
          organizationId: org.id,
          incidentType: 'LTI',
          submittedBy: 'Test User',
          injuredPersonName: 'John',
          description: 'Test incident',
          ambulanceOnSite: false,
          finishedShift: null,
          status: 'OPEN',
          ownerId: user.id,
        },
      });
      console.log('Created:', incident.id);
    }
  } catch (e) {
    console.error('FAILED:', e instanceof Error ? e.message : e);
  }

  await prisma.$disconnect();
}

test();
