import { NextRequest, NextResponse } from 'next/server';
import { getHandover } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getAuthContext();
    const { id } = await params;
    const result = await getHandover(ctx, id);
    if (!result.ok) {
      return apiError(404, result.error.code, result.error.message);
    }
    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/handovers/[id] failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
