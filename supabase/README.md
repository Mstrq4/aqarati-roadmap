# Supabase setup

Apply migrations in order: `0001_schema.sql`, `0002_rls.sql`, `0003_seed.sql`.

Create the admin user in Authentication → Users, then add its UUID:

```sql
insert into public.admin_profiles (user_id, display_name)
values ('AUTH_USER_UUID', 'مدير مشروع عقاراتي');
```

The browser uses only the project URL and publishable key. Never expose a secret/service-role key.
