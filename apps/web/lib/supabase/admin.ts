import { createClient } from '@supabase/supabase-js';
import { env, hasServiceRole } from '../env';

export function createSupabaseAdminClient() {
  if (!hasServiceRole()) {
    return null;
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
