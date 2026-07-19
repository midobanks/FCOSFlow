import { NextRequest, NextResponse } from 'next/server';
import { createArticleSchema, searchArticlesSchema } from '@fcos/contracts';
import { createArticle, getArticlesByOrganization } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function POST(req: NextRequest) {
  try {
    const ctx = await getAuthContext(req);
    const body = await req.json().catch(() => null);
    if (!body) {
      return apiError(400, 'invalid_json', 'Request body must be valid JSON.');
    }

    const parsed = createArticleSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(400, 'validation_error', parsed.error.errors[0]?.message ?? 'Invalid input.');
    }

    const result = await createArticle(ctx, parsed.data);
    if (!result.ok) {
      const status = result.error.code === 'forbidden' ? 403 : 409;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/wiki/articles failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}

export async function GET(req: NextRequest) {
  try {
    const ctx = await getAuthContext(req);
    const { searchParams } = new URL(req.url);
    const input = {
      status: searchParams.get('status') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      cursor: searchParams.get('cursor') ?? undefined,
    };

    const parsed = searchArticlesSchema.partial().safeParse(input);
    if (!parsed.success) {
      return apiError(400, 'validation_error', parsed.error.errors[0]?.message ?? 'Invalid input.');
    }

    const result = await getArticlesByOrganization(ctx, parsed.data);
    if (!result.ok) {
      return apiError(500, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/wiki/articles failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
