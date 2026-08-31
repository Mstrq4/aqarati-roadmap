import { seedData } from './seed'
import { supabase, supabaseConfigured } from '@/lib/supabase'
import { normalizeTaskPatch,recalculateRoadmapProgress } from './roadmap.progress'
import type { RoadmapData, RoadmapTask, Payment, Phase, ProjectUpdate, Project, Deliverable, Milestone } from './roadmap.types'

const LOCAL_KEY='aqarati-roadmap-preview-data-v2'
const cloneSeed=()=>JSON.parse(JSON.stringify(seedData)) as RoadmapData
function readLocal(){ try { const raw=localStorage.getItem(LOCAL_KEY); return raw? JSON.parse(raw) as RoadmapData:cloneSeed() } catch { return cloneSeed() } }
function writeLocal(data:RoadmapData){ localStorage.setItem(LOCAL_KEY,JSON.stringify(data)); return data }
function persistLocal(data:RoadmapData){return writeLocal(recalculateRoadmapProgress(data))}

export async function fetchRoadmap():Promise<RoadmapData>{
  if(!supabaseConfigured || !supabase) return recalculateRoadmapProgress(readLocal())
  const [{data:project,error:pErr},{data:phases,error:phErr},{data:tasks,error:tErr},{data:milestones,error:mErr},{data:payments,error:payErr},{data:deliverables,error:dErr},{data:updates,error:uErr}] = await Promise.all([
    supabase.from('projects').select('*').eq('slug','aqarati-roadmap').single(),
    supabase.from('phases').select('*').order('sort_order'),
    supabase.from('tasks').select('*').order('week').order('title'),
    supabase.from('milestones').select('*').order('sort_order'),
    supabase.from('payments').select('*').order('sequence'),
    supabase.from('deliverables').select('*').order('sort_order'),
    supabase.from('updates').select('*').order('created_at',{ascending:false}),
  ])
  const err=pErr||phErr||tErr||mErr||payErr||dErr||uErr
  if(err) throw err
  return {project,phases:phases??[],tasks:tasks??[],milestones:milestones??[],payments:payments??[],deliverables:deliverables??[],updates:updates??[]}
}

export async function updateProject(id:string,patch:Partial<Project>){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.project=d.project.id===id?{...d.project,...patch}:d.project;return writeLocal(d).project}
  const {data,error}=await supabase.from('projects').update(patch).eq('id',id).select().single();if(error)throw error;return data
}

export async function createTask(input:RoadmapTask){
  const normalized={...input,...normalizeTaskPatch(input,input)}
  if(!supabaseConfigured||!supabase){const d=readLocal();d.tasks=[...d.tasks,normalized];persistLocal(d);return normalized}
  const {data,error}=await supabase.from('tasks').insert(normalized).select().single();if(error)throw error;return data
}
export async function updateTask(id:string,patch:Partial<RoadmapTask>){
  if(!supabaseConfigured||!supabase){const d=readLocal();const current=d.tasks.find(t=>t.id===id);if(!current)throw new Error('المهمة غير موجودة');const normalized=normalizeTaskPatch(current,patch);d.tasks=d.tasks.map(t=>t.id===id?{...t,...normalized}:t);persistLocal(d);return d.tasks.find(t=>t.id===id)!}
  const {data:current,error:readError}=await supabase.from('tasks').select('*').eq('id',id).single();if(readError)throw readError
  const normalized=normalizeTaskPatch(current as RoadmapTask,patch)
  const {data,error}=await supabase.from('tasks').update({...normalized,updated_at:new Date().toISOString()}).eq('id',id).select().single();if(error)throw error;return data
}
export async function deleteTask(id:string){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.tasks=d.tasks.filter(t=>t.id!==id);persistLocal(d);return id}
  const {error}=await supabase.from('tasks').delete().eq('id',id);if(error)throw error;return id
}

export async function createPhase(input:Phase){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.phases=[...d.phases,input];persistLocal(d);return input}
  const {data,error}=await supabase.from('phases').insert(input).select().single();if(error)throw error;return data
}
export async function updatePhase(id:string,patch:Partial<Phase>){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.phases=d.phases.map(t=>t.id===id?{...t,...patch}:t);return writeLocal(d).phases.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('phases').update(patch).eq('id',id).select().single();if(error)throw error;return data
}
export async function deletePhase(id:string){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.phases=d.phases.filter(p=>p.id!==id);d.tasks=d.tasks.filter(t=>t.phase_id!==id);persistLocal(d);return id}
  const {error}=await supabase.from('phases').delete().eq('id',id);if(error)throw error;return id
}

export async function createPayment(input:Payment){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.payments=[...d.payments,input].sort((a,b)=>a.sequence-b.sequence);writeLocal(d);return input}
  const {data,error}=await supabase.from('payments').insert(input).select().single();if(error)throw error;return data
}
export async function updatePayment(id:string,patch:Partial<Payment>){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.payments=d.payments.map(t=>t.id===id?{...t,...patch}:t);return writeLocal(d).payments.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('payments').update(patch).eq('id',id).select().single();if(error)throw error;return data
}
export async function deletePayment(id:string){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.payments=d.payments.filter(p=>p.id!==id);writeLocal(d);return id}
  const {error}=await supabase.from('payments').delete().eq('id',id);if(error)throw error;return id
}

export async function createMilestone(input:Milestone){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.milestones=[...d.milestones,input].sort((a,b)=>a.sort_order-b.sort_order);writeLocal(d);return input}
  const {data,error}=await supabase.from('milestones').insert(input).select().single();if(error)throw error;return data
}
export async function updateMilestone(id:string,patch:Partial<Milestone>){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.milestones=d.milestones.map(t=>t.id===id?{...t,...patch}:t);return writeLocal(d).milestones.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('milestones').update(patch).eq('id',id).select().single();if(error)throw error;return data
}
export async function deleteMilestone(id:string){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.milestones=d.milestones.filter(m=>m.id!==id);writeLocal(d);return id}
  const {error}=await supabase.from('milestones').delete().eq('id',id);if(error)throw error;return id
}

export async function createDeliverable(input:Deliverable){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.deliverables=[...d.deliverables,input].sort((a,b)=>a.sort_order-b.sort_order);writeLocal(d);return input}
  const {data,error}=await supabase.from('deliverables').insert(input).select().single();if(error)throw error;return data
}
export async function updateDeliverable(id:string,patch:Partial<Deliverable>){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.deliverables=d.deliverables.map(t=>t.id===id?{...t,...patch}:t);return writeLocal(d).deliverables.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('deliverables').update(patch).eq('id',id).select().single();if(error)throw error;return data
}
export async function deleteDeliverable(id:string){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.deliverables=d.deliverables.filter(item=>item.id!==id);writeLocal(d);return id}
  const {error}=await supabase.from('deliverables').delete().eq('id',id);if(error)throw error;return id
}

export async function createUpdate(input:Pick<ProjectUpdate,'title'|'body'> & Partial<Omit<ProjectUpdate,'title'|'body'>>){
  const row:ProjectUpdate={id:input.id??crypto.randomUUID(),project_id:input.project_id??seedData.project.id,title:input.title,body:input.body,related_phase_id:input.related_phase_id??null,published:input.published??true,created_at:input.created_at??new Date().toISOString(),updated_at:new Date().toISOString()}
  if(!supabaseConfigured||!supabase){const d=readLocal();d.updates=[row,...d.updates];writeLocal(d);return row}
  const {id:_,...insertRow}=row;const {data,error}=await supabase.from('updates').insert(insertRow).select().single();if(error)throw error;return data
}
export async function updateUpdate(id:string,patch:Partial<ProjectUpdate>){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.updates=d.updates.map(t=>t.id===id?{...t,...patch,updated_at:new Date().toISOString()}:t);return writeLocal(d).updates.find(t=>t.id===id)!}
  const {data,error}=await supabase.from('updates').update({...patch,updated_at:new Date().toISOString()}).eq('id',id).select().single();if(error)throw error;return data
}
export async function deleteUpdate(id:string){
  if(!supabaseConfigured||!supabase){const d=readLocal();d.updates=d.updates.filter(item=>item.id!==id);writeLocal(d);return id}
  const {error}=await supabase.from('updates').delete().eq('id',id);if(error)throw error;return id
}
