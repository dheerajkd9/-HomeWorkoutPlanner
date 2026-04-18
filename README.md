# Hyderabad Meat Marketplace SaaS

A web-first MVP starter for a Hyderabad-focused meat marketplace and store-operations platform.

## What is included

- `apps/web`: Next.js marketplace, store detail view, owner dashboard, admin console, and simple API routes
- `packages/shared`: shared product, store, dashboard, and order seed data plus TypeScript types
- `supabase/schema.sql`: PostgreSQL schema for a multi-tenant Supabase setup
- `supabase/seed.sql`: starter Hyderabad categories and catalog seeds

## Important assumption

The attached docs did not include the exact `insforge` API specification. This repo includes an adapter point for an external live market feed, but the current MVP uses store-owner daily updates as the source of truth for live prices until the exact API contract is shared.

## Local setup

1. `npm install --prefer-offline --workspace @meat-market/web --workspace @meat-market/shared`
2. Copy `apps/web/.env.example` to `apps/web/.env.local`
3. Run `npm run dev`

## Vercel deployment

1. Import this GitHub repo into Vercel.
2. Set the project root directory to `apps/web`.
3. Add the environment variables from `apps/web/.env.example`.
4. Deploy.

## Next phase

After the web app is live, we can add the mobile app back in a separate pass without blocking deployment.
