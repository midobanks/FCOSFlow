import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.findFirst({ where: { slug: 'fcos-flow' } });
  const user = await prisma.user.findFirst({ where: { email: 'admin@fcos.app' } });
  console.log('Org:', org?.id ?? 'NOT FOUND');
  console.log('User:', user?.id ?? 'NOT FOUND');
  const articleCount = await prisma.article.count();
  console.log('Articles:', articleCount);
  await prisma.$disconnect();
}

main();
