import { NextRequest, NextResponse } from 'next/server';
import { addAmendment } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getAuthContext();
    const { id } = await params;
    const body = await req.json().catch(() => null);
    if (!body || !body.content) {
      return apiError(400, 'invalid_input', 'Amendment content is required.');
    }
    const result = await addAmendment(ctx, id, body.content);
    if (!result.ok) {
      return apiError(404, result.error.code, result.error.message);
    }
    return NextResponse.json({ ok: true, data: result.data }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/handovers/[id]/amendments failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
