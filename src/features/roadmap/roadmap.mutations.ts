import { useMutation,useQueryClient } from '@tanstack/react-query'
import { createUpdate,updatePayment,updatePhase,updateTask } from './roadmap.api'
import { roadmapKeys } from './roadmap.keys'
export function useRoadmapMutations(){
 const qc=useQueryClient(); const invalidate=()=>qc.invalidateQueries({queryKey:roadmapKeys.project('aqarati-roadmap')})
 return {
  task:useMutation({mutationFn:({id,patch}:any)=>updateTask(id,patch),onSuccess:invalidate}),
  phase:useMutation({mutationFn:({id,patch}:any)=>updatePhase(id,patch),onSuccess:invalidate}),
  payment:useMutation({mutationFn:({id,patch}:any)=>updatePayment(id,patch),onSuccess:invalidate}),
  update:useMutation({mutationFn:createUpdate,onSuccess:invalidate}),
 }
}
