import { NextRequest, NextResponse } from 'next/server';
import { createHandover, getHandoversBySite } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET() {
  try {
    const ctx = await getAuthContext();
    const result = await getHandoversBySite(ctx);
    if (!result.ok) {
      return apiError(400, result.error.code, result.error.message);
    }
    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/handovers failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await getAuthContext();
    const body = await req.json().catch(() => null);
    if (!body || !body.shiftId) {
      return apiError(400, 'invalid_input', 'shiftId is required.');
    }

    const result = await createHandover(ctx, body);
    if (!result.ok) {
      const status = result.error.code === 'not_found' ? 404 : 409;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/handovers failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
