import { NextResponse } from 'next/server';
import { getPendingAcknowledgements } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET() {
  try {
    const ctx = await getAuthContext();
    const result = await getPendingAcknowledgements(ctx);
    if (!result.ok) {
      return apiError(400, result.error.code, result.error.message);
    }
    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/wiki/acknowledgements failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
