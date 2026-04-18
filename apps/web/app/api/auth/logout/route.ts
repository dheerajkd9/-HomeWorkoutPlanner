import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient();
  const redirectTo = String((await request.formData()).get('redirectTo') ?? '/');

  if (supabase) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
