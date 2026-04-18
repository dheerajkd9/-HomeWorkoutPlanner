import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const fullName = String(formData.get('fullName') ?? '');
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const role = String(formData.get('role') ?? 'customer');
  const redirectTo = String(formData.get('redirectTo') ?? (role === 'store_owner' ? '/owner' : '/customer'));

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(new URL(`${redirectTo}?demoAuth=1`, request.url));
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        app_role: role,
      },
      emailRedirectTo: `${new URL(request.url).origin}${redirectTo}`,
    },
  });

  if (error) {
    return NextResponse.redirect(new URL(`/login/${role === 'store_owner' ? 'store' : 'customer'}?error=${encodeURIComponent(error.message)}`, request.url));
  }

  return NextResponse.redirect(new URL(`${redirectTo}?welcome=1`, request.url));
}
