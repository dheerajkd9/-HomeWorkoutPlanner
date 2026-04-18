# Platform Setup

## 1. Supabase

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Copy these values into Vercel and local env:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 2. Vercel env vars

Add all of these to the `apps/web` project:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`
- `INSFORGE_API_URL`
- `INSFORGE_API_KEY`
- `DELIVERY_VENDOR_API_URL`
- `DELIVERY_VENDOR_API_KEY`
- `DEFAULT_HYDERABAD_CITY`

## 3. Stripe

1. Create a recurring product and price in Stripe.
2. Put the recurring price ID into `STRIPE_PRICE_ID`.
3. Point a webhook to `/api/stripe/webhook`.
4. Subscribe to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 4. Live feed

The code uses `/api/feed/live` and `lib/integrations/live-feed.ts`.
Connect your verified Hyderabad store/price feed there by setting:
- `INSFORGE_API_URL`
- `INSFORGE_API_KEY`

## 5. Delivery vendors

The code uses `/api/delivery/quotes` and `lib/integrations/delivery.ts`.
Connect your actual provider adapter with:
- `DELIVERY_VENDOR_API_URL`
- `DELIVERY_VENDOR_API_KEY`

## 6. DB-first behavior

The UI now prefers repository-backed reads for:
- marketplace store lists
- store detail pages
- customer order history
- owner ERP order board

If Supabase is not configured, it falls back to seeded demo data.
