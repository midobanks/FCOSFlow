import { NextRequest, NextResponse } from 'next/server';
import { resolveQrCode } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET(req: NextRequest) {
  try {
    const ctx = await getAuthContext(req);
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return apiError(400, 'missing_code', 'QR code parameter is required.');
    }

    const result = await resolveQrCode(ctx, code);
    if (!result.ok) {
      return apiError(404, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/wiki/qr failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
