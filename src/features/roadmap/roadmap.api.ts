import { seedData } from './seed'
import { supabase, supabaseConfigured } from '@/lib/supabase'
import type { RoadmapData, RoadmapTask, Payment, Phase, ProjectUpdate, Project, Deliverable, Milestone } from './roadmap.types'

const LOCAL_KEY='aqarati-roadmap-preview-data-v2'
const cloneSeed=()=>JSON.parse(JSON.stringify(seedData)) as RoadmapData
function readLocal(){ try { const raw=localStorage.getItem(LOCAL_KEY); return raw? JSON.parse(raw) as RoadmapData:cloneSeed() } catch { return cloneSeed() } }
function writeLocal(data:RoadmapData){ localStorage.setItem(LOCAL_KEY,JSON.stringify(data)); return data }
function syncLocalProgress(data:RoadmapData,phaseId?:string){
  const phaseIds=phaseId?[phaseId]:data.phases.map(p=>p.id)
  data.phases=data.phases.map(phase=>{
    if(!phaseIds.includes(phase.id))return phase
    const tasks=data.tasks.filter(task=>task.phase_id===phase.id)
    const progress=tasks.length?Math.round(tasks.reduce((sum,task)=>sum+Math.max(0,Math.min(100,task.progress)),0)/tasks.length):0
    const status:Phase['status']=tasks.some(task=>task.status==='blocked')?'blocked':tasks.length>0&&tasks.every(task=>task.status==='done'||task.progress>=100)?'done':tasks.some(task=>task.status==='active'||task.status==='review'||task.status==='done'||task.progress>0)?'active':'planned'
    return {...phase,progress,status}
  })
  data.project.overall_progress=data.tasks.length?Math.round(data.tasks.reduce((sum,task)=>sum+Math.max(0,Math.min(100,task.progress)),0)/data.tasks.length):0
  return data
}

export async function fetchRoadmap():Promise<RoadmapData>{
  if(!supabaseConfigured || !supabase) return syncLocalProgress(readLocal())
  const [{data:project,error:pErr},{data:phases,error:phErr},{data:tasks,error:tErr},{data:milestones,error:mErr},{data:payments,error:payErr},{data:deliverables,error:dErr},{data:updates,error:uErr}] = await Promise.all([
    supabase.from('projects').select('*').eq('slug','aqarati-roadmap').single(),
    supabase.from('phases').select('*').eq('is_public',true).order('sort_order'),
    supabase.from('tasks').select('*').eq('is_public',true).order('week').order('title'),
    supabase.from('milestones').select('*').order('sort_order'),
    supabase.from('payments').select('*').order('sequence'),
    supabase.from('deliverables').select('*').order('sort_order'),
    supabase.from('updates').select('*').eq('published',true).order('created_at',{ascending:false}),
  ])
  const err=pErr||phErr||tErr||mErr||payErr||dErr||uErr
  if(err) throw err
  return {project,phases:phases??[],tasks:tasks??[],milestones:milestones??[],payments:payments??[],deliverables:deliverables??[],updates:updates??[]}
}

export async function updateProject(id:string,patch:Partial<Project>){
  if(!supabaseConfigured||!supabase){const d=readLocal(); d.project=d.project.id===id?{...d.project,...patch}:d.project; return writeLocal(d).project}
  const {data,error}=await supabase.from('projects').update(patch).eq('id',id).select().single(); if(error)throw error; return data
}
export async function updateTask(id:string,patch:Partial<RoadmapTask>){
  if(!supabaseConfigured||!supabase){const d=readLocal(); const current=d.tasks.find(t=>t.id===id); d.tasks=d.tasks.map(t=>t.id===id?{...t,...patch}:t); syncLocalProgress(d,current?.phase_id); writeLocal(d); return d.tasks.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('tasks').update({...patch,updated_at:new Date().toISOString()}).eq('id',id).select().single(); if(error)throw error; return data
}
export async function updatePhase(id:string,patch:Partial<Phase>){
  if(!supabaseConfigured||!supabase){const d=readLocal(); d.phases=d.phases.map(t=>t.id===id?{...t,...patch}:t); return writeLocal(d).phases.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('phases').update(patch).eq('id',id).select().single(); if(error)throw error; return data
}
export async function updatePayment(id:string,patch:Partial<Payment>){
  if(!supabaseConfigured||!supabase){const d=readLocal(); d.payments=d.payments.map(t=>t.id===id?{...t,...patch}:t); return writeLocal(d).payments.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('payments').update(patch).eq('id',id).select().single(); if(error)throw error; return data
}
export async function updateMilestone(id:string,patch:Partial<Milestone>){
  if(!supabaseConfigured||!supabase){const d=readLocal(); d.milestones=d.milestones.map(t=>t.id===id?{...t,...patch}:t); return writeLocal(d).milestones.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('milestones').update(patch).eq('id',id).select().single(); if(error)throw error; return data
}
export async function updateDeliverable(id:string,patch:Partial<Deliverable>){
  if(!supabaseConfigured||!supabase){const d=readLocal(); d.deliverables=d.deliverables.map(t=>t.id===id?{...t,...patch}:t); return writeLocal(d).deliverables.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('deliverables').update(patch).eq('id',id).select().single(); if(error)throw error; return data
}
export async function createUpdate(input:Pick<ProjectUpdate,'title'|'body'>){
  const row={project_id:seedData.project.id,title:input.title,body:input.body,published:true,related_phase_id:null}
  if(!supabaseConfigured||!supabase){const d=readLocal(); const created={...row,id:crypto.randomUUID(),created_at:new Date().toISOString(),updated_at:new Date().toISOString()}; d.updates=[created,...d.updates]; writeLocal(d); return created}
  const {data,error}=await supabase.from('updates').insert(row).select().single(); if(error)throw error; return data
}
