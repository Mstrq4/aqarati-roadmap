import { createClient } from '@supabase/supabase-js'

const env = import.meta.env as Record<string, string | undefined>
const url = env.VITE_SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY
  ?? env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ?? env.VITE_SUPABASE_ANON_KEY
  ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && key)
export const supabase = supabaseConfigured
  ? createClient(url!, key!, { auth: { persistSession: true, autoRefreshToken: true } })
  : null
