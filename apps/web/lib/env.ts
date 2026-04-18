import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_PRICE_ID: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  INSFORGE_API_URL: z.string().url().optional(),
  INSFORGE_API_KEY: z.string().optional(),
  DELIVERY_VENDOR_API_URL: z.string().url().optional(),
  DELIVERY_VENDOR_API_KEY: z.string().optional(),
  DEFAULT_HYDERABAD_CITY: z.string().default('Hyderabad'),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  INSFORGE_API_URL: process.env.INSFORGE_API_URL,
  INSFORGE_API_KEY: process.env.INSFORGE_API_KEY,
  DELIVERY_VENDOR_API_URL: process.env.DELIVERY_VENDOR_API_URL,
  DELIVERY_VENDOR_API_KEY: process.env.DELIVERY_VENDOR_API_KEY,
  DEFAULT_HYDERABAD_CITY: process.env.DEFAULT_HYDERABAD_CITY,
});

export function hasSupabaseEnv() {
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function hasServiceRole() {
  return hasSupabaseEnv() && Boolean(env.SUPABASE_SERVICE_ROLE_KEY);
}

export function hasStripeEnv() {
  return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_PRICE_ID);
}
