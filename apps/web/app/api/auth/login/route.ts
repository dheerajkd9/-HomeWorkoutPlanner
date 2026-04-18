import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const redirectTo = String(formData.get('redirectTo') ?? '/customer');

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(new URL(`${redirectTo}?demoAuth=1`, request.url));
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.redirect(new URL(`/login/customer?error=${encodeURIComponent(error.message)}`, request.url));
  }

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
