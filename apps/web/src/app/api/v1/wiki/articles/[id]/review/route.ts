import { NextRequest, NextResponse } from 'next/server';
import { reviewDecisionSchema } from '@fcos/contracts';
import { reviewArticle } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getAuthContext(req);
    const { id } = await params;

    const body = await req.json().catch(() => null);
    if (!body) {
      return apiError(400, 'invalid_json', 'Request body must be valid JSON.');
    }

    const parsed = reviewDecisionSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(400, 'validation_error', parsed.error.errors[0]?.message ?? 'Invalid input.');
    }

    const result = await reviewArticle(ctx, id, parsed.data.decision, parsed.data.notes);
    if (!result.ok) {
      const status =
        result.error.code === 'not_found' ? 404
        : result.error.code === 'invalid_state' ? 409
        : 403;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('POST /api/v1/wiki/articles/[id]/review failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
