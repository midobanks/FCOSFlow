import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAuthenticated } from './admin-auth';

export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (!sessionCookie || !isAuthenticated(`admin_session=${sessionCookie.value}`)) {
    redirect('/admin/login');
  }
}
