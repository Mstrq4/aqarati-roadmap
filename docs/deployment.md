# Deployment

1. Create Supabase project `aqarati-roadmap`.
2. Apply migrations in `supabase/migrations/`.
3. Create one Auth email/password admin user and insert its UUID into `admin_profiles`.
4. Add Vercel environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
5. Deploy production from `main` in `Mstrq4/aqarati-roadmap`.
6. Verify public read-only routes and `/login` admin flow.
