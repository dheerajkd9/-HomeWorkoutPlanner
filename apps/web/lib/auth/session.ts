import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '../supabase/server';

export async function getCurrentSession() {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session) {
    redirect('/login/customer');
  }
  return session;
}
