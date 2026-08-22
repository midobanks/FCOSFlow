import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateCredentials, getAuthCookie } from '@/lib/admin-auth';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = loginSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'invalid_input', message: 'Username and password are required.' },
        },
        { status: 400 },
      );
    }

    const { username, password } = parsed.data;
    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'invalid_credentials', message: 'Invalid username or password.' },
        },
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
