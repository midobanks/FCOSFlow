import { NextRequest, NextResponse } from 'next/server';
import { searchArticles } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET(req: NextRequest) {
  try {
    const ctx = getAuthContext(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const limit = searchParams.get('limit');
    const cursor = searchParams.get('cursor');

    if (!q) {
      return apiError(400, 'missing_query', 'Search query "q" is required.');
    }

    const result = await searchArticles(ctx, {
      q,
      limit: limit ? Number(limit) : 20,
      cursor: cursor ?? undefined,
    });

    if (!result.ok) {
      return apiError(400, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/wiki/search failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
