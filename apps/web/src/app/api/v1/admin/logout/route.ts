import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/admin-auth';

export async function POST() {
  const response = NextResponse.json({ ok: true, data: { message: 'Signed out' } });
  response.headers.set('Set-Cookie', clearAuthCookie());
  return response;
}
