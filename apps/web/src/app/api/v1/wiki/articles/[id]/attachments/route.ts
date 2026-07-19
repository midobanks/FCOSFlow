import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth-context';
import { apiError } from '@/lib/api-error';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await getAuthContext(req);
    const { id } = await params;

    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return apiError(400, 'invalid_request', 'Expected multipart form data.');
    }

    const file = formData.get('file') as File | null;
    if (!file) {
      return apiError(400, 'missing_file', 'File is required.');
    }

    if (file.size > MAX_SIZE) {
      return apiError(400, 'file_too_large', 'File exceeds 10 MB limit.');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return apiError(400, 'invalid_type', `File type ${file.type} is not allowed.`);
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const attachment = {
      id: crypto.randomUUID(),
      filename: file.name,
      type: file.type,
      size: file.size,
      articleId: id,
      uploadedBy: ctx.userId,
    };

    return NextResponse.json({ ok: true, data: attachment }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/wiki/articles/[id]/attachments failed', error);
    return apiError(500, 'server_error', 'Something went wrong.');
  }
}
