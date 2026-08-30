import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { roadmapKeys } from '@/features/roadmap/roadmap.keys'

export function useRoadmapRealtime(){
  const qc=useQueryClient()
  useEffect(()=>{
    const client=supabase
    if(!client)return
    const channel=client.channel('roadmap-live').on('postgres_changes',{event:'*',schema:'public'},()=>{void qc.invalidateQueries({queryKey:roadmapKeys.project('aqarati-roadmap')})}).subscribe()
    return()=>{void client.removeChannel(channel)}
  },[qc])
}
