import { NextRequest, NextResponse } from 'next/server';
import { updateIncidentStatus } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const ctx = await getAuthContext();
    const { id } = await params;
    const body = await req.json();
    const result = await updateIncidentStatus(ctx, id, body.status, body.notes);
    if (!result.ok) return apiError(404, result.error.code, result.error.message);
    return NextResponse.json({ ok: true, data: result.data });
  } catch (e) { return apiError(500, 'server_error', 'Something went wrong.'); }
}
