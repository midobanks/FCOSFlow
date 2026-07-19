import { NextResponse } from 'next/server';
import { listFrameTypes } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET() {
  try {
    const ctx = getAuthContext(null as any);
    const result = await listFrameTypes(ctx);
    if (!result.ok) return apiError(400, result.error.code, result.error.message);
    return NextResponse.json({ ok: true, data: result.data });
  } catch (e) { return apiError(500, 'server_error', 'Something went wrong.'); }
}
