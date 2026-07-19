import { prisma } from '@fcos/database';
import { error, success } from '@fcos/contracts';
import type { Result } from '@fcos/contracts';

type AuthContext = {
  userId: string;
  organizationId: string;
};

export async function resolveQrCode(
  ctx: AuthContext,
  code: string,
): Promise<Result<{ articleId: string; slug: string }>> {
  const article = await prisma.article.findFirst({
    where: {
      slug: code,
      organizationId: ctx.organizationId,
    },
    select: { id: true, slug: true },
  });

  if (!article) {
    return error('not_found', 'No article found for this QR code.');
  }

  return success({ articleId: article.id, slug: article.slug });
}

export async function generateQrSlug(title: string): Promise<string> {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}
