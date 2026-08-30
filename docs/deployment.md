# Deployment

1. Supabase project: `aqarati-roadmap`.
2. Production database migrations live in `supabase/migrations/` and are applied from GitHub `main`.
3. One Supabase Auth email/password admin user is linked to `admin_profiles`.
4. Supabase/Vercel integration provides `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to Production.
5. Vercel project `aqarati-roadmap` is connected directly to GitHub repository `Mstrq4/aqarati-roadmap`.
6. Production branch: `main`.
7. Every push to `main` should trigger an automatic Vercel production deployment.
8. Verify public read-only routes and `/login` admin flow after each production deployment.

Last sync trigger: GitHub-driven deployment enabled.
