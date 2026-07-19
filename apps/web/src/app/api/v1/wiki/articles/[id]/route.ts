import { NextRequest, NextResponse } from 'next/server';
import { updateArticleSchema, articleParamsSchema } from '@fcos/contracts';
import { updateArticle, getArticle, submitForReview, deleteArticle } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;

    const { searchParams } = new URL(req.url);
    const version = searchParams.get('version');

    const result = await getArticle(ctx, id, version ? Number(version) : undefined);
    if (!result.ok) {
      const status = result.error.code === 'not_found' ? 404 : 403;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/wiki/articles/[id] failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;

    const body = await req.json().catch(() => null);
    if (!body) {
      return apiError(400, 'invalid_json', 'Request body must be valid JSON.');
    }

    const parsed = updateArticleSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(400, 'validation_error', parsed.error.errors[0]?.message ?? 'Invalid input.');
    }

    const result = await updateArticle(ctx, id, parsed.data);
    if (!result.ok) {
      const status = result.error.code === 'not_found' ? 404 : 403;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('PATCH /api/v1/wiki/articles/[id] failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;

    const result = await deleteArticle(ctx, id);
    if (!result.ok) {
      const status = result.error.code === 'not_found' ? 404 : 403;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('DELETE /api/v1/wiki/articles/[id] failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
