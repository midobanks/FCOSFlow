import { NextRequest, NextResponse } from 'next/server';
import { submitSuggestion, getArticleSuggestions } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;
    const result = await getArticleSuggestions(ctx, id);
    if (!result.ok) {
      return apiError(404, result.error.code, result.error.message);
    }
    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/wiki/articles/[id]/suggestions failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;
    const body = await req.json().catch(() => null);
    if (!body || !body.content) {
      return apiError(400, 'invalid_input', 'Suggestion content is required.');
    }
    const result = await submitSuggestion(ctx, id, body.content);
    if (!result.ok) {
      return apiError(404, result.error.code, result.error.message);
    }
    return NextResponse.json({ ok: true, data: result.data }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/wiki/articles/[id]/suggestions failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
