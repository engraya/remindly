# Deployment

## Vercel (recommended)

1. Import the repository in [Vercel](https://vercel.com).
2. Set environment variables from `.env.example`:
   - `DATABASE_URL` (Neon production branch)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - Optional: `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
3. Build command: `npm run build`
4. Run database migrations: `npm run db:push` against production (or use Drizzle migrate in CI).

## Preview environments

Use a separate Neon branch and Clerk development instance for preview deployments.

## CI

GitHub Actions runs lint, typecheck, unit tests, and build on every PR. E2E runs on pushes to `main`.
