import Stripe from 'stripe';
import { env, hasStripeEnv } from '../env';

export function getStripeServer() {
  if (!hasStripeEnv()) {
    return null;
  }

  return new Stripe(env.STRIPE_SECRET_KEY!);
}
