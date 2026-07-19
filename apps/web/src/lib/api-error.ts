import { NextResponse } from 'next/server';

type ErrorBody = { ok: false; error: { code: string; message: string } };

export function apiError(status: number, code: string, message: string): NextResponse<ErrorBody> {
  return NextResponse.json(
    { ok: false, error: { code, message } },
    { status },
  );
}
