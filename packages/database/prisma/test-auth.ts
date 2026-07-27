import { prisma } from '../../src/index';

async function test() {
  try {
    const [org, user] = await Promise.all([
      prisma.organization.findFirst({ where: { slug: 'fcos-flow' } }),
      prisma.user.findFirst({
        where: { email: 'admin@fcos.app' },
        include: { roles: { include: { role: true } } },
      }),
    ]);
    console.log('Org:', !!org, org?.id);
    console.log('User:', !!user, user?.id, user?.roles.map((r: any) => r.role.name));
  } catch (e) {
    console.error('AUTH FAILED:', e instanceof Error ? e.message : e);
  }
  await prisma.$disconnect();
}
test();
