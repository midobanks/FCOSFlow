import { NextRequest, NextResponse } from 'next/server';
import { submitForReviewSchema } from '@fcos/contracts';
import { submitForReview } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;

    const body = await req.json().catch(() => ({}));
    const parsed = submitForReviewSchema.safeParse(body);

    const changeNotes = parsed.success ? parsed.data.changeNotes : undefined;

    const result = await submitForReview(ctx, id, changeNotes);
    if (!result.ok) {
      const status =
        result.error.code === 'not_found' ? 404
        : result.error.code === 'invalid_state' ? 409
        : 403;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('POST /api/v1/wiki/articles/[id]/submit failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
