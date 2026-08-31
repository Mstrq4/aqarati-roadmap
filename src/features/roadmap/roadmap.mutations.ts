import { useMutation,useQueryClient,type UseMutationResult } from '@tanstack/react-query'
import { createDeliverable,createMilestone,createPayment,createPhase,createTask,createUpdate,deleteDeliverable,deleteMilestone,deletePayment,deletePhase,deleteTask,deleteUpdate,updateDeliverable,updateMilestone,updatePayment,updatePhase,updateProject,updateTask,updateUpdate } from './roadmap.api'
import { roadmapKeys } from './roadmap.keys'
import { patchTaskInRoadmap,recalculateRoadmapProgress } from './roadmap.progress'
import { useToast } from '@/components/feedback/ToastProvider'
import type { Deliverable,Milestone,Payment,Phase,ProjectUpdate,RoadmapData,RoadmapTask } from './roadmap.types'

const key=roadmapKeys.project('aqarati-roadmap')
const messageOf=(error:unknown)=>error instanceof Error?error.message:'تعذر إكمال العملية. حاول مرة أخرى.'

type OptimisticConfig<TVars,TResult>={
  mutationFn:(variables:TVars)=>Promise<TResult>
  apply:(data:RoadmapData,variables:TVars)=>RoadmapData
  successTitle:string
}

function useOptimisticMutation<TVars,TResult>({mutationFn,apply,successTitle}:OptimisticConfig<TVars,TResult>):UseMutationResult<TResult,Error,TVars,{previous?:RoadmapData}>{
  const qc=useQueryClient()
  const {push}=useToast()
  return useMutation<TResult,Error,TVars,{previous?:RoadmapData}>({
    mutationFn,
    onMutate:async variables=>{
      await qc.cancelQueries({queryKey:key})
      const previous=qc.getQueryData<RoadmapData>(key)
      qc.setQueryData<RoadmapData>(key,current=>current?apply(current,variables):current)
      return {previous}
    },
    onError:(error,_variables,context)=>{
      if(context?.previous)qc.setQueryData(key,context.previous)
      push({title:'لم يتم حفظ التغيير',description:messageOf(error),tone:'error'})
    },
    onSuccess:()=>push({title:successTitle,tone:'success'}),
    onSettled:()=>{void qc.invalidateQueries({queryKey:key})},
  })
}

export function useRoadmapMutations(){
  const project=useOptimisticMutation({mutationFn:({id,patch}:{id:string;patch:any})=>updateProject(id,patch),apply:(data,{patch})=>({...data,project:{...data.project,...patch}}),successTitle:'تم حفظ إعدادات المشروع'})

  const task=useOptimisticMutation({mutationFn:({id,patch}:{id:string;patch:Partial<RoadmapTask>})=>updateTask(id,patch),apply:(data,{id,patch})=>patchTaskInRoadmap(data,id,patch),successTitle:'تم حفظ المهمة'})
  const taskCreate=useOptimisticMutation({mutationFn:(row:RoadmapTask)=>createTask(row),apply:(data,row)=>recalculateRoadmapProgress({...data,tasks:[...data.tasks,row]}),successTitle:'تمت إضافة المهمة'})
  const taskDelete=useOptimisticMutation({mutationFn:(id:string)=>deleteTask(id),apply:(data,id)=>recalculateRoadmapProgress({...data,tasks:data.tasks.filter(item=>item.id!==id)}),successTitle:'تم حذف المهمة'})

  const phase=useOptimisticMutation({mutationFn:({id,patch}:{id:string;patch:Partial<Phase>})=>updatePhase(id,patch),apply:(data,{id,patch})=>({...data,phases:data.phases.map(item=>item.id===id?{...item,...patch}:item)}),successTitle:'تم حفظ المرحلة'})
  const phaseCreate=useOptimisticMutation({mutationFn:(row:Phase)=>createPhase(row),apply:(data,row)=>({...data,phases:[...data.phases,row].sort((a,b)=>a.sort_order-b.sort_order)}),successTitle:'تمت إضافة المرحلة'})
  const phaseDelete=useOptimisticMutation({mutationFn:(id:string)=>deletePhase(id),apply:(data,id)=>recalculateRoadmapProgress({...data,phases:data.phases.filter(item=>item.id!==id),tasks:data.tasks.filter(item=>item.phase_id!==id)}),successTitle:'تم حذف المرحلة'})

  const payment=useOptimisticMutation({mutationFn:({id,patch}:{id:string;patch:Partial<Payment>})=>updatePayment(id,patch),apply:(data,{id,patch})=>({...data,payments:data.payments.map(item=>item.id===id?{...item,...patch}:item)}),successTitle:'تم حفظ الدفعة'})
  const paymentCreate=useOptimisticMutation({mutationFn:(row:Payment)=>createPayment(row),apply:(data,row)=>({...data,payments:[...data.payments,row].sort((a,b)=>a.sequence-b.sequence)}),successTitle:'تمت إضافة الدفعة'})
  const paymentDelete=useOptimisticMutation({mutationFn:(id:string)=>deletePayment(id),apply:(data,id)=>({...data,payments:data.payments.filter(item=>item.id!==id)}),successTitle:'تم حذف الدفعة'})

  const milestone=useOptimisticMutation({mutationFn:({id,patch}:{id:string;patch:Partial<Milestone>})=>updateMilestone(id,patch),apply:(data,{id,patch})=>({...data,milestones:data.milestones.map(item=>item.id===id?{...item,...patch}:item)}),successTitle:'تم حفظ المحطة'})
  const milestoneCreate=useOptimisticMutation({mutationFn:(row:Milestone)=>createMilestone(row),apply:(data,row)=>({...data,milestones:[...data.milestones,row].sort((a,b)=>a.sort_order-b.sort_order)}),successTitle:'تمت إضافة المحطة'})
  const milestoneDelete=useOptimisticMutation({mutationFn:(id:string)=>deleteMilestone(id),apply:(data,id)=>({...data,milestones:data.milestones.filter(item=>item.id!==id)}),successTitle:'تم حذف المحطة'})

  const deliverable=useOptimisticMutation({mutationFn:({id,patch}:{id:string;patch:Partial<Deliverable>})=>updateDeliverable(id,patch),apply:(data,{id,patch})=>({...data,deliverables:data.deliverables.map(item=>item.id===id?{...item,...patch}:item)}),successTitle:'تم حفظ التسليم'})
  const deliverableCreate=useOptimisticMutation({mutationFn:(row:Deliverable)=>createDeliverable(row),apply:(data,row)=>({...data,deliverables:[...data.deliverables,row].sort((a,b)=>a.sort_order-b.sort_order)}),successTitle:'تمت إضافة التسليم'})
  const deliverableDelete=useOptimisticMutation({mutationFn:(id:string)=>deleteDeliverable(id),apply:(data,id)=>({...data,deliverables:data.deliverables.filter(item=>item.id!==id)}),successTitle:'تم حذف التسليم'})

  const update=useOptimisticMutation({mutationFn:createUpdate,apply:(data,input)=>{const row:ProjectUpdate={id:`optimistic-${crypto.randomUUID()}`,project_id:data.project.id,title:input.title,body:input.body,related_phase_id:input.related_phase_id??null,published:input.published??true,created_at:new Date().toISOString(),updated_at:new Date().toISOString()};return {...data,updates:[row,...data.updates]}},successTitle:'تم نشر التحديث'})
  const updateEdit=useOptimisticMutation({mutationFn:({id,patch}:{id:string;patch:Partial<ProjectUpdate>})=>updateUpdate(id,patch),apply:(data,{id,patch})=>({...data,updates:data.updates.map(item=>item.id===id?{...item,...patch}:item)}),successTitle:'تم حفظ التحديث'})
  const updateDelete=useOptimisticMutation({mutationFn:(id:string)=>deleteUpdate(id),apply:(data,id)=>({...data,updates:data.updates.filter(item=>item.id!==id)}),successTitle:'تم حذف التحديث'})

  return {project,task,taskCreate,taskDelete,phase,phaseCreate,phaseDelete,payment,paymentCreate,paymentDelete,milestone,milestoneCreate,milestoneDelete,deliverable,deliverableCreate,deliverableDelete,update,updateEdit,updateDelete}
}
