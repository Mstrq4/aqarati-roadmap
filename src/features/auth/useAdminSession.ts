import { useEffect,useState } from 'react'
import { supabase,supabaseConfigured } from '@/lib/supabase'
export function useAdminSession(){const [loading,setLoading]=useState(supabaseConfigured);const [session,setSession]=useState<any>(null);useEffect(()=>{if(!supabase){setLoading(false);return}supabase.auth.getSession().then(({data})=>{setSession(data.session);setLoading(false)});const {data}=supabase.auth.onAuthStateChange((_event,next)=>setSession(next));return()=>data.subscription.unsubscribe()},[]);return {session,loading,configured:supabaseConfigured}}
