import { NextRequest, NextResponse } from 'next/server';
import { completeAcknowledgement, assignAcknowledgement } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;
    const body = await req.json().catch(() => ({}));

    if (body.userId && body.version) {
      const result = await assignAcknowledgement(ctx, id, body.userId, body.version);
      if (!result.ok) {
        const status = result.error.code === 'not_found' ? 404 : 403;
        return apiError(status, result.error.code, result.error.message);
      }
      return NextResponse.json({ ok: true, data: result.data }, { status: 201 });
    }

    const result = await completeAcknowledgement(ctx, id);
    if (!result.ok) {
      const status = result.error.code === 'not_found' ? 404 : 409;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('POST /api/v1/wiki/articles/[id]/acknowledge failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
