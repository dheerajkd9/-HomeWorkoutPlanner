# FitFlow Home

An animated AI-first home workout planner that turns a user's real setup, like a sofa, chair, bed, wall, small room, or outdoor walking space, into a practical exercise routine.

## What is included

- `apps/web`: Next.js app with the animated home-workout planner and API routes
- `packages/shared`: shared TypeScript workspace package
- `Dockerfile`: multi-stage production container build
- `docker-compose.yml`: one-command local or server deployment
- `supabase/schema.sql`: PostgreSQL schema for the wider platform setup
- `supabase/seed.sql`: starter seed data

## Product idea

People often skip exercise because going to the gym takes time, costs money, or feels inconvenient after getting home. FitFlow Home removes that excuse by asking what is available around the user and building a realistic routine from it.

## Local setup

1. `npm install --workspace @meat-market/web --workspace @meat-market/shared`
2. Copy `apps/web/.env.example` to `apps/web/.env.local`
3. Run `npm run dev`

## Docker deployment

1. Copy `apps/web/.env.example` to `apps/web/.env.local`
2. Build the image with `docker build -t fitflow-home .`
3. Run the container with `docker run --env-file apps/web/.env.local -p 3000:3000 fitflow-home`

You can also use Docker Compose:

1. Copy `apps/web/.env.example` to `apps/web/.env.local`
2. Run `docker compose up --build`

## Container architecture

- `deps` stage installs only the workspace packages needed by the web app
- `builder` stage compiles the Next.js app in standalone mode
- `runner` stage ships only the generated server bundle and static assets
- `docker-compose.yml` provides a repeatable single-service deployment entry point

## Vercel deployment

1. Import this GitHub repo into Vercel.
2. Set the project root directory to `apps/web`.
3. Add the environment variables from `apps/web/.env.example`.
4. Deploy.

## Next phase

After the app is live, we can add the camera-based exercise coach as the next AI layer without changing the core planning flow.
