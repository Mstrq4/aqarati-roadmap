import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { roadmapKeys } from '@/features/roadmap/roadmap.keys'

export function useRoadmapRealtime(){
  const qc=useQueryClient()
  useEffect(()=>{
    if(!supabase)return
    const channel=supabase.channel('roadmap-live').on('postgres_changes',{event:'*',schema:'public'},()=>{void qc.invalidateQueries({queryKey:roadmapKeys.project('aqarati-roadmap')})}).subscribe()
    return()=>{void supabase.removeChannel(channel)}
  },[qc])
}
