import { NextRequest, NextResponse } from 'next/server';
import { createIncident, listIncidents } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET() {
  try {
    const ctx = await getAuthContext();
    const result = await listIncidents(ctx);
    if (!result.ok) return apiError(400, result.error.code, result.error.message);
    return NextResponse.json({ ok: true, data: result.data });
  } catch (e) { console.error('GET /api/v1/incidents failed', e); return apiError(500, 'server_error', 'Something went wrong.'); }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await getAuthContext();
    const body = await req.json();
    const result = await createIncident(ctx, body);
    if (!result.ok) return apiError(400, result.error.code, result.error.message);
    return NextResponse.json({ ok: true, data: result.data }, { status: 201 });
  } catch (e) {
    console.error('POST /api/v1/incidents failed:', e);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
