import { NextRequest, NextResponse } from 'next/server';
import { submitHandover } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(null as any);
    const { id } = await params;
    const result = await submitHandover(ctx, id);
    if (!result.ok) {
      const status = result.error.code === 'not_found' ? 404 : 403;
      return apiError(status, result.error.code, result.error.message);
    }
    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('POST /api/v1/handovers/[id]/submit failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
