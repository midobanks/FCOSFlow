import { NextRequest, NextResponse } from 'next/server';
import { getIncident } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET(_req: NextRequest, { params }: any) {
  try {
    const ctx = getAuthContext(null as any);
    const { id } = await params;
    const result = await getIncident(ctx, id);
    if (!result.ok) return apiError(404, result.error.code, result.error.message);
    return NextResponse.json({ ok: true, data: result.data });
  } catch (e) { return apiError(500, 'server_error', 'Something went wrong.'); }
}
