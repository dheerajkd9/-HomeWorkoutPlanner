import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '../../../../lib/integrations/stripe';
import { env } from '../../../../lib/env';
import { createSupabaseAdminClient } from '../../../../lib/supabase/admin';

export async function POST(request: NextRequest) {
  const stripe = getStripeServer();
  const signature = headers().get('stripe-signature');

  if (!stripe || !signature || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  const body = await request.text();
  const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  const supabase = createSupabaseAdminClient();

  if (supabase && (event.type === 'checkout.session.completed' || event.type === 'customer.subscription.updated')) {
    const object = event.data.object as any;
    const metadata = object.metadata ?? {};
    await supabase.from('subscriptions').upsert({
      organization_id: metadata.organizationId,
      stripe_customer_id: object.customer,
      stripe_subscription_id: object.subscription,
      plan_code: env.STRIPE_PRICE_ID,
      status: object.status ?? 'active',
      current_period_end: object.current_period_end ? new Date(object.current_period_end * 1000).toISOString() : null,
    }, { onConflict: 'organization_id' });
  }

  return NextResponse.json({ received: true });
}
