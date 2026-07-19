import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, getAuthCookie } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!validateCredentials(body.username, body.password)) {
      return NextResponse.json(
        { ok: false, error: { code: 'invalid_credentials', message: 'Invalid username or password.' } },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ ok: true, data: { message: 'Authenticated' } });
    response.headers.set('Set-Cookie', getAuthCookie());
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: 'server_error', message: 'Something went wrong.' } },
      { status: 500 },
    );
  }
}
