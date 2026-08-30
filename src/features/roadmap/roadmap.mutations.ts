import { useMutation,useQueryClient } from '@tanstack/react-query'
import { createUpdate,updateDeliverable,updateMilestone,updatePayment,updatePhase,updateProject,updateTask } from './roadmap.api'
import { roadmapKeys } from './roadmap.keys'
export function useRoadmapMutations(){
 const qc=useQueryClient(); const invalidate=()=>qc.invalidateQueries({queryKey:roadmapKeys.project('aqarati-roadmap')})
 return {
  project:useMutation({mutationFn:({id,patch}:any)=>updateProject(id,patch),onSuccess:invalidate}),
  task:useMutation({mutationFn:({id,patch}:any)=>updateTask(id,patch),onSuccess:invalidate}),
  phase:useMutation({mutationFn:({id,patch}:any)=>updatePhase(id,patch),onSuccess:invalidate}),
  payment:useMutation({mutationFn:({id,patch}:any)=>updatePayment(id,patch),onSuccess:invalidate}),
  milestone:useMutation({mutationFn:({id,patch}:any)=>updateMilestone(id,patch),onSuccess:invalidate}),
  deliverable:useMutation({mutationFn:({id,patch}:any)=>updateDeliverable(id,patch),onSuccess:invalidate}),
  update:useMutation({mutationFn:createUpdate,onSuccess:invalidate}),
 }
}
