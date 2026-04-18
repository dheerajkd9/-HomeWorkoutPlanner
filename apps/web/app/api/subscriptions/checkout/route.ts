import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '../../../../lib/integrations/stripe';
import { env } from '../../../../lib/env';

export async function POST(request: NextRequest) {
  const stripe = getStripeServer();
  const body = await request.json();

  if (!stripe || !env.STRIPE_PRICE_ID) {
    return NextResponse.json({ message: 'Stripe is not configured', configured: false }, { status: 503 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_email: body.email,
    metadata: {
      organizationId: body.organizationId,
      ownerUserId: body.ownerUserId,
      storeId: body.storeId,
    },
    success_url: `${env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin}/owner?billing=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin}/owner?billing=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
