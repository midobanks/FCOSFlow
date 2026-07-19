import { NextRequest, NextResponse } from 'next/server';
import { diffVersions } from '@fcos/application';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = getAuthContext(req);
    const { id } = await params;

    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!from || !to) {
      return apiError(400, 'missing_params', 'Both "from" and "to" version parameters are required.');
    }

    const fromVersion = Number(from);
    const toVersion = Number(to);

    if (isNaN(fromVersion) || isNaN(toVersion)) {
      return apiError(400, 'invalid_params', '"from" and "to" must be valid version numbers.');
    }

    const result = await diffVersions(ctx, id, fromVersion, toVersion);
    if (!result.ok) {
      const status = result.error.code === 'not_found' ? 404 : 403;
      return apiError(status, result.error.code, result.error.message);
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error('GET /api/v1/wiki/articles/[id]/diff failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
